package unl.fct.artbiz.notifications.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import unl.fct.artbiz.bids.model.Bid;

import javax.persistence.*;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private Bid bid;

    @JsonIgnore
    private Long destinationUser;

    private String message;

    private NotificationState state;

    public Notification(Bid bid, String message, Long destinationUser) {
        this.bid = bid;
        this.message = message;
        this.destinationUser = destinationUser;
        this.state = NotificationState.NEW;
    }

    public Bid getBid() {
        return bid;
    }

    public void setBid(Bid bid) {
        this.bid = bid;
    }

    public NotificationState getState() {
        return state;
    }

    public void setState(NotificationState state) {
        this.state = state;
    }
}

