package unl.fct.artbiz.artwork.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtworkRepository extends CrudRepository<ArtWork, Long> {

    List<ArtWork> findAll ();

    List<ArtWork> getArtWorksByOnSale (boolean onSale);

    List<ArtWork> getArtWorksByAuthor (long artistId);

    List<ArtWork> getArtWorksByKeywordsIsIn (List<String> keywords);

}
