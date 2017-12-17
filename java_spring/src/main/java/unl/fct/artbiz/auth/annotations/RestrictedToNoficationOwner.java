package unl.fct.artbiz.auth.annotations;


import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToNoficationOwner.accessCondition)
public @interface RestrictedToNoficationOwner {

    String accessCondition = "@authService.restrictedToNotificationOwner(#notificationId)" +
            "AND hasAnyRole('BASIC', 'ARTIST', 'ADMIN')";
}
