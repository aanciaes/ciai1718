package unl.fct.artbiz.bids.model;

import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.users.model.User;

import javax.persistence.*;

@Entity
public class Bid {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long bidId;

    private long pieceId;

    @ManyToOne
    @JoinColumn(name = "peiceId", insertable = false, updatable = false)
    private ArtWork artWorkObject;

    private Long bidderId;

    @ManyToOne
    @JoinColumn(name = "bidderId", insertable = false, updatable = false)
    private User bidderObject;

    private double bidAmount;

    private BidState bidState;

    public Bid () {}

    public Bid(long pieceId, long bidderId, double bidAmount) {
        this.pieceId = pieceId;
        this.bidderId = bidderId;
        this.bidAmount = bidAmount;
        this.bidState = BidState.OPEN;
    }

    public long getBidId() {
        return bidId;
    }

    public void setBidId(long bidId) {
        this.bidId = bidId;
    }

    public long getPieceId() {
        return pieceId;
    }

    public void setPieceId(long pieceId) {
        this.pieceId = pieceId;
    }

    public long getBidderId() {
        return bidderId;
    }

    public void setBidderId(long bidderId) {
        this.bidderId = bidderId;
    }

    public double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(double bidAmount) {
        this.bidAmount = bidAmount;
    }

    public BidState getBidState() {
        return bidState;
    }

    public void setBidState(BidState bidState) {
        this.bidState = bidState;
    }

    public User getBidderObject() {
        return bidderObject;
    }
}
