package unl.fct.artbiz.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.services.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/artist")
public class UserController {

    @Autowired
    UserService userService;

    //TODO: Is this method needed?
    @RequestMapping (method = RequestMethod.GET)
    public List<User> getAllUsers () {
        return  userService.getAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public User createUser (User user) {
        return userService.createUser(user);
    }

    @RequestMapping (value = "/{userId}", method = RequestMethod.GET)
    public User getUser (@PathVariable long userId){
        return userService.getUser (userId);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public User updateArtwork(@RequestBody User user) {
        return userService.updateUser(user);
    }
}
