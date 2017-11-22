package unl.fct.artbiz.storage;

import org.springframework.stereotype.Service;

@Service
public interface StorageService {

    void init();

    String store(String image);

    String load(String filename);

}