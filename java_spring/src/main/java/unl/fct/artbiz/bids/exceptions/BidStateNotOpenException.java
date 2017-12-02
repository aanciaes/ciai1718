package unl.fct.artbiz.bids.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus( value = HttpStatus.CONFLICT, reason = "Bid is currently not open")
public class BidStateNotOpenException extends RuntimeException {
    //
}
