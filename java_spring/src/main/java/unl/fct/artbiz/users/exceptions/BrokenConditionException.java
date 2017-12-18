package unl.fct.artbiz.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.PRECONDITION_FAILED, reason = "Broken Precondition on update")
public class BrokenConditionException extends RuntimeException {
    //
}
