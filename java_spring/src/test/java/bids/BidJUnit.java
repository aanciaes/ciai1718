package bids;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import unl.fct.artbiz.Application;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.artwork.services.ArtworkService;
import unl.fct.artbiz.bids.model.Bid;
import unl.fct.artbiz.bids.model.BidRepository;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class BidJUnit {

    @Autowired
    TestRestTemplate restTemplate;

    @Autowired
    ArtworkRepository artworkRepository;

    @Autowired
    BidRepository bidRepository;

    @Before
    public void setUp() {
        createFakeArtwork();
    }

    @Test
    public void makeABid () {
        Bid bid = new Bid(1l, 1l, 1l, 130);

        HttpEntity entity = new HttpEntity(bid);

        ResponseEntity res = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        System.out.println(res.getBody());
        System.out.println(res.getStatusCodeValue());
        assert res.getStatusCodeValue() == 200;

        ResponseEntity getResponse = restTemplate.exchange("/bid/" + bid.getBidId(), HttpMethod.GET, HttpEntity.EMPTY, Bid.class);
        assert getResponse.getStatusCodeValue() == 200;

        Bid responseBid = (Bid) getResponse.getBody();

        assert responseBid.getBidId() == bid.getBidId();
        assert responseBid.getPieceId() == bid.getPieceId();
    }

    @Test
    public void makeABidTwice () {

        Bid bid = new Bid(1l, 1l, 1l, 130);

        HttpEntity entity = new HttpEntity(bid);

        ResponseEntity res = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert res.getStatusCodeValue() == 200;

        bid.setBidAmount(210); //Bid must be bigger than last bid else it will fail

        ResponseEntity thirdRes = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert thirdRes.getStatusCodeValue() == 200;
    }

    @Test
    public void bidDifferentPieces() {

        Bid bid = new Bid(1l, 1l, 1l, 130);

        HttpEntity entity = new HttpEntity(bid);

        ResponseEntity res = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert res.getStatusCodeValue() == 200;

        Bid bid2 = new Bid(2l, 2l, 1l, 130);

        entity = new HttpEntity(bid2);

        ResponseEntity secondRes = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert secondRes.getStatusCodeValue() == 200;
    }

    @Test
    public void bidOnNotOnSalePiece () {

        Bid bid = new Bid(1l, 3l, 1l, 130);

        HttpEntity entity = new HttpEntity(bid);

        ResponseEntity res = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert res.getStatusCodeValue() == 409;
    }

    @Test
    public void bidErrors () {

        //Bid less than asking value
        Bid bid = new Bid(1l, 1l, 1l, 1);

        HttpEntity entity = new HttpEntity(bid);

        ResponseEntity res = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert res.getStatusCodeValue() == 412;

        bid.setBidAmount(200);
        ResponseEntity succRes = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert succRes.getStatusCodeValue() == 200;

        bid.setBidAmount(190); //Make a bid worst than the on made before
        ResponseEntity failRes = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert failRes.getStatusCodeValue() == 412;
    }

    @Test
    public void twoUsersMakeEqualBid () {

        Bid bid = new Bid(1l, 1l, 1l, 200);
        Bid bid2 = new Bid(2l, 1l, 2l, 200);

        HttpEntity entity = new HttpEntity(bid);
        ResponseEntity res = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert res.getStatusCodeValue() == 200;

        entity = new HttpEntity(bid2);
        ResponseEntity secondRes = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert secondRes.getStatusCodeValue() == 200;
    }

    @Test
    public void listBids () {
        twoUsersMakeEqualBid();

        ResponseEntity res = restTemplate.exchange("/bid/user/" + 1l, HttpMethod.GET, HttpEntity.EMPTY, List.class);
        assert res.getStatusCodeValue() == 200;
        assert ((List) res.getBody()).size() == 1;

        ResponseEntity secondRes = restTemplate.exchange("/bid/user/" + 2l, HttpMethod.GET, HttpEntity.EMPTY, List.class);
        assert secondRes.getStatusCodeValue() == 200;
        assert ((List) secondRes.getBody()).size() == 1;

        ResponseEntity thirdRes = restTemplate.exchange("/bid/piece/" + 1l, HttpMethod.GET, HttpEntity.EMPTY, List.class);
        assert thirdRes.getStatusCodeValue() == 200;
        assert ((List) thirdRes.getBody()).size() == 2;
    }

    @Test
    public void deleteBid () {
        Bid bid = new Bid(1l, 1l, 2l, 200);

        HttpEntity entity = new HttpEntity(bid);
        ResponseEntity res = restTemplate.exchange("/bid", HttpMethod.POST, entity, Bid.class);
        assert res.getStatusCodeValue() == 200;

        ResponseEntity secondRes = restTemplate.exchange("/bid/" + bid.getBidId(), HttpMethod.DELETE, HttpEntity.EMPTY, Bid.class);
        assert res.getStatusCodeValue() == 200;

        ResponseEntity getResponse = restTemplate.exchange("/bid/" + bid.getBidId(), HttpMethod.GET, HttpEntity.EMPTY, Bid.class);
        assert getResponse.getStatusCodeValue() == 404;
    }




    private void createFakeArtwork () {
        ArtWork artwork = new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, true, 120);
        ArtWork artwork2 = new ArtWork("FakeArtwork2", "1995-07-27",
                new ArrayList<String>(), "description2",
                new ArrayList<>(),
                new ArrayList<>(), 1l, true, 100);
        ArtWork artwork3 = new ArtWork("FakeArtwork3", "1995-07-27",
                new ArrayList<String>(), "description3",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0);
        artworkRepository.save(artwork);
        artworkRepository.save(artwork2);
        artworkRepository.save(artwork3);

        System.out.println(artworkRepository.findOne(1l));
    }
}
