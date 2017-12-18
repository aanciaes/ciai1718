package unl.fct.artbiz.sales.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import unl.fct.artbiz.bids.model.Bid;

import javax.persistence.*;

@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long saleId;

    private long bidId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "bidId", insertable = false, updatable = false)
    private Bid bid;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String buyerEmail;

    private String dateOfSale;
    private boolean isPublic;

    public Sale() {
    }

    public Sale(long bidId, String dateOfSale) {
        this.bidId = bidId;
        this.dateOfSale = dateOfSale;
        this.isPublic = false;
    }

    public long getSaleId() {
        return saleId;
    }

    public void setSaleId(long saleId) {
        this.saleId = saleId;
    }

    public long getBidId() {
        return bidId;
    }

    public void setBidId(long bidId) {
        this.bidId = bidId;
    }

    public String getDateOfSale() {
        return dateOfSale;
    }

    public void setDateOfSale(String dateOfSale) {
        this.dateOfSale = dateOfSale;
    }

    public Bid getBid() {
        return bid;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public String getBuyerEmail() {
        return bid==null ? null : bid.getBidderEmail();
    }

    public void setBuyerEmail(String buyerEmail) {
        this.buyerEmail = buyerEmail;
    }
}
