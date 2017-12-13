package artworks;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import unl.fct.artbiz.Application;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.auth.config.SecurityConfig;
import unl.fct.artbiz.auth.model.UserPrincipal;
import unl.fct.artbiz.users.model.Role;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;

import java.security.Security;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {Application.class}, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@ActiveProfiles(value = "tests")
@WithUserDetails(value="miguel@mail.com", userDetailsServiceBeanName="authService")
public class ArtworkJUnit {

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    UserRepository userRepository;

    @Before
    public void setUp() {
        /*for(int i = 0; i<2; i++) {
            userRepository.save(new User("User" + i, "user" + i + "@mail.com", "qwerty", 0));
            System.out.println(userRepository.findOne(0l).getEmail());
        }*/
    }

    @Test
    public void getAllPieces () throws Exception {
        ResponseEntity res = restTemplate.exchange("/artwork", HttpMethod.GET, HttpEntity.EMPTY, List.class);
        assert res.getStatusCodeValue() == 200;
        assert ((List) res.getBody()).isEmpty();
    }

    @Test
    public void addArtwork () {
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);

        ResponseEntity res = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        System.out.println(res.getStatusCode().getReasonPhrase());
        assert res.getStatusCodeValue() == 200;

        ArtWork response = (ArtWork) res.getBody();

        assert response.getName().equals(artwork.getName());

        ResponseEntity getRes = restTemplate.exchange("/artwork", HttpMethod.GET, HttpEntity.EMPTY, List.class);

        assert getRes.getStatusCodeValue() == 200;
        assert ((List) getRes.getBody()).size() == 1;
    }

    @Test
    public void addSameArtworkFails () {
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity firstRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert firstRes.getStatusCodeValue() == 200;

        ArtWork response = (ArtWork) firstRes.getBody();

        artwork.setId(response.getId());
        assert response.getName().equals(artwork.getName());

        ResponseEntity secondRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert secondRes.getStatusCodeValue() == 409;

        ResponseEntity getRes = restTemplate.exchange("/artwork", HttpMethod.GET, HttpEntity.EMPTY, List.class);

        assert getRes.getStatusCodeValue() == 200;
        assert ((List) getRes.getBody()).size() == 1;
    }

    @Test
    public void updateArtwork () {
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity firstRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert firstRes.getStatusCodeValue() == 200;

        ArtWork response = (ArtWork) firstRes.getBody();

        artwork.setId(response.getId());
        assert response.getName().equals(artwork.getName());

        artwork.setName("AlteredName");

        entity = new HttpEntity(artwork);
        ResponseEntity secondRes = restTemplate.exchange("/artwork", HttpMethod.PUT, entity, ArtWork.class);
        assert secondRes.getStatusCodeValue() == 200;

        ResponseEntity getPiece = restTemplate.exchange("/artwork/" + artwork.getId(), HttpMethod.GET, HttpEntity.EMPTY, ArtWork.class);
        assert getPiece.getStatusCodeValue() == 200;

        ArtWork updatedArtwork = (ArtWork) getPiece.getBody();

        assert updatedArtwork.getId() == artwork.getId();
        assert updatedArtwork.getName().equals("AlteredName");
    }

    @Test
    public void listByArtist () throws JSONException {
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);
        ArtWork artwork2 = new ArtWork("FakeArtwork2", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 2l, false, 0);
        ArtWork artwork3 = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity firstRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert firstRes.getStatusCodeValue() == 200;
        entity = new HttpEntity(artwork2);
        ResponseEntity secondRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert secondRes.getStatusCodeValue() == 200;
        entity = new HttpEntity(artwork3);
        ResponseEntity thirdRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert thirdRes.getStatusCodeValue() == 200;

        ResponseEntity listPiecesRes = restTemplate.exchange("/artwork/artist/" + 1l + "/list", HttpMethod.GET, HttpEntity.EMPTY, String.class);
        assert listPiecesRes.getStatusCodeValue() == 200;

        JSONArray jsonArray = new JSONArray((String)listPiecesRes.getBody());

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            assert obj.getLong("author") == 1l;
        }
    }

    @Test
    public void searchByKeywords () throws JSONException {
        List<String> keywords1 = new ArrayList<>();
        List<String> keywords2 = new ArrayList<>();

        keywords1.add("a");
        keywords1.add("b");
        keywords1.add("c");

        keywords2.add("c");
        keywords2.add("d");
        keywords2.add("e");

        ArtWork artwork = new ArtWork("FakeArtwork1", "1995-07-27",
                new ArrayList<String>(), "description",
                keywords1,
                new ArrayList<>(), 1l, false, 0);
        ArtWork artwork2 = new ArtWork("FakeArtwork1", "1995-07-27",
                new ArrayList<String>(), "description",
                keywords2,
                new ArrayList<>(), 2l, false, 0);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity firstRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert firstRes.getStatusCodeValue() == 200;
        entity = new HttpEntity(artwork2);
        ResponseEntity secondRes = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert secondRes.getStatusCodeValue() == 200;

        String keywords = "?keywords=a+b";

        ResponseEntity keywordsSearchRes = restTemplate.exchange("/artwork/search/keywords"+keywords, HttpMethod.GET, HttpEntity.EMPTY, String.class);
        assert keywordsSearchRes.getStatusCodeValue() == 200;

        JSONArray jsonArray = new JSONArray((String)keywordsSearchRes.getBody());

        for (int i = 0; i < jsonArray.length(); i++) {
            JSONObject obj = jsonArray.getJSONObject(i);
            assert obj.getLong("id") == 1l;
        }
    }

    @Test
    public void sellPiece () {
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity res = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        System.out.println(res.getBody().toString());

        assert res.getStatusCodeValue() == 200;

        double price = 120.30;
        ResponseEntity saleRes = restTemplate.exchange("/artwork/1/sell?price=" + price, HttpMethod.PUT, entity, Double.class);
        assert saleRes.getStatusCodeValue() == 200;

        ResponseEntity pieceRes = restTemplate.exchange("/artwork/1", HttpMethod.GET, entity, ArtWork.class);
        assert pieceRes.getStatusCodeValue() == 200;

        ArtWork modifiedArtWork = (ArtWork) pieceRes.getBody();

        assert artwork.isOnSale() == false && modifiedArtWork.isOnSale()==true;
        assert modifiedArtWork.getPrice() == price;
    }

    @Test
    public void deleteArtwork() {
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);
        artwork.setId(artworkRepository.save(artwork).getId());

        ResponseEntity getRes = restTemplate.exchange("/artwork/" + artwork.getId(), HttpMethod.GET, HttpEntity.EMPTY, ArtWork.class);
        assert getRes.getStatusCodeValue() == 200;

        ArtWork updatedArtwork = (ArtWork) getRes.getBody();
        assert updatedArtwork.getId() == artwork.getId();
        assert updatedArtwork.getName().equals(artwork.getName());

        ResponseEntity deleteRes = restTemplate.exchange("/artwork/" + artwork.getId(), HttpMethod.DELETE, HttpEntity.EMPTY, ArtWork.class);
        assert deleteRes.getStatusCodeValue() == 200;

        ResponseEntity getDelRes = restTemplate.exchange("/artwork/" + artwork.getId(), HttpMethod.GET, HttpEntity.EMPTY, ArtWork.class);
        assert getDelRes.getStatusCodeValue() == 404;

        ResponseEntity listRes = restTemplate.exchange("/artwork", HttpMethod.GET, HttpEntity.EMPTY, List.class);
        assert listRes.getStatusCodeValue() == 200;
        assert ((List) listRes.getBody()).isEmpty();
    }
}