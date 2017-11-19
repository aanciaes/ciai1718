package unl.fct.artbiz.artwork;

import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.exceptions.DuplicateIdArtwork;
import unl.fct.artbiz.artwork.model.ArtWork;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/artwork")
public class ArtWorkController {

    //Just for testing
    private Map<Long, ArtWork> artWorks = new HashMap();


    @RequestMapping(method = RequestMethod.GET)
    public List<ArtWork> getAllArtWorks() {
        return new ArrayList<>(artWorks.values());
    }

    @RequestMapping(value = "/onsale", method = RequestMethod.GET)
    public List<ArtWork> getOnSalePeices() {
        return artWorks.values().stream().filter(artWork -> artWork.isOnSale()).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ArtWork findById(@PathVariable long id) throws ArtWorkNotFound {
        ArtWork artWork;

        if ((artWork = artWorks.get(id)) == null) {
            throw new ArtWorkNotFound();
        } else {
            return artWork;
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ArtWork createArtwork(@RequestBody ArtWork artWork) {
        ArtWork.validate(artWork);
        if(artWorks.containsKey(artWork.getId()))
            throw new DuplicateIdArtwork();
        artWorks.put(artWork.getId(), artWork);
        return artWork;
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void updateArtwork(@RequestBody ArtWork artWork) {

        if(!artWorks.containsKey(artWork.getId())){
            throw new ArtWorkNotFound();
        }
        artWorks.put(artWork.getId(), artWork);
    }

    @RequestMapping(value = "/search/artist/{id}", method = RequestMethod.GET)
    public List<ArtWork> searchByArtist (@PathVariable long id) {
        return artWorks.values().stream().filter(artWork -> artWork.getAuthor() == id).collect(Collectors.toList());
    }

    @RequestMapping(value = "/search/keywords", method = RequestMethod.GET)
    public List<ArtWork> searchByKeyword (@RequestParam String keywords) {

        List<String> keywordsAsList = Arrays.asList(keywords.split("\\s"));

        return artWorks.values().stream().filter(artWork -> artWork.getKeywords().containsAll(keywordsAsList))
                .collect(Collectors.toList());
    }
}
