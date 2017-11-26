package unl.fct.artbiz.users.model;

import javax.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String email;
    private String encPassword;
    private int accountType;

    public User() {
    }

    public User(String name, String email, String encPassword, int accountType) {
        this.name = name;
        this.email = email;
        this.encPassword = encPassword;
        this.accountType = accountType;
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

    public String getEncPassword() {
        return encPassword;
    }

    public void setEncPassword(String encPassword) {
        this.encPassword = encPassword;
    }

    public int getAccountType() {
        return accountType;
    }

    public void setAccountType(int accountType) {
        this.accountType = accountType;
    }
}
