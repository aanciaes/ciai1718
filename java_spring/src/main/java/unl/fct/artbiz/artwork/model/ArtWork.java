package unl.fct.artbiz.artwork.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class ArtWork {

    private long id;
    private String name;
    private Date dateOfCreation;
    private List<String> techniques;
    private String description;
    private List<String> keywords;
    private List<String> multimedia;
    private long author;
    private boolean onSale;

    public ArtWork () { }

    public ArtWork(long id, String name, String dateOfCreation,
                   List<String> techniques, String description,
                   List<String> keywords, List<String> multimedia,
                   long author, boolean onSale) {
        this.id = id;
        this.name = name;
        this.techniques = techniques;
        this.description = description;
        this.keywords = keywords;
        this.multimedia = multimedia;
        this.author = author;
        this.onSale = onSale;

        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            this.dateOfCreation = format.parse(dateOfCreation);
        }catch (ParseException e){
            this.dateOfCreation = null;
        }
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

    public Date getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(String dateOfCreation) {
        try {
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            this.dateOfCreation = format.parse(dateOfCreation);
        }catch (ParseException e){
            this.dateOfCreation = null;
        }
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

    public static void validate (ArtWork artWork) {
        //TODO: Validate schema
    }

}
