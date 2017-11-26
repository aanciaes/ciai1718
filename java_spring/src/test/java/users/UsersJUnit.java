package users;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;
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
    TestRestTemplate restTemplate;

    @Test
    public void createUser() {
        User user = new User("FakeName", "user@mail.com", "password", 0);

        HttpEntity entity = new HttpEntity(user);

        ResponseEntity res = restTemplate.exchange("/artist", HttpMethod.POST, entity, User.class);
        assert res.getStatusCodeValue() == 200;

        user.setId(((User) res.getBody()).getId());

        ResponseEntity getResponse = restTemplate.exchange("/artist/" + user.getId(), HttpMethod.GET, HttpEntity.EMPTY, User.class);
        assert getResponse.getStatusCodeValue() == 200;

        User responseUser = (User) getResponse.getBody();

        assert responseUser.getId() == user.getId();
    }

    @Test
    public void updateUser () {
        User user = new User("FakeName", "user@mail.com", "password", 0);

        HttpEntity entity = new HttpEntity(user);

        ResponseEntity res = restTemplate.exchange("/artist", HttpMethod.POST, entity, User.class);
        assert res.getStatusCodeValue() == 200;


        user.setId(((User) res.getBody()).getId());
        user.setName("UpdatedName");
        user.setEmail("updatedEmail@mail.com");

        entity = new HttpEntity(user);
        ResponseEntity getResponse = restTemplate.exchange("/artist", HttpMethod.PUT, entity, User.class);
        assert getResponse.getStatusCodeValue() == 200;

        User responseUser = (User) getResponse.getBody();

        assert responseUser.getId() == user.getId();
        assert responseUser.getName().equals(user.getName());
        assert responseUser.getEmail().equals(user.getEmail());
    }
}
