package unl.fct.artbiz.bids;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.bids.exceptions.BidIsToLowException;
import unl.fct.artbiz.bids.exceptions.LowerBidException;
import unl.fct.artbiz.bids.exceptions.PieceNotOnSaleException;
import unl.fct.artbiz.bids.model.Bid;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/bid")
public class BidController {


    @Autowired
    ArtworkRepository artworkRepository;

    private Map<Long, Bid> bids = new HashMap();

    @RequestMapping(method = RequestMethod.POST)
    public Bid makeBid (@RequestBody Bid incoming) {
        if(bids.containsKey(incoming.getBidId())){
            Bid lastBid = bids.get(incoming.getBidId());
            if(lastBid.getBidAmount()< incoming.getBidAmount()) {
                bids.put(incoming.getBidId(), incoming);
                return incoming;
            }else{
                throw new LowerBidException();
            }
        }else {
            ArtWork artWork = artworkRepository.findById(incoming.getPieceId());
            if (artWork.isOnSale()){
                if(artWork.getPrice()<= incoming.getBidAmount()){
                    return bids.put(incoming.getBidId(), incoming);
                }else {
                    throw new BidIsToLowException();
                }
            }else {
                throw new PieceNotOnSaleException();
            }
        }
    }
}
