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
        return loadResourcesList(artworkRepository.findAll());
    }

    public List<ArtWork> getPiecesOnSalePieces() {
        return loadResourcesList(artworkRepository.getArtWorkByOnSale(true));
    }

    public ArtWork findById(long id) {
        if (!artworkRepository.exists(id)) {
            throw new ArtWorkNotFound();
        } else {
            ArtWork artWork = artworkRepository.findOne(id);
            return loadResources (artWork);
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
        return loadResourcesList(artworkRepository.getArtWorkByAuthor(id));
    }


    public List<ArtWork> getPiecesByKeywords(List<String> keywords) {

        return loadResourcesList((artworkRepository.getArtWorkByKeywordsIsIn(keywords)).stream().filter(artWork -> artWork.getKeywords().
                containsAll(keywords)).distinct()
                .collect(Collectors.toList()));
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

    private List<ArtWork> loadResourcesList (List<ArtWork> lst) {
        List<ArtWork> withMultimedia = new ArrayList<>();

        for(ArtWork piece : lst){
            withMultimedia.add(loadResources(piece));
        }

        return withMultimedia;
    }

    private ArtWork loadResources (ArtWork piece) {
        List<String> newMultimedia = new ArrayList<>();

        for (String path : piece.getMultimedia()){
            newMultimedia.add(storageService.load(path));
        }

        piece.setMultimedia(newMultimedia);
        return piece;
    }
}