package unl.fct.artbiz.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.auth.model.UserPrincipal;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;

import java.util.List;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArtworkRepository artworkRepository;

    @Override
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(user);
    }

    public boolean restrictedToMatchingUserGivenPiece(Long userId) {
        if(userId!=null) {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserPrincipal authUser = null;

            if (user instanceof UserPrincipal) {
                authUser = (UserPrincipal) user;
                return authUser.getUserId() == userId;
            } else
                return false;
        }else
            return false;
    }

    public boolean restrictedToMatchingUserGivenPieceId (Long pieceId){
        if(pieceId!=null) {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserPrincipal authUser = null;

            if (user instanceof UserPrincipal) {
                authUser = (UserPrincipal) user;
                List<ArtWork> artWorks = artworkRepository.getArtWorksByAuthor(authUser.getUserId());
                for(ArtWork a : artWorks){
                    if (a.getAuthor()==pieceId)
                        return true;
                }
                return false;
            } else
                return false;
        }else
            return false;
    }
}
