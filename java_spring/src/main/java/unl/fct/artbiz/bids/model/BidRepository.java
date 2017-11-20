package unl.fct.artbiz.bids.model;

import org.springframework.stereotype.Repository;
import unl.fct.artbiz.bids.exceptions.BidNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class BidRepository {

    private Map<Long, Bid> bids = new HashMap();

    public boolean exist (long id){
        return bids.containsKey(id);
    }

    public Bid findById (long id) {
        if(!exist(id))
            throw new BidNotFoundException();
        return bids.get(id);

    }

    public void save (Bid bid) {
        bids.put(bid.getBidId(), bid);
    }

    public List<Bid> getBidsOfUser (long id) {
        return bids.values().stream().filter(bid -> bid.getUserId()==id).collect(Collectors.toList());
    }

    public List<Bid> getBidsOfPiece(long pieceId) {
        return bids.values().stream().filter(bid -> bid.getPieceId()==pieceId).collect(Collectors.toList());
    }

    public Bid delete(long bidId) {
        return bids.remove(bidId);
    }
}
