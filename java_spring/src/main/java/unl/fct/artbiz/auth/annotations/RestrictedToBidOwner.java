package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToBidOwner.CONDITION)
public @interface RestrictedToBidOwner {

    String CONDITION = "@authService.isBidOwner(#bidId)" +
            "AND hasAnyRole('BASIC', 'ARTIST', 'ADMIN')";
}
