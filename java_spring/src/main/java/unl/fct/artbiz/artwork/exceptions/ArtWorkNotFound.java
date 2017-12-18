package unl.fct.artbiz.artwork.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Artwork with that id does not exist")
public class ArtWorkNotFound extends RuntimeException {
    //
}
