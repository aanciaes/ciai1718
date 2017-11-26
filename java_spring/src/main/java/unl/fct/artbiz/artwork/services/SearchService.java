package unl.fct.artbiz.artwork.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    ArtworkRepository artworkRepository;

    public List<ArtWork> getPiecesByKeywords(List<String> keywords) {

        return (artworkRepository.getArtWorksByKeywordsIsIn(keywords)).stream().filter(artWork -> artWork.getKeywords().
                containsAll(keywords)).distinct()
                .collect(Collectors.toList());
    }

    public List<ArtWork> searchByArtist(String artist) {
        return artworkRepository.findAll().stream()
                .filter(artWork -> artWork.getAuthorObject().getName().toLowerCase()
                        .contains(artist.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<ArtWork> searchByAll(String searchQuery) {
        List<String> keywordsAsList = Arrays.asList(searchQuery.split("\\s"));

        //TODO: Complete
        return new ArrayList<>();
    }
}
