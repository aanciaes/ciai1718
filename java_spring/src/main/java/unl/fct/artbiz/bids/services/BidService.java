package unl.fct.artbiz.bids.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.bids.exceptions.*;
import unl.fct.artbiz.bids.model.Bid;
import unl.fct.artbiz.bids.model.BidRepository;
import unl.fct.artbiz.bids.model.BidState;
import unl.fct.artbiz.notifications.model.Notification;
import unl.fct.artbiz.notifications.model.NotificationState;
import unl.fct.artbiz.notifications.services.NotificationService;
import unl.fct.artbiz.sales.model.Sale;
import unl.fct.artbiz.sales.model.SalesRepository;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class BidService {

    @Autowired
    BidRepository bidRepository;

    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    SalesRepository salesRepository;

    @Autowired
    NotificationService notificationService;

    public boolean exist(long id) {
        return bidRepository.exists(id);
    }

    public Bid findById(long id) {
        if (!exist(id))
            throw new BidNotFoundException();
        return bidRepository.findOne(id);

    }

    public void createBid(Bid incoming) {
        if (exist(incoming.getBidId())) {
            Bid lastBid = findById(incoming.getBidId());
            if (lastBid.getBidAmount() < incoming.getBidAmount()) {
                incoming.setBidState(BidState.OPEN);
                bidRepository.save(incoming);

                //return incoming;
            } else {
                throw new LowerBidException();
            }
        } else {
            if (artworkRepository.exists(incoming.getPieceId())) {
                ArtWork artWork = artworkRepository.findOne(incoming.getPieceId());

                if (artWork.isOnSale()) {
                    if (artWork.getPrice() <= incoming.getBidAmount()) {
                        incoming.setBidState(BidState.OPEN);
                        bidRepository.save(incoming);

                        //Send notification
                        sendNotification(incoming, "A new bid was placed in one of your pieces",
                                artWork.getAuthor());

                    } else {
                        throw new BidIsToLowException();
                    }
                } else {
                    throw new PieceNotOnSaleException();
                }
            } else {
                throw new ArtWorkNotFound();
            }
        }
    }

    public List<Bid> getBidsMadeByUser(long id) {
        return bidRepository.getBidsByBidderId(id);
    }

    public List<Bid> getBidsOfArtist(long artistId) {
        return bidRepository.findAll().stream().filter(bid -> {
            if (bid.getArtWorkObject().getAuthor() == artistId)
                return true;
            return false;
        }).collect(Collectors.toList());
    }

    public List<Bid> getBidsOfPiece(long pieceId) {
        return bidRepository.getBidsByPieceId(pieceId);
    }

    public void delete(long bidId) {
        bidRepository.delete(bidId);
    }

    public Bid accept(Long bidId) {
        Bid bid = bidRepository.findOne(bidId);
        if (bid.getBidState() != BidState.OPEN) {
            throw new BidStateNotOpenException();
        } else {
            if (bidRepository.countBidsByBidStateAndAndPieceId(BidState.ACCEPTED, bid.getPieceId()) != 0)
                throw new BidAlreadyAccepted();
            bid.setBidState(BidState.ACCEPTED);
            bidRepository.save(bid);

            //Remove artwork from on sale.
            //A bid was accepted so the piece will not receive any more bids
            ArtWork a = artworkRepository.findOne(bid.getPieceId());
            a.setOnSale(false);

            //Reject all other bids on same piece
            List<Bid> bids = getBidsOfPiece(bid.getPieceId());
            for(Bid b : bids){
                if(b.getBidId() != bidId){
                    reject(b.getBidId());
                }
            }

            //create a sale record
            String timeStamp = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
            Sale s = new Sale(bid.getBidId(), timeStamp);
            salesRepository.save(s);
            a.setSale(s);
            artworkRepository.save(a);

            sendNotification(bid, "Your bid was accepted", bid.getBidderId());

            return bid;
        }
    }

    public Bid reject(Long bidId) {
        Bid bid = bidRepository.findOne(bidId);
        if (bid.getBidState() == BidState.FINALIZED) {
            throw new BidAlreadyFinalize();
        } else {
            bid.setBidState(BidState.REJECTED);
            bidRepository.save(bid);

            sendNotification(bid, "Your bid was rejected", bid.getBidderId());
            return bid;
        }
    }

    public Bid finalizeBid(Long bidId, boolean isPublic) {
        Bid bid = bidRepository.findOne(bidId);
        if (bid.getBidState() != BidState.ACCEPTED) {
            throw new BidStateNotAcceptedException();
        } else {
            if (bidRepository.countBidsByBidStateAndAndPieceId(BidState.FINALIZED, bid.getPieceId()) != 0)
                throw new BidAlreadyFinalize();

            bid.setBidState(BidState.FINALIZED);
            bidRepository.save(bid);

            ArtWork a = artworkRepository.findOne(bid.getPieceId());
            a.getSale().setPublic(isPublic);

            sendNotification(bid, "The sale is finished", bid.getBidderId());

            return bid;
        }
    }

    private void sendNotification (Bid bid, String message, long destinationUser) {
        Notification n = new Notification(bid,
                message,
               destinationUser);

        notificationService.saveNotification(n);
        notificationService.notify(n, destinationUser);
    }
}
