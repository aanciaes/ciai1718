package unl.fct.artbiz.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.auth.model.UserPrincipal;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;

@Service
public class AuthService implements UserDetailsService{

    @Autowired
    UserRepository userRepository;

    @Override
    public UserPrincipal loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("load bu username: " + username);
        User user = userRepository.getUserByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return new UserPrincipal(user);
    }

    public boolean restrictedToMatchingUser (long id){
        Object user = SecurityContextHolder .getContext().getAuthentication().getPrincipal();
        UserPrincipal authUser = null;

        if(user instanceof UserPrincipal) {
            authUser = (UserPrincipal) user;
            return authUser.getUserId() == id;
        }else
            return false;
    }
}
