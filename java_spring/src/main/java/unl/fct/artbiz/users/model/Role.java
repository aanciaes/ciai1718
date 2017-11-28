package unl.fct.artbiz.users.model;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {

    private String authority;

    public Role() {
    }

    public Role(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}
