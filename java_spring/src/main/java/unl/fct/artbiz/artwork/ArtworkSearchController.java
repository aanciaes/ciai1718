package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spi.service.contexts.SecurityContext;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.services.ArtworkService;
import unl.fct.artbiz.artwork.services.SearchService;

import java.security.Security;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/artwork/search")
public class ArtworkSearchController {


    @Autowired
    SearchService searchService;

    /* //TODO: Complete
    @RequestMapping (method = RequestMethod.GET)
    public List<ArtWork> advanceSearch (@RequestParam (required = false, defaultValue = "") String searchQuery,
                                 @RequestParam (required = false, defaultValue = "") String artist,
                                 @RequestParam (required = false, defaultValue = "") String keywords) {

        if(searchQuery.equals("") && artist.equals("") && keywords.equals("")){
            return artworkService.getAllPieces();
        }else {
            if(!artist.equals("") && keywords.equals(""))
                return searchByArtist(artist);
            if(artist.equals("") && !keywords.equals(""))
                return searchByKeyword(keywords);
            if(!artist.equals("") && !keywords.equals(""))
                return searchService.searchByArtistAndKeywords (artist, keywords);
            return searchService.searchByAll (searchQuery);
        }
    }*/


    @RequestMapping(value = "/keywords", method = RequestMethod.GET)
    public List<ArtWork> searchByKeyword (@RequestParam String keywords) {
        List<String> keywordsAsList = Arrays.asList(keywords.split("\\s"));

        return searchService.getPiecesByKeywords(keywordsAsList);
    }

    @RequestMapping (value = "/artist", method = RequestMethod.GET)
    public List<ArtWork> searchByArtist (@RequestParam String artist) {
        return searchService.searchByArtist (artist);
    }

}
