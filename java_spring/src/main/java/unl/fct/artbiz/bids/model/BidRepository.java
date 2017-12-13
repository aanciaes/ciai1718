package unl.fct.artbiz.bids.model;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BidRepository extends CrudRepository<Bid, Long> {


    List<Bid> getBidsBybidderId (long bidderId);

    List<Bid> getBidsByPieceId (long pieceId);

    int countBidsByBidStateAndAndPieceId (BidState bidState, long pieceId);

    List<Bid> getBidsByOwnerId (long ownerId);

}
