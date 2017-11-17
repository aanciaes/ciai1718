package artworks;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import unl.fct.artbiz.Application;
import unl.fct.artbiz.artwork.model.ArtWork;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ArtworkJUnit {

    @Autowired
    TestRestTemplate restTemplate;

    @Test
    public void getAllPieces () throws Exception {
        ResponseEntity res = restTemplate.exchange("/artwork", HttpMethod.GET, HttpEntity.EMPTY, List.class);
        assert res.getStatusCodeValue() == 200;
        assert ((List) res.getBody()).isEmpty();
    }

    @Test
    public void addArtwork () {
        ArtWork artwork = new ArtWork("FakeArtwork", new Date(System.currentTimeMillis()),
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity res = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);

        assert res.getStatusCodeValue() == 200;

        ArtWork response = (ArtWork) res.getBody();

        assert response.getId() == artwork.getId();
        assert response.getName().equals(artwork.getName());

        ResponseEntity getRes = restTemplate.exchange("/artwork", HttpMethod.GET, HttpEntity.EMPTY, List.class);

        assert getRes.getStatusCodeValue() == 200;
        assert ((List) getRes.getBody()).size() == 1;
    }

    @Test
    //TODO
    public void addSameArtwork () {
        ArtWork artwork = new ArtWork("FakeArtwork", new Date(System.currentTimeMillis()),
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity res = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);
        assert res.getStatusCodeValue() == 200;

        ArtWork response = (ArtWork) res.getBody();

        assert response.getId() == artwork.getId();
        assert response.getName().equals(artwork.getName());

        ResponseEntity getRes = restTemplate.exchange("/artwork", HttpMethod.GET, HttpEntity.EMPTY, List.class);

        assert getRes.getStatusCodeValue() == 200;
        assert ((List) getRes.getBody()).size() == 1;
    }
}
