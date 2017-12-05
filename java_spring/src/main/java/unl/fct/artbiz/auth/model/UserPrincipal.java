package unl.fct.artbiz.auth.model;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import unl.fct.artbiz.users.model.User;

import java.util.Collection;

public class UserPrincipal implements UserDetails {

    private User user;
    private String sessionId;

    public UserPrincipal(User user) {
        this.user = user;
    }

    public long getUserId() {
        return user.getId();
    }

    public User getUser () {
        return user;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return !user.isExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return !user.isLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return !user.areCredentialsExpired();
    }

    @Override
    public boolean isEnabled() {
        return user.isEnable();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles();
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
