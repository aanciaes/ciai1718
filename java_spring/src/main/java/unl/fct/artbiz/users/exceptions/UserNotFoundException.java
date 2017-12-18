package unl.fct.artbiz.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "User with that id does not exist")
public class UserNotFoundException extends RuntimeException {
    //
}
