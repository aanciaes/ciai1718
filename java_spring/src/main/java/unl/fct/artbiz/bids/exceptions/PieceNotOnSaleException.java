package unl.fct.artbiz.bids.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus (value = HttpStatus.CONFLICT, reason = "Piece not on sale")
public class PieceNotOnSaleException extends RuntimeException {
    //
}
