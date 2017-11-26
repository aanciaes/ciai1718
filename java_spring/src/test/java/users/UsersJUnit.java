package users;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import unl.fct.artbiz.Application;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;

import java.util.ArrayList;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UsersJUnit {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArtworkRepository artworkRepository;

    @Test
    public void user () {
        userRepository.save(new User());
        User user = userRepository.findOne(1l);
        System.out.println(user.getId());

        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);
        artworkRepository.save(artwork);
    }
}
