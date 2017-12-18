package unl.fct.artbiz.users.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.users.exceptions.DuplicatedUser;
import unl.fct.artbiz.users.exceptions.EmailAlreadyExistsException;
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

        if(userRepository.existsByEmail(user.getEmail()))
            throw new EmailAlreadyExistsException();

        user.setup();
        user.setPassword(hash(user.getPassword()));
        return userRepository.save(user);
    }

    public User getUser(long userId) {
        if (!userRepository.exists(userId))
            throw new UserNotFoundException();
        return userRepository.findOne(userId);
    }

    public User updateUser(User user) {
        User currentUser = userRepository.findOne(user.getId());

        if (currentUser==null) {
            throw new UserNotFoundException();
        }

        //Check if user is trying to change is email
        //If so, he cannot change to an email that already exists
        if(!user.getEmail().equals(currentUser.getEmail())) {
            if (userRepository.existsByEmail(user.getEmail()))
                throw new EmailAlreadyExistsException();
        }else {
            user.setup();
            user.setPassword(hash(user.getPassword()));
        }
        return userRepository.save(user);
    }

    private String hash (String base) {
        ShaPasswordEncoder encoder = new ShaPasswordEncoder();
        encoder.setEncodeHashAsBase64(true);
        return encoder.encodePassword(base, null);
    }
}
