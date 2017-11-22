package unl.fct.artbiz.artwork.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.exceptions.DuplicateIdArtwork;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.storage.StorageService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArtworkService {

    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    StorageService storageService;

    public ArtworkService() {
    }

    public List<ArtWork> getAllPieces() {
        return (List) artworkRepository.findAll();
    }

    public List<ArtWork> getPiecesOnSalePieces() {
        return artworkRepository.getArtWorkByOnSale(true);
    }

    public ArtWork findById(long id) {
        if (!artworkRepository.exists(id)) {
            throw new ArtWorkNotFound();
        } else {
            ArtWork artWork = artworkRepository.findOne(id);
            List<String> newMultimedia = new ArrayList<>();

            for (String path : artWork.getMultimedia()){
                newMultimedia.add(storageService.load(path));
            }

            artWork.setMultimedia(newMultimedia);

            return artWork;
        }
    }

    public ArtWork createPiece(ArtWork artWork) {

        if (artworkRepository.exists(artWork.getId()))
            throw new DuplicateIdArtwork();

        List<String> multimedia = artWork.getMultimedia();
        List<String> newMulimedia = new ArrayList<>();

        for (String m : multimedia){
            newMulimedia.add(storageService.store(m));
        }

        artWork.setMultimedia(newMulimedia);
        artworkRepository.save(artWork);
        return artWork;
    }

    public ArtWork updatePiece(ArtWork artWork) {
        if (!artworkRepository.exists(artWork.getId())) {
            throw new ArtWorkNotFound();
        }
        return artworkRepository.save(artWork);
    }

    public List<ArtWork> getPiecesByArtist(long id) {
        return artworkRepository.getArtWorkByAuthor(id);
    }


    public List<ArtWork> getPiecesByKeywords(List<String> keywords) {

        return (artworkRepository.getArtWorkByKeywordsIsIn(keywords)).stream().filter(artWork -> artWork.getKeywords().
                containsAll(keywords)).distinct()
                .collect(Collectors.toList());
    }
}
