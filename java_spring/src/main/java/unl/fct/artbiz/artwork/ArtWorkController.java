package unl.fct.artbiz.artwork;

import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.model.ArtWork;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/artwork")
public class ArtWorkController {

    //Just for testing
    private List<ArtWork> artWorks = new ArrayList();


    @RequestMapping(method = RequestMethod.GET)
    public List<ArtWork> getAllArtWorks() {
        return artWorks;
    }

    @RequestMapping(value = "/onsale", method = RequestMethod.GET)
    public List<ArtWork> getOnSalePeices() {
        return artWorks.stream().filter(artWork -> artWork.isOnSale()).collect(Collectors.toList());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ArtWork findById(@PathVariable long id) throws ArtWorkNotFound {
        Optional<ArtWork> matchingArtWork = artWorks.stream().filter(artWork -> artWork.getId() == id).findFirst();

        ArtWork res;

        if ((res = matchingArtWork.orElse(null)) == null) {
            throw new ArtWorkNotFound();
        }else {
            return res;
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ArtWork createArtwork(@RequestBody ArtWork artWork) {
        ArtWork.validate(artWork);
        artWorks.add(artWork);
        return artWork;
    }


}
