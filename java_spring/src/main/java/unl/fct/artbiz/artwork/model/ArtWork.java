package unl.fct.artbiz.artwork.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import unl.fct.artbiz.users.model.User;

import javax.persistence.*;
import java.util.List;

@Entity
public class ArtWork {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String dateOfCreation;

    @ElementCollection
    private List<String> techniques;

    private String description;

    @ElementCollection
    private List<String> keywords;

    @ElementCollection
    private List<String> multimedia;

    private Long author;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "author", insertable = false, updatable = false)
    private User authorObject;

    private boolean onSale;
    private double price;

    protected ArtWork() {
    }

    public ArtWork(String name, String dateOfCreation,
                   List<String> techniques, String description,
                   List<String> keywords, List<String> multimedia,
                   long author, boolean onSale, double price) {
        this.name = name;
        this.dateOfCreation = dateOfCreation;
        this.techniques = techniques;
        this.description = description;
        this.keywords = keywords;
        this.multimedia = multimedia;
        this.author = author;
        this.onSale = onSale;
        this.price = price;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(String dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public List<String> getTechniques() {
        return techniques;
    }

    public void setTechniques(List<String> techniques) {
        this.techniques = techniques;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public List<String> getMultimedia() {
        return multimedia;
    }

    public void setMultimedia(List<String> multimedia) {
        this.multimedia = multimedia;
    }

    public long getAuthor() {
        return author;
    }

    public void setAuthor(long author) {
        this.author = author;
    }

    public boolean isOnSale() {
        return onSale;
    }

    public void setOnSale(boolean onSale) {
        this.onSale = onSale;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public User getAuthorObject() {
        return authorObject;
    }

    @Override
    public boolean equals (Object object) {
        if(!(object instanceof ArtWork))
            return false;
        else {
            if(((ArtWork) object).getId() == this.getId())
                return true;
        }
        return false;
    }
}
