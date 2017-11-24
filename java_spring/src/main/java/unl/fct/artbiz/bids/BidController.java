package unl.fct.artbiz.bids;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.bids.exceptions.BidIsToLowException;
import unl.fct.artbiz.bids.exceptions.LowerBidException;
import unl.fct.artbiz.bids.exceptions.PieceNotOnSaleException;
import unl.fct.artbiz.bids.model.Bid;
import unl.fct.artbiz.bids.services.BidService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/bid")
public class BidController {


    @Autowired
    BidService bidService;


    @RequestMapping(method = RequestMethod.POST)
    public Bid makeBid (@RequestBody Bid incoming) {
        return bidService.createBid(incoming);
    }

    @RequestMapping (value = "/user/{userId}", method = RequestMethod.GET)
    public List<Bid> getBidsOfUser (@PathVariable long userId) {
        return bidService.getBidsOfUser(userId);
    }

    @RequestMapping (value = "/piece/{pieceId}", method = RequestMethod.GET)
    public List<Bid> getBidsOfPiece (@PathVariable long pieceId) {
        return bidService.getBidsOfPiece(pieceId);
    }

    @RequestMapping (value = "/{bidId}", method = RequestMethod.GET)
    public Bid getBidById (@PathVariable long bidId) {
        return bidService.findById(bidId);
    }

    @RequestMapping(value = "/{bidId}", method = RequestMethod.DELETE)
    public void deleteBid (@PathVariable long bidId) {
        bidService.delete(bidId);
    }
}