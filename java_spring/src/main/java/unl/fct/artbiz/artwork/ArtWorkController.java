package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.serializer.ListArtworkSerializer;
import unl.fct.artbiz.artwork.services.ArtworkService;
import unl.fct.artbiz.auth.annotations.PieceIdRestrictedToAuthor;
import unl.fct.artbiz.auth.annotations.RestrictedToAuthor;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/artwork")
public class ArtWorkController {


    @Autowired
    private ArtworkService artworkService;

    @RequestMapping(method = RequestMethod.GET)
    public List<ArtWork> getAllArtWorks() {
        return artworkService.getAllPieces();
    }

    @RequestMapping(value = "/onsale", method = RequestMethod.GET)
    public List<ArtWork> getOnSalePieces() {
        return artworkService.getPiecesOnSalePieces();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ListArtworkSerializer findById(@PathVariable long id) throws ArtWorkNotFound {
        return new ListArtworkSerializer(artworkService.findById(id));
    }

    @RestrictedToAuthor
    @RequestMapping(method = RequestMethod.POST)
    public ArtWork createArtwork(@RequestBody ArtWork artWork) {
        return artworkService.createPiece(artWork);
    }

    @RestrictedToAuthor
    @RequestMapping(method = RequestMethod.PUT)
    public ArtWork updateArtwork(@RequestBody ArtWork artWork) {
        return artworkService.updatePiece(artWork);
    }

    @RequestMapping(value = "/artist/{userId}/list", method = RequestMethod.GET)
    public List<ArtWork> listByArtist(@PathVariable long userId) {
        return artworkService.getPiecesByArtist(userId);
    }

    @PieceIdRestrictedToAuthor
    @RequestMapping(value = "/{pieceId}/sell", method = RequestMethod.PUT)
    public double sellPiece(@PathVariable long pieceId, @RequestParam("price") double price) {
        ArtWork artWork = artworkService.findById(pieceId);
        artWork.setOnSale(true);
        artWork.setPrice(price);
        return artworkService.updatePiece(artWork).getPrice();
    }

    @PieceIdRestrictedToAuthor
    @RequestMapping(value = "/{pieceId}/keep", method = RequestMethod.PUT)
    public boolean keepPiece(@PathVariable long pieceId) {
        ArtWork artWork = artworkService.findById(pieceId);
        artWork.setOnSale(false);
        return artworkService.updatePiece(artWork).isOnSale();
    }

    @PieceIdRestrictedToAuthor
    @RequestMapping(value = "/{pieceId}", method = RequestMethod.DELETE)
    public void deletePiece(@PathVariable long pieceId) {
        artworkService.deletePiece(pieceId);
    }
}
