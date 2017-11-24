package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.services.ArtworkService;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/artwork/search")
public class ArtworkSearchController {


    @Autowired
    ArtworkService artworkService;

    /*@RequestMapping (value = "/search", method = RequestMethod.GET)
    public List<ArtWork> advanceSearch (@RequestParam (required = false, defaultValue = "") String searchQuery,
                                 @RequestParam (required = false, defaultValue = "") String artist,
                                 @RequestParam (required = false, defaultValue = "") String keywords) {

        if(searchQuery.equals("") && artist.equals("") && keywords.equals("")){
            return artworkService.getAllPieces();
        }else {
            if(!artist.equals("") && keywords.equals(""))
                return searchByArtist(Long.parseLong(artist));
            if(artist.equals("") && !keywords.equals(""))
                return searchByKeyword(keywords);
            if(!artist.equals("") && !keywords.equals(""))
                return artworkService.searchByArtistAndKeywords (Long.parseLong(artist), keywords);
            return artworkService.searchByAll (searchQuery);
        }
    }*/


    @RequestMapping(value = "/keywords", method = RequestMethod.GET)
    public List<ArtWork> searchByKeyword (@RequestParam String keywords) {
        List<String> keywordsAsList = Arrays.asList(keywords.split("\\s"));

        return artworkService.getPiecesByKeywords(keywordsAsList);
    }

}
