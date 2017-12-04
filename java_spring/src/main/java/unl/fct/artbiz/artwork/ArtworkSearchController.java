package unl.fct.artbiz.artwork;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.serializer.ListArtworkSerializer;
import unl.fct.artbiz.artwork.common.OrderLists;
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
                                       @RequestParam(required = false, defaultValue = "null") String techniques,
                                       @RequestParam (required = false, defaultValue = "noorder") String orderBy,
                                       @RequestParam (required = false) boolean reverse) {

        List<ListArtworkSerializer> result = new ArrayList<>();
        if(!searchQuery.equals("null")) {
            searchService.search(searchQuery).stream()
                    .forEach(artWork -> result.add(new ListArtworkSerializer(artWork)));
        }else {
            searchService.advancedSearch(artist, keywords, techniques)
                    .forEach(artWork -> result.add(new ListArtworkSerializer(artWork)));;
        }

        return OrderLists.order(orderBy, result, reverse);
    }
}
