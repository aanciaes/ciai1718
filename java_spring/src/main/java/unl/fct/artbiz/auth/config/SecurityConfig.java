package unl.fct.artbiz.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import unl.fct.artbiz.auth.model.UserPrincipal;
import unl.fct.artbiz.auth.service.AuthService;
import unl.fct.artbiz.users.model.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] publicGetEndpoints = {"/artwork", "/artwork/{id}", "/artwork/search/**", "/artwork/artist/**"};
    private static final String[] publicPostEndpoints = {"/user/register"};

    @Autowired
    private AuthService authService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, publicGetEndpoints).permitAll()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, publicPostEndpoints).permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .successHandler(successHandler())
                .failureHandler(failureHandler())
                .and()
                //.loginPage("/login")
                .logout()
                .permitAll();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/v2/api-docs", "/configuration/ui", "/swagger-resources/**", "/configuration/**", "/swagger-ui.html", "/webjars/**");

    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider
                = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(authService);
        authProvider.setPasswordEncoder(encoder());
        return authProvider;
    }

    @Bean
    public ShaPasswordEncoder encoder() {
        ShaPasswordEncoder encoder = new ShaPasswordEncoder();
        encoder.setEncodeHashAsBase64(true);
        return encoder;
    }

    private AuthenticationSuccessHandler successHandler() {
        return (httpServletRequest, httpServletResponse, authentication) -> {
            httpServletResponse.setStatus(200);
            UserPrincipal user = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            httpServletResponse.setContentType("application/json");

            PrintWriter out = httpServletResponse.getWriter();

            ObjectMapper mapper = new ObjectMapper();
            out.print(mapper.writeValueAsString(user.getUser()));
            out.flush();
        };
    }

    private AuthenticationFailureHandler failureHandler() {
        return (httpServletRequest, httpServletResponse, e) -> httpServletResponse.setStatus(401);
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
