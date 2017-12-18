package unl.fct.artbiz.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "A user with same ID already exists")
public class DuplicatedUser extends RuntimeException {
    //
}
