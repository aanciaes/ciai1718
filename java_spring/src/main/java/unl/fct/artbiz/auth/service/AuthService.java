package unl.fct.artbiz.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.auth.model.UserPrincipal;
import unl.fct.artbiz.bids.model.Bid;
import unl.fct.artbiz.bids.model.BidRepository;
import unl.fct.artbiz.sales.model.Sale;
import unl.fct.artbiz.sales.model.SalesRepository;
import unl.fct.artbiz.sales.services.SaleService;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;

import java.util.List;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    BidRepository bidRepository;

    @Autowired
    SalesRepository salesRepository;

    @Override
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(user);
    }


    public boolean restrictedToMatchingUser(Long userId) {
        if (userId != null) {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserPrincipal authUser = null;

            if (user instanceof UserPrincipal) {
                authUser = (UserPrincipal) user;
                return authUser.getUserId() == userId;
            } else
                return false;
        } else
            return false;
    }

    public boolean restrictedToMatchingUserGivenPieceId(Long pieceId) {
        if (pieceId != null) {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserPrincipal authUser = null;

            if (user instanceof UserPrincipal) {
                authUser = (UserPrincipal) user;
                ArtWork a = artworkRepository.findOne(pieceId);
                if (a.getAuthor() == authUser.getUserId()) {
                    return true;
                }
                return false;
            } else
                return false;
        } else
            return false;
    }

    public boolean isBidOwner(Long bidId) {
        if (bidId != null) {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserPrincipal authUser = null;

            if (user instanceof UserPrincipal) {
                authUser = (UserPrincipal) user;
                Bid bid = bidRepository.findOne(bidId);
                if (bid.getBidderId() == authUser.getUserId()) {
                    return true;
                }
                return false;
            } else
                return false;
        } else
            return false;
    }

    public boolean isPieceOnBidOwner(Long bidId) {
        if (bidId != null) {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserPrincipal authUser = null;

            if (user instanceof UserPrincipal) {
                authUser = (UserPrincipal) user;
                Bid bid = bidRepository.findOne(bidId);
                long ownerId = bid.getArtWorkObject().getAuthor();

                if (ownerId == authUser.getUserId()) {
                    return true;
                } else {
                    return false;
                }
            } else
                return false;
        } else
            return false;
    }

    public boolean isBuyer (Long saleId) {
        if (saleId != null) {
            Object user = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            UserPrincipal authUser = null;

            if (user instanceof UserPrincipal) {
                authUser = (UserPrincipal) user;
                Sale sale = salesRepository.findOne(saleId);
                long buyerId = sale.getBid().getBidderId();

                if (buyerId == authUser.getUserId()) {
                    return true;
                } else {
                    return false;
                }
            } else
                return false;
        } else
            return false;
    }
}
