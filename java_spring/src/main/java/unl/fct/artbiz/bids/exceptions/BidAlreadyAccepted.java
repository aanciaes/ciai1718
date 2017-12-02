package unl.fct.artbiz.bids.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "You have already accepted a bid for that piece")
public class BidAlreadyAccepted extends RuntimeException {
    //
}
