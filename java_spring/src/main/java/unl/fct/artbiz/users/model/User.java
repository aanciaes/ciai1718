package unl.fct.artbiz.users.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @Column(unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Min(0)
    @Max(1)
    private int accountType;

    //Security

    @JsonIgnore
    @ElementCollection(fetch = FetchType.EAGER)
    private List<GrantedAuthority> roles;

    @JsonIgnore
    private boolean locked;

    @JsonIgnore
    private boolean expired;

    @JsonIgnore
    private boolean enable;

    @JsonIgnore
    private boolean credentialsExpired;
    //

    public User() {
    }

    public User(String name, String email, String password, int accountType) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.accountType = accountType;
        this.locked = false;
        this.expired = false;
        this.enable = true;
        this.credentialsExpired = false;
        this.roles = new ArrayList<>();

        if(accountType == 1)
            roles.add (new Role ("ROLE_ARTIST"));
        else
            roles.add (new Role("ROLE_BASIC"));

    }

    public void setup () {
        this.locked = false;
        this.expired = false;
        this.enable = true;
        this.credentialsExpired = false;
        this.roles = new ArrayList<>();

        if(accountType == 1)
            roles.add (new Role ("ROLE_ARTIST"));
        else
            roles.add (new Role("ROLE_BASIC"));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAccountType() {
        return accountType;
    }

    public void setAccountType(int accountType) {
        this.accountType = accountType;
    }

    //Security

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public boolean isExpired() {
        return expired;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public boolean isCredentialsExpired() {
        return credentialsExpired;
    }

    public void setCredentialsExpired(boolean credentialsExpired) {
        this.credentialsExpired = credentialsExpired;
    }

    public boolean areCredentialsExpired() {
        return credentialsExpired;
    }

    public void areCredentialsExpired(boolean credentialsExpired) {
        this.credentialsExpired = credentialsExpired;
    }

    public List<GrantedAuthority> getRoles() {
        return roles;
    }

    public void setRoles(List<GrantedAuthority> roles) {
        this.roles = roles;
    }
    //
}
