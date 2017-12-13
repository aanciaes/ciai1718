package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToMatchingUserGivenId.accessCondition)
public @interface RestrictedToMatchingUserGivenId {

    String accessCondition = "@authService.restrictedToMatchingUser(#userId)" +
            "AND hasAnyRole('BASIC', 'ARTIST', 'ADMIN')";
}