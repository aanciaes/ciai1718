package unl.fct.artbiz.notifications.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus (value = HttpStatus.NOT_FOUND, reason = "No notification with given ID exists")
public class NotificationNotFoundException extends RuntimeException {
    //
}
