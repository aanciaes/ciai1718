package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.artwork.serializer.ListArtworkSerializer;
import unl.fct.artbiz.artwork.services.SearchService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/artwork/search")
public class ArtworkSearchController {


    @Autowired
    SearchService searchService;


    @RequestMapping(method = RequestMethod.GET)
    public List<ListArtworkSerializer> advanceSearch(@RequestParam(required = false, defaultValue = "null") String searchQuery,
                                       @RequestParam(required = false, defaultValue = "null") String artist,
                                       @RequestParam(required = false, defaultValue = "null") String keywords,
                                       @RequestParam(required = false, defaultValue = "null") String techniques) {

        List<ListArtworkSerializer> result = new ArrayList<>();
        if(!searchQuery.equals("null")) {

            searchService.search(searchQuery).stream()
                    .forEach(artWork -> result.add(new ListArtworkSerializer(artWork)));
        }else {
            searchService.advancedSearch(artist, keywords, techniques)
                    .forEach(artWork -> result.add(new ListArtworkSerializer(artWork)));;
        }

        return result;
        /*if (searchQuery.equals("") && artist.equals("") && keywords.equals("")) {
            return searchService.getAll();
        } else {
            if (!artist.equals("") && keywords.equals(""))
                return searchService.searchByArtists(artist);
            if (artist.equals("") && !keywords.equals(""))
                return searchService.searchByKeywords(keywords);
            if (!artist.equals("") && !keywords.equals(""))
                return searchService.searchByArtistsAndKeywords(artist, keywords);
            return searchService.searchByAll(searchQuery);
        }*/
    }
}
