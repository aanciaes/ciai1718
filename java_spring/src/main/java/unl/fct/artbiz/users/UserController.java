package unl.fct.artbiz.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.auth.annotations.RestrictedToMatchingUser;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.services.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    UserService userService;

    //TODO: Is this method needed?
    @RequestMapping (method = RequestMethod.GET)
    public List<User> getAllUsers () {
        return  userService.getAll();
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public User createUser (@RequestBody User user) {
        return userService.createUser(user);
    }

    @RequestMapping (value = "/{userId}", method = RequestMethod.GET)
    public User getUser (@PathVariable long userId){
        return userService.getUser (userId);
    }

    @RestrictedToMatchingUser
    @RequestMapping(method = RequestMethod.PUT)
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user);
    }
}
