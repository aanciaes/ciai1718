package unl.fct.artbiz.artwork.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "Artwork with same ID already exists")
public class DuplicateIdArtwork extends RuntimeException {
    //
}
