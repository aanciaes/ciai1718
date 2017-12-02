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
import unl.fct.artbiz.bids.serializers.ListBidSerializer;
import unl.fct.artbiz.bids.services.BidService;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
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
    public List<ListBidSerializer> getBidsOfUser (@PathVariable long userId) {
        List<ListBidSerializer> bids = new ArrayList<>();
        bidService.getBidsOfUser(userId).stream().forEach(bid -> bids.add(new ListBidSerializer(bid)));
        return bids;
    }

    @RequestMapping (value = "/piece/{pieceId}", method = RequestMethod.GET)
    public List<ListBidSerializer> getBidsOfPiece (@PathVariable long pieceId) {
        List<ListBidSerializer> bids = new ArrayList<>();
        bidService.getBidsOfPiece(pieceId).stream().forEach(bid -> bids.add(new ListBidSerializer(bid)));
        return bids;
    }

    @RequestMapping (value = "/{bidId}", method = RequestMethod.GET)
    public ListBidSerializer getBidById (@PathVariable long bidId) {
        return new ListBidSerializer(bidService.findById(bidId));
    }

    @RequestMapping(value = "/{bidId}", method = RequestMethod.DELETE)
    public void deleteBid (@PathVariable long bidId) {
        bidService.delete(bidId);
    }

    @RequestMapping(value = "/{bidId}/accept", method = RequestMethod.PUT)
    public Bid acceptBid (@PathVariable Long bidId) {
        return bidService.accept(bidId);
    }

    @RequestMapping(value = "/{bidId}/reject", method = RequestMethod.PUT)
    public Bid rejectBid (@PathVariable Long bidId) {
        return bidService.reject(bidId);
    }
}
