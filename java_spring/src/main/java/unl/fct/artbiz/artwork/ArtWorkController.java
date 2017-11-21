package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.exceptions.DuplicateIdArtwork;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/artwork")
public class ArtWorkController {


    @Autowired
    private ArtworkRepository artRepository;

    @RequestMapping(method = RequestMethod.GET)
    public List<ArtWork> getAllArtWorks() {
        return artRepository.getAll();
    }

    @RequestMapping(value = "/onsale", method = RequestMethod.GET)
    public List<ArtWork> getOnSalePieces() {
        return artRepository.getOnSalePieces();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ArtWork findById(@PathVariable long id) throws ArtWorkNotFound {
        return artRepository.findById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ArtWork createArtwork(@RequestBody ArtWork artWork) {
        return artRepository.save(artWork);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ArtWork updateArtwork(@RequestBody ArtWork artWork) {
        return artRepository.updatePiece(artWork);
    }

    @RequestMapping(value = "/search/artist/{id}", method = RequestMethod.GET)
    public List<ArtWork> searchByArtist (@PathVariable long id) {
        return  artRepository.getByArtist(id);
    }

    @RequestMapping(value = "/search/keywords", method = RequestMethod.GET)
    public List<ArtWork> searchByKeyword (@RequestParam String keywords) {

        List<String> keywordsAsList = Arrays.asList(keywords.split("\\s"));

        return artRepository.getByKeywords(keywordsAsList);
    }

    @RequestMapping(value = "/{pieceId}/sell", method = RequestMethod.PUT)
    public double sellPiece (@PathVariable long pieceId, @RequestParam("price") double price) {
        ArtWork artWork = artRepository.findById(pieceId);
        artWork.setOnSale(true);
        artWork.setPrice(price);
        return artRepository.updatePiece(artWork).getPrice();
    }

    @RequestMapping(value = "/{pieceId}/keep", method = RequestMethod.PUT)
    public boolean keepPiece (@PathVariable long pieceId) {
        ArtWork artWork = artRepository.findById(pieceId);
        artWork.setOnSale(false);
        return artRepository.updatePiece(artWork).isOnSale();
    }
}
