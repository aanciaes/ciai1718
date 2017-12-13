package unl.fct.artbiz.bids;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.auth.annotations.RestrictedToBidOwner;
import unl.fct.artbiz.auth.annotations.RestrictedToBidderId;
import unl.fct.artbiz.auth.annotations.RestrictedToPieceOwner;
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
    @RestrictedToBidderId
    public Bid makeBid (@RequestBody Bid incoming) {
        return bidService.createBid(incoming);
    }

    @RequestMapping (value = "/user/{userId}", method = RequestMethod.GET)
    public List<Bid> getBidsMadeByUser (@PathVariable long userId) {
        return bidService.getBidsMadeByUser(userId);
    }

    @RequestMapping(value = "/artist/{artistId}", method = RequestMethod.GET)
    public List<Bid> getBidsOfArtist (@PathVariable long artistId) {
        return bidService.getBidsOfArtist(artistId);
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
    @RestrictedToBidOwner
    public void deleteBid (@PathVariable long bidId) {
        bidService.delete(bidId);
    }

    @RequestMapping(value = "/{bidId}/accept", method = RequestMethod.PUT)
    @RestrictedToPieceOwner
    public Bid acceptBid (@PathVariable Long bidId) {
        return bidService.accept(bidId);
    }

    @RequestMapping(value = "/{bidId}/reject", method = RequestMethod.PUT)
    @RestrictedToPieceOwner
    public Bid rejectBid (@PathVariable Long bidId) {
        return bidService.reject(bidId);
    }

    @RequestMapping(value = "/{bidId}/finalize", method = RequestMethod.PUT)
    @RestrictedToPieceOwner
    public Bid finalizeBid (@PathVariable Long bidId) {
        return bidService.finalizeBid(bidId);
    }
}
