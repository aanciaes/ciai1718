package unl.fct.artbiz.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "The e-mail provided already exists")
public class EmailAlreadyExistsException extends RuntimeException {
    //
}
