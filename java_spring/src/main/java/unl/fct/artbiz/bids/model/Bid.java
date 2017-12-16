package unl.fct.artbiz.bids.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JoinColumn(name = "pieceId", insertable = false, updatable = false)
    private ArtWork artWorkObject;

    private Long bidderId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "bidderId", insertable = false, updatable = false)
    private User bidderObject;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String bidderEmail;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long ownerId;

    private double bidAmount;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
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

    public ArtWork getArtWorkObject() {
        return artWorkObject;
    }

    public void setArtWorkObject(ArtWork artWorkObject) {
        this.artWorkObject = artWorkObject;
    }

    public String getBidderEmail() {
        return bidderObject.getEmail();
    }

    public void setBidderEmail(String bidderEmail) {
        this.bidderEmail = bidderEmail;
    }

    public long getOwnerId() {
        return getArtWorkObject().getAuthor();
    }
}
