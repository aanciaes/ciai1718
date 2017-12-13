package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToPieceOwnerGivenBidId.accessCondition)
public @interface RestrictedToPieceOwnerGivenBidId {

    String accessCondition = "@authService.isPieceOnBidOwner(#bidId)" +
            "AND hasAnyRole('ARTIST', 'ADMIN')";
}
