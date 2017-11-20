package unl.fct.artbiz.artwork.model;

import org.springframework.stereotype.Repository;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.exceptions.DuplicateIdArtwork;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Repository
public class ArtworkRepository {

    //Just for testing
    private Map<Long, ArtWork> artWorks = new HashMap();

    public ArtworkRepository () {}

    public List<ArtWork> getAll () {
        return new ArrayList<>(artWorks.values());
    }

    public List<ArtWork> getOnSalePieces () {
        return artWorks.values().stream().filter(artWork -> artWork.isOnSale()).collect(Collectors.toList());
    }

    public ArtWork findById (long id){
        ArtWork artWork;

        if ((artWork = artWorks.get(id)) == null) {
            throw new ArtWorkNotFound();
        } else {
            return artWork;
        }
    }

    public ArtWork save (ArtWork artWork) {
        ArtWork.validate(artWork);
        if(artWorks.containsKey(artWork.getId()))
            throw new DuplicateIdArtwork();
        artWorks.put(artWork.getId(), artWork);
        return artWork;
    }

    public ArtWork updatePiece (ArtWork artWork) {
        if(!artWorks.containsKey(artWork.getId())){
            throw new ArtWorkNotFound();
        }
        artWorks.put(artWork.getId(), artWork);
        return artWork;
    }

    public List<ArtWork> getByArtist (long id) {
        return artWorks.values().stream().filter(artWork -> artWork.getAuthor() == id).collect(Collectors.toList());
    }

    public List<ArtWork> getByKeywords (List<String> keywords) {
        return artWorks.values().stream().filter(artWork -> artWork.getKeywords().containsAll(keywords))
                .collect(Collectors.toList());
    }


}
