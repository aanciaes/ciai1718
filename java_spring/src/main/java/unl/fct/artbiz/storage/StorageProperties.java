package unl.fct.artbiz.storage;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;


@Configuration
public class StorageProperties {

    /**
     * Folder location for storing files
     */
    private String location = "src/main/resources/imgs";

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

}
