package unl.fct.artbiz.artwork.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.artwork.serializer.ListArtworkSerializer;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SearchService {

    @Autowired
    ArtworkRepository artworkRepository;

    public List<ArtWork> searchByKeywords(String keywords) {
        if (keywords.equals("null"))
            return null;

        List<String> keywordsAsList = Arrays.asList(keywords.split("\\s"));

        return artworkRepository.findAll()
                .stream()
                .filter(artWork -> listContainsKeywords (artWork.getKeywords(), keywordsAsList))
                .distinct()
                .collect(Collectors.toList());
    }

    public List<ArtWork> searchByArtists(String artists) {
        if (artists.equals("null"))
            return null;

        List<String> artistsAsList = Arrays.asList(artists.split("\\s"));

        return artworkRepository.findAll().stream()
                .filter(artWork -> {
                    for (String query : artistsAsList) {
                        if (artWork.getAuthorObject().getName().toLowerCase().contains(query.toLowerCase()))
                            return true;
                    }
                    return false;
                })
                .distinct().collect(Collectors.toList());
    }

    public List<ArtWork> searchByInDescription(String query) {
        if (query.equals("null"))
            return null;

        List<String> queryAsList = Arrays.asList(query.split("\\s"));

        return (artworkRepository.findAll())
                .stream().filter(artWork -> {
                    for (String queryWord : queryAsList) {
                        if (artWork.getDescription().contains(queryWord))
                            return true;
                    }
                    return false;
                }).distinct()
                .collect(Collectors.toList());
    }

    public List<ArtWork> searchByName(String query) {
        if (query.equals("null"))
            return null;

        List<String> nameAsList = Arrays.asList(query.split("\\s"));

        return artworkRepository.findAll().stream()
                .filter(artWork -> {
                    for (String name : nameAsList) {
                        if (artWork.getName().toLowerCase().contains(name.toLowerCase()))
                            return true;
                    }
                    return false;
                })
                .distinct().collect(Collectors.toList());
    }

    public List<ArtWork> searchByTechniques(String techniques) {
        if (techniques.equals("null"))
            return null;

        List<String> techinquesAsList = Arrays.asList(techniques.split("\\s"));

        return artworkRepository.findAll()
                .stream()
                .filter(artWork -> listContainsKeywords (artWork.getTechniques(), techinquesAsList))
                .distinct()
                .collect(Collectors.toList());
    }

    public List<ArtWork> search(String query) {
        List<ArtWork> result = new ArrayList<>();

        List<ArtWork> artists = searchByArtists(query);
        List<ArtWork> keywords = searchByKeywords(query);
        List<ArtWork> description = searchByInDescription(query);
        List<ArtWork> name = searchByName(query);


        result.addAll(artists == null ? new ArrayList<>() : artists);
        result.addAll(keywords == null ? new ArrayList<>() : keywords);
        result.addAll(description == null ? new ArrayList<>() : description);
        result.addAll(name == null ? new ArrayList<>() : name);

        return result.stream().distinct().collect(Collectors.toList());
    }

    public List<ArtWork> advancedSearch(String artistsQuery, String keywordsQuery, String techniquesQuery) {
        List<ArtWork> result = new ArrayList<>();

        List<ArtWork> artists = searchByArtists(artistsQuery);
        List<ArtWork> keywords = searchByKeywords(keywordsQuery);
        List<ArtWork> techniques = searchByTechniques(techniquesQuery);

        if (artists != null)
            result.addAll(artists);

        if (keywords != null) {
            if (result.size() == 0) {
                result.addAll(keywords);
            } else {
                result.retainAll(keywords);
            }
        }

        if (techniques != null) {
            if (result.size() == 0) {
                result.addAll(techniques);
            } else {
                result.retainAll(techniques);
            }
        }

        return result;
    }

    public List<ListArtworkSerializer> orderBy(String orderBy, List<ListArtworkSerializer> result) {

        if (orderBy.equals("date")) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            result.sort((a1, a2) -> {
                try {
                    Date d1 = sdf.parse(a1.getArtWork().getDateOfCreation());
                    Date d2 = sdf.parse(a2.getArtWork().getDateOfCreation());
                    return d1.compareTo(d2);
                } catch (ParseException e) {
                    e.printStackTrace();
                    return 0;
                }
            });
        }

        if(orderBy.equals("name")){
            result.sort(Comparator.comparing(a -> a.getArtWork().getName().toLowerCase()));
        }

        if(orderBy.equals("author")){
            result.sort(Comparator.comparing(a -> a.getAuthorName().toLowerCase()));
        }

        return result;
    }



    private boolean listContainsKeywords (List<String> list, List<String> search) {
        int counter = 0;

        for(String x : search){
            for (String keyword : list){
                if(keyword.contains(x)) {
                    counter++;
                    break;
                }
            }
        }
        return counter==search.size();
    }
}
