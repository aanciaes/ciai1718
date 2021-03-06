package unl.fct.artbiz.artwork.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.exceptions.ArtWorkNotFound;
import unl.fct.artbiz.artwork.exceptions.DuplicateIdArtwork;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;

import java.util.List;

@Service
public class ArtworkService {

    @Autowired
    ArtworkRepository artworkRepository;


    public ArtworkService() {
    }

    public List<ArtWork> getAllPieces() {
        return artworkRepository.findAll();
    }

    public List<ArtWork> getPiecesOnSalePieces() {
        return artworkRepository.getArtWorksByOnSale(true);
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

        return artworkRepository.save(artWork);
    }

    public ArtWork updatePiece(ArtWork artWork) {
        if (!artworkRepository.exists(artWork.getId())) {
            throw new ArtWorkNotFound();
        }
        return artworkRepository.save(artWork);
    }

    public List<ArtWork> getPiecesByArtist(long id) {
        return artworkRepository.getArtWorksByAuthor(id);
    }


    public void deletePiece(long pieceId) {
        if (!artworkRepository.exists(pieceId))
            throw new ArtWorkNotFound();
        artworkRepository.delete(pieceId);
    }
}