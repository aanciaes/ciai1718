package unl.fct.artbiz.artwork.serializer;

import com.fasterxml.jackson.annotation.JsonProperty;
import unl.fct.artbiz.artwork.model.ArtWork;

public class ListArtworkSerializer {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private ArtWork artWork;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String authorName;

    public ListArtworkSerializer(ArtWork artWork) {
        this.artWork = artWork;
        this.authorName = artWork.getAuthorObject().getName();
    }

    public ArtWork getArtWork() {
        return artWork;
    }

    public String getAuthorName() {
        return authorName;
    }
}