package unl.fct.artbiz.artwork.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtworkRepository extends CrudRepository<ArtWork, Long> {

    List<ArtWork> findAll ();

    List<ArtWork> getArtWorkByOnSale (boolean onSale);

    List<ArtWork> getArtWorkByAuthor (long artistId);

    List<ArtWork> getArtWorkByKeywordsIsIn (List<String> keywords);

}
