package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToAuthorGivenPieceId.accessCondition)
public @interface RestrictedToAuthorGivenPieceId {

    String accessCondition = "@authService.restrictedToMatchingUserGivenPieceId(#pieceId)" +
            "AND hasAnyRole('ARTIST', 'ADMIN')";

}
