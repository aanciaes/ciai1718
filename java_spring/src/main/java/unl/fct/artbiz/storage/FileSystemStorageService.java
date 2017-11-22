package unl.fct.artbiz.storage;

import java.awt.image.BufferedImage;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import unl.fct.artbiz.storage.exceptions.StorageException;
import unl.fct.artbiz.storage.exceptions.StorageFileNotFoundException;

import javax.imageio.ImageIO;

@Service
public class FileSystemStorageService implements StorageService {

    private final Path rootLocation;

    @Autowired
    public FileSystemStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }


    @Override
    public String store(String encodedImage) {
        try {
            // create a buffered image
            BufferedImage image = null;
            byte[] imageByte;

            imageByte = Base64.getDecoder().decode(encodedImage);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();

            //Generate unique name
            String generatedName = (System.currentTimeMillis()+encodedImage).toString();
            if(generatedName.length() > 10)
                generatedName = generatedName.substring(0,9);

            // write the image to a file
            File outputfile = new File(rootLocation + "/" + generatedName);
            ImageIO.write(image, "png", outputfile);

            return outputfile.getPath();

        } catch (Exception e) {
            //e.printStackTrace();
            return null;
        }
    }


    @Override
    public String load(String filename) {
        String encodedfile = null;
        try {
            File file = new File(filename);
            FileInputStream fileInputStreamReader = new FileInputStream(file);
            byte[] bytes = new byte[(int)file.length()];
            fileInputStreamReader.read(bytes);
            encodedfile = Base64.getEncoder().encodeToString(bytes);
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return encodedfile;
    }


    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}