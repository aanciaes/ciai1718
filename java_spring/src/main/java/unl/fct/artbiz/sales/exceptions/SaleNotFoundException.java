package unl.fct.artbiz.sales.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No sale with that ID exists in the system")
public class SaleNotFoundException extends RuntimeException {
    //
}
