package artworks;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
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


    // RUN TESTS ONE BY ONE



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
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);

        HttpEntity<ArtWork> entity = new HttpEntity(artwork);
        ResponseEntity res = restTemplate.exchange("/artwork", HttpMethod.POST, entity, ArtWork.class);

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
        System.err.println(artwork.getName());

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

        ResponseEntity listPiecesRes = restTemplate.exchange("/artwork/search/artist/" + 1l, HttpMethod.GET, HttpEntity.EMPTY, String.class);
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
        System.err.println (keywordsSearchRes.getStatusCodeValue());
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
}
