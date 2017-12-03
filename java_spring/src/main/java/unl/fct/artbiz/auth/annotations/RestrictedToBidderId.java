package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToBidderId.accessCondition)
public @interface RestrictedToBidderId {

    String accessCondition = "@authService.restrictedToMatchingUser(#incoming.getBidderId())" +
            "AND hasAnyRole('BASIC', 'ARTIST', 'ADMIN')";

}
