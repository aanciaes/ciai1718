package unl.fct.artbiz.bids.model;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BidRepository extends CrudRepository<Bid, Long> {


    List<Bid> getBidsByUserId (long userId);

    List<Bid> getBidsByPieceId (long pieceId);

}
