package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spi.service.contexts.SecurityContext;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
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

    @Autowired
    ArtworkRepository artworkRepository;

    //TODO: Complete
    @RequestMapping (method = RequestMethod.GET)
    public List<ArtWork> advanceSearch (@RequestParam (required = false, defaultValue = "") String searchQuery,
                                 @RequestParam (required = false, defaultValue = "") String artist,
                                 @RequestParam (required = false, defaultValue = "") String keywords) {

        if(searchQuery.equals("") && artist.equals("") && keywords.equals("")){
            return searchService.getAll();
        }else {
            if(!artist.equals("") && keywords.equals(""))
                return searchService.searchByArtists(artist);
            if(artist.equals("") && !keywords.equals(""))
                return searchService.searchByKeywords(keywords);
            if(!artist.equals("") && !keywords.equals(""))
                return searchService.searchByArtistsAndKeywords (artist, keywords);
            return searchService.searchByAll (searchQuery);
        }
    }
}
