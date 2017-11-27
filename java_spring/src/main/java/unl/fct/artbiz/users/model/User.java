package unl.fct.artbiz.users.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private String email;
    private String password;

    @Min(0)
    @Max(1)
    private int accountType;

    //Security

    @JsonIgnore
    @ElementCollection
    private List<Role> roles;

    @JsonIgnore
    private boolean isLocked;

    @JsonIgnore
    private boolean isExpired;

    @JsonIgnore
    private boolean isEnable;

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
        this.isLocked = false;
        this.isExpired = false;
        this.isEnable = true;
        this.credentialsExpired = false;
        this.roles = new ArrayList<>();

        if(accountType == 1)
            roles.add (new Role ("ARTIST"));
        else
            roles.add (new Role("BASIC"));

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
        return isLocked;
    }

    public void setLocked(boolean locked) {
        isLocked = locked;
    }

    public boolean isExpired() {
        return isExpired;
    }

    public void setExpired(boolean expired) {
        isExpired = expired;
    }

    public boolean isEnable() {
        return isEnable;
    }

    public void setEnable(boolean enable) {
        isEnable = enable;
    }

    public boolean areCredentialsExpired() {
        return credentialsExpired;
    }

    public void areCredentialsExpired(boolean credentialsExpired) {
        this.credentialsExpired = credentialsExpired;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
    //
}
