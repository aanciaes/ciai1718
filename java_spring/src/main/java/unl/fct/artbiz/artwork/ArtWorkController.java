package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.services.ArtworkService;

import java.util.*;

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
    public ArtWork findById(@PathVariable long id) throws ArtWorkNotFound {
        return artworkService.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ArtWork createArtwork(@RequestBody ArtWork artWork) {
        return artworkService.createPiece(artWork);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ArtWork updateArtwork(@RequestBody ArtWork artWork) {
        return artworkService.updatePiece(artWork);
    }

    @RequestMapping(value = "/search/artist/{id}", method = RequestMethod.GET)
    public List<ArtWork> searchByArtist (@PathVariable long id) {
        return  artworkService.getPiecesByArtist(id);
    }

    @RequestMapping(value = "/search/keywords", method = RequestMethod.GET)
    public List<ArtWork> searchByKeyword (@RequestParam String keywords) {
        List<String> keywordsAsList = Arrays.asList(keywords.split("\\s"));

        return artworkService.getPiecesByKeywords(keywordsAsList);
    }

    @RequestMapping(value = "/{pieceId}/sell", method = RequestMethod.PUT)
    public double sellPiece (@PathVariable long pieceId, @RequestParam("price") double price) {
        ArtWork artWork = artworkService.findById(pieceId);
        artWork.setOnSale(true);
        artWork.setPrice(price);
        return artworkService.updatePiece(artWork).getPrice();
    }

    @RequestMapping(value = "/{pieceId}/keep", method = RequestMethod.PUT)
    public boolean keepPiece (@PathVariable long pieceId) {
        ArtWork artWork = artworkService.findById(pieceId);
        artWork.setOnSale(false);
        return artworkService.updatePiece(artWork).isOnSale();
    }

    @RequestMapping (value = "/{pieceId}", method = RequestMethod.DELETE)
    public void deletePiece (@PathVariable long pieceId) {
        artworkService.deletePiece(pieceId);
    }


}
