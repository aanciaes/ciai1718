package unl.fct.artbiz.bids.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.bids.exceptions.BidIsToLowException;
import unl.fct.artbiz.bids.exceptions.BidNotFoundException;
import unl.fct.artbiz.bids.exceptions.LowerBidException;
import unl.fct.artbiz.bids.exceptions.PieceNotOnSaleException;
import unl.fct.artbiz.bids.model.Bid;
import unl.fct.artbiz.bids.model.BidRepository;

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

    public boolean exist (long id){
        return bidRepository.exists(id);
    }

    public Bid findById (long id) {
        if(!exist(id))
            throw new BidNotFoundException();
        return bidRepository.findOne(id);

    }

    public Bid createBid (Bid incoming) {
        if(exist(incoming.getBidId())){
            Bid lastBid = findById(incoming.getBidId());
            if(lastBid.getBidAmount()< incoming.getBidAmount()) {
                bidRepository.save(incoming);
                return incoming;
            }else{
                throw new LowerBidException();
            }
        }else {
            if(artworkRepository.exists(incoming.getPieceId())) {
                ArtWork artWork = artworkRepository.findOne(incoming.getPieceId());

                if (artWork.isOnSale()) {
                    if (artWork.getPrice() <= incoming.getBidAmount()) {
                        bidRepository.save(incoming);
                        return incoming;
                    } else {
                        throw new BidIsToLowException();
                    }
                } else {
                    throw new PieceNotOnSaleException();
                }
            }else {
                throw new ArtWorkNotFound();
            }
        }
    }

    public List<Bid> getBidsOfUser (long id) {
        return bidRepository.getBidsByUserId(id);
    }

    public List<Bid> getBidsOfPiece(long pieceId) {
        return bidRepository.getBidsByPieceId(pieceId);
    }

    public void delete(long bidId) {
        bidRepository.delete(bidId);
    }
}