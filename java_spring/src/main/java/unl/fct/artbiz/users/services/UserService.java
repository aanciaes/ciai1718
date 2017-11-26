package unl.fct.artbiz.users.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.users.exceptions.DuplicatedUser;
import unl.fct.artbiz.users.exceptions.UserNotFoundException;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public List<User> getAll () {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        if (userRepository.exists(user.getId()))
            throw new DuplicatedUser();
        user.setPassword(hash(user.getPassword()));
        return userRepository.save(user);
    }

    public User getUser(long userId) {
        if (!userRepository.exists(userId))
            throw new UserNotFoundException();
        return userRepository.findOne(userId);
    }

    public User updateUser(User user) {
        if (!userRepository.exists(user.getId())) {
            throw new UserNotFoundException();
        }
        return userRepository.save(user);
    }

    private String hash (String base) {
        //MessageDigest digest = null;
        ShaPasswordEncoder encoder = new ShaPasswordEncoder();
        encoder.setEncodeHashAsBase64(true);
        return encoder.encodePassword(base, null);
        /*try {
            digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(base.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);

        } catch (NoSuchAlgorithmException e) {
            //Should never happen
            return Integer.toString(base.hashCode());
        }*/
    }
}
