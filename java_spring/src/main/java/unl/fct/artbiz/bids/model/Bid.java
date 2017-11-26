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

    private Long userId;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User authorObject;

    private double bidAmount;

    public Bid () {}

    public Bid(long pieceId, long userId, double bidAmount) {
        this.pieceId = pieceId;
        this.userId = userId;
        this.bidAmount = bidAmount;
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

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public double getBidAmount() {
        return bidAmount;
    }

    public void setBidAmount(double bidAmount) {
        this.bidAmount = bidAmount;
    }
}
