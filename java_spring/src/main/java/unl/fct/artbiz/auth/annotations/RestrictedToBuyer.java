package unl.fct.artbiz.auth.annotations;

import org.springframework.security.access.prepost.PreAuthorize;
import java.lang.annotation.*;

@Target({ElementType.METHOD, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
@PreAuthorize(RestrictedToBuyer.CONDITION)
public @interface RestrictedToBuyer {

    String CONDITION = "@authService.isBuyer(#saleId)" +
            "AND hasAnyRole('BASIC', 'ARTIST', 'ADMIN')";
}
