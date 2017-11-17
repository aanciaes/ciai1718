package unl.fct.artbiz.artwork;

import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;

import javax.websocket.server.PathParam;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/artwork")
public class ArtWorkController {

    //Just for testing
    private Map<Long, ArtWork> artWorks = new HashMap<Long, ArtWork>();


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
        artWorks.put(artWork.getId(), artWork);
        return artWork;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ArtWork updateArtwork(@PathVariable long id, @RequestBody ArtWork artWork) {
        ArtWork res;

        if(!artWorks.containsKey(id)){
            throw new ArtWorkNotFound();
        }

        return artWorks.put(id, artWork);
    }
}
