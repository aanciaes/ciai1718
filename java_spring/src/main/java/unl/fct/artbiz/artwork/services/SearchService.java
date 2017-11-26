package unl.fct.artbiz.artwork.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    ArtworkRepository artworkRepository;

    public List<ArtWork> getAll () {
        return artworkRepository.findAll();
    }

    public List<ArtWork> searchByKeywords(String keywords) {
        List<String> keywordsAsList = Arrays.asList(keywords.split("\\s"));

        return (artworkRepository.getArtWorksByKeywordsIsIn(keywordsAsList))
                .stream().filter(artWork -> artWork.getKeywords().
                containsAll(keywordsAsList)).distinct()
                .collect(Collectors.toList());
    }

    public List<ArtWork> searchByArtists(String artists) {
        List<String> artistsAsList = Arrays.asList(artists.split("\\s"));
        System.out.println("Search by artists");
        for (String x : artistsAsList){
            System.out.println("Query: " + x);
        }

        return artworkRepository.findAll().stream()
                .filter(artWork ->  {
                    for (String query : artistsAsList) {
                        if (artWork.getAuthorObject().getName().toLowerCase().contains(query.toLowerCase()))
                            return true;
                    }
                    return false;
                })
                .collect(Collectors.toList());
    }

    public List<ArtWork> searchByInDescription (String query) {
        List<String> queryAsList = Arrays.asList(query.split("\\s"));

        return (artworkRepository.findAll())
                .stream().filter(artWork -> {
                    for (String queryWord : queryAsList){
                        if(artWork.getDescription().contains(queryWord))
                            return true;
                    }
                    return false;
                }).distinct()
                .collect(Collectors.toList());
    }

    public List<ArtWork> searchByAll(String searchQuery) {
        List<String> queryWords = Arrays.asList(searchQuery.split("\\s"));

        List<ArtWork> result = searchByArtists(searchQuery);
        result.addAll(searchByKeywords(searchQuery));
        result.addAll(searchByInDescription(searchQuery));

        return result;
    }

    public List<ArtWork> searchByArtistsAndKeywords(String artist, String keywords) {

        List<ArtWork> result = searchByArtists(artist);
        result.retainAll(searchByKeywords(keywords));

        return result;
    }
}
