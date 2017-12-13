package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;
import java.lang.annotation.*;


@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToMatchingAuthorGivenId.accessCondition)
public @interface RestrictedToMatchingAuthorGivenId {

    String accessCondition = "@authService.restrictedToMatchingUser(#artistId)" +
            "AND hasAnyRole('ARTIST', 'ADMIN')";
}