package unl.fct.artbiz.users.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.users.exceptions.DuplicatedUser;
import unl.fct.artbiz.users.exceptions.UserNotFoundException;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;

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
}
