package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToPieceAuthor.accessCondition)
public @interface RestrictedToPieceAuthor {

    String accessCondition = "@authService.restrictedToMatchingUser(#artWork.getAuthor()) " +
            "AND hasAnyRole('ARTIST', 'ADMIN')";

}
