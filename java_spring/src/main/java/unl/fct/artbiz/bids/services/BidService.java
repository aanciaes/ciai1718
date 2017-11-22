package unl.fct.artbiz.bids.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import unl.fct.artbiz.bids.exceptions.BidNotFoundException;
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

    public boolean exist (long id){
        return bidRepository.exists(id);
    }

    public Bid findById (long id) {
        if(!exist(id))
            throw new BidNotFoundException();
        return bidRepository.findOne(id);

    }

    public Bid save (Bid bid) {
        return bidRepository.save(bid);
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
