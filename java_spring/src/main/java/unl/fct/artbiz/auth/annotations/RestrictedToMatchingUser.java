package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToMatchingUser.accessCondition)
public @interface RestrictedToMatchingUser {

    String accessCondition = "@authService.restrictedToMatchingUser(#user.getId())" +
            "AND hasAnyRole('BASIC', 'ARTIST', 'ADMIN')";
}
