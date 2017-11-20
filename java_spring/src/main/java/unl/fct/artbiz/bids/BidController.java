package unl.fct.artbiz.bids;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.bids.exceptions.BidIsToLowException;
import unl.fct.artbiz.bids.exceptions.LowerBidException;
import unl.fct.artbiz.bids.exceptions.PieceNotOnSaleException;
import unl.fct.artbiz.bids.model.Bid;
import unl.fct.artbiz.bids.model.BidRepository;

import java.util.List;

@RestController
@RequestMapping(value = "/bid")
public class BidController {


    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    BidRepository bidRepository;


    @RequestMapping(method = RequestMethod.POST)
    public Bid makeBid (@RequestBody Bid incoming) {
        if(bidRepository.exist(incoming.getBidId())){
            Bid lastBid = bidRepository.findById(incoming.getBidId());
            if(lastBid.getBidAmount()< incoming.getBidAmount()) {
                bidRepository.save(incoming);
                return incoming;
            }else{
                throw new LowerBidException();
            }
        }else {
            ArtWork artWork = artworkRepository.findById(incoming.getPieceId());
            if (artWork.isOnSale()){
                if(artWork.getPrice() <= incoming.getBidAmount()){
                    bidRepository.save(incoming);
                    return incoming;
                }else {
                    throw new BidIsToLowException();
                }
            }else {
                throw new PieceNotOnSaleException();
            }
        }
    }

    @RequestMapping (value = "/user/{userId}", method = RequestMethod.GET)
    public List<Bid> getBidsOfUser (@PathVariable long userId) {
        return bidRepository.getBidsOfUser(userId);
    }

    @RequestMapping (value = "/piece/{pieceId}", method = RequestMethod.GET)
    public List<Bid> getBidsOfPiece (@PathVariable long pieceId) {
        return bidRepository.getBidsOfPiece(pieceId);
    }

    @RequestMapping(value = "/{bidId}", method = RequestMethod.DELETE)
    public Bid deletBid (@PathVariable long bidId) {
        return bidRepository.delete(bidId);
    }
}
