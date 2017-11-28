package unl.fct.artbiz;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.event.ApplicationStartingEvent;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.event.ApplicationContextEvent;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.ContextStartedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import unl.fct.artbiz.artwork.model.ArtWork;
import unl.fct.artbiz.artwork.model.ArtworkRepository;
import unl.fct.artbiz.users.model.User;
import unl.fct.artbiz.users.model.UserRepository;
import unl.fct.artbiz.users.services.UserService;

import java.util.ArrayList;

@Component
public class ApplicationBootstrap{

    @Autowired
    Environment env;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ArtworkRepository artworkRepository;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationEvent() {
        String activeProfile = "";
        for (String profile : env.getActiveProfiles())
            activeProfile += profile + " ";

        long numberOfUsers = bootstrapUsers();
        long numberOfArtworks = bootstrapArtworks();

        System.out.println("Active Profiles: " + activeProfile);
        System.out.println("----- Bootstraping data -----");
        System.out.println("- Number of user deployed: " + numberOfUsers);
        System.out.println("- Number of artworks deployed: " + numberOfArtworks);
        System.out.println("---------------------------");
    }

    private long bootstrapUsers () {
        userService.createUser(new User("Miguel", "miguel@mail.com", "g37fcbw8", 1));
        userService.createUser(new User("Joao", "joao@mail.com", "qwerty", 1));
        userService.createUser(new User("Tiago", "tiago@mail.com", "passwrd", 0));

        return userRepository.count();
    }

    private long bootstrapArtworks () {
        artworkRepository.save(new ArtWork("FakeArtwork", "1995-07-27",
                new ArrayList<String>(), "description",
                new ArrayList<>(),
                new ArrayList<>(), 1l, true, 120));
        artworkRepository.save(new ArtWork("FakeArtwork2", "1995-07-27",
                new ArrayList<String>(), "description2",
                new ArrayList<>(),
                new ArrayList<>(), 2l, true, 100));
        artworkRepository.save(new ArtWork("FakeArtwork3", "1995-07-27",
                new ArrayList<String>(), "description3",
                new ArrayList<>(),
                new ArrayList<>(), 1l, false, 0));

        return artworkRepository.count();
    }
}
