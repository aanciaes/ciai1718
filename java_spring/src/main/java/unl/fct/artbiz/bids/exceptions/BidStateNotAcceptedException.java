package unl.fct.artbiz.bids.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "The bid you are trying to finalize is not yet accepted")
public class BidStateNotAcceptedException extends RuntimeException {
    //
}
