package unl.fct.artbiz.bids.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus (value = HttpStatus.FAILED_DEPENDENCY, reason = "Bid amount is lower than asking price")
public class BidIsToLowException extends RuntimeException {
    //
}
