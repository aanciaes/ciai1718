package unl.fct.artbiz.bids;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.auth.annotations.*;
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
    @RestrictedToBidderId
    public Bid makeBid (@RequestBody Bid incoming) {
        return bidService.createBid(incoming);
    }

    @RestrictedToMatchingUserGivenId
    @RequestMapping (value = "/user/{userId}", method = RequestMethod.GET)
    public List<Bid> getBidsMadeByUser (@PathVariable long userId) {
        return bidService.getBidsMadeByUser(userId);
    }

    @RestrictedToMatchingAuthorGivenId
    @RequestMapping(value = "/artist/{artistId}", method = RequestMethod.GET)
    public List<Bid> getBidsOfArtist (@PathVariable long artistId) {
        return bidService.getBidsOfArtist(artistId);
    }

    @RestrictedToAuthorGivenPieceId
    @RequestMapping (value = "/piece/{pieceId}", method = RequestMethod.GET)
    public List<Bid> getBidsOfPiece (@PathVariable long pieceId) {
        return bidService.getBidsOfPiece(pieceId);
    }

    @RequestMapping (value = "/{bidId}", method = RequestMethod.GET)
    public Bid getBidById (@PathVariable long bidId) {
        return bidService.findById(bidId);
    }

    @RequestMapping(value = "/{bidId}", method = RequestMethod.DELETE)
    @RestrictedToBidOwner
    public void deleteBid (@PathVariable long bidId) {
        bidService.delete(bidId);
    }

    @RequestMapping(value = "/{bidId}/accept", method = RequestMethod.PUT)
    @RestrictedToPieceOwnerGivenBidId
    public Bid acceptBid (@PathVariable Long bidId) {
        return bidService.accept(bidId);
    }

    @RequestMapping(value = "/{bidId}/reject", method = RequestMethod.PUT)
    @RestrictedToPieceOwnerGivenBidId
    public Bid rejectBid (@PathVariable Long bidId) {
        return bidService.reject(bidId);
    }

    @RequestMapping(value = "/{bidId}/finalize", method = RequestMethod.PUT)
    @RestrictedToPieceOwnerGivenBidId
    public Bid finalizeBid (@PathVariable Long bidId) {
        return bidService.finalizeBid(bidId);
    }
}
