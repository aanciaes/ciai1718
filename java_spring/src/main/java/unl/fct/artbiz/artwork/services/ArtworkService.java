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
        return artworkRepository.findAll();
    }

    public List<ArtWork> getPiecesOnSalePieces() {
       return artworkRepository.getArtWorkByOnSale(true);
    }

    public ArtWork findById(long id) {
        if (!artworkRepository.exists(id)) {
            throw new ArtWorkNotFound();
        } else {
            return artworkRepository.findOne(id);
        }
    }

    public ArtWork createPiece(ArtWork artWork) {

        if (artworkRepository.exists(artWork.getId()))
            throw new DuplicateIdArtwork();

        artworkRepository.save(saveResources(artWork));
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

    private ArtWork saveResources (ArtWork piece) {
        List<String> multimedia = piece.getMultimedia();
        List<String> newMulimedia = new ArrayList<>();

        for (String m : multimedia){
            newMulimedia.add(storageService.store(m));
        }

        piece.setMultimedia(newMulimedia);
        return piece;
    }
}
