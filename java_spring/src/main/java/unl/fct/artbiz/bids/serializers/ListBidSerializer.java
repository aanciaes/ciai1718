package unl.fct.artbiz.bids.serializers;

import com.fasterxml.jackson.annotation.JsonProperty;
import unl.fct.artbiz.bids.model.Bid;

public class ListBidSerializer {

    @JsonProperty
    private Bid bid;

    @JsonProperty
    private String bidderEmail;

    public ListBidSerializer (Bid bid) {
        this.bid=bid;
        bidderEmail = bid.getBidderObject().getEmail();
    }
}
