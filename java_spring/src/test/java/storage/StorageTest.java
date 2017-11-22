package storage;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.util.Base64;

public class StorageTest {

    public static void main(String[] args) {

        File f =  new File("src/test/resources/ferrari-logo.jpg");
        String encodstring = encodeFileToBase64Binary(f);
        System.out.println(encodstring);
        decode(encodstring);
    }

    private static String encodeFileToBase64Binary(File file){
        String encodedfile = null;
        try {
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

    private static void decode (String encodedImage) {
        try {
            // create a buffered image
            BufferedImage image = null;
            byte[] imageByte;

            imageByte = Base64.getDecoder().decode(encodedImage);
            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
            image = ImageIO.read(bis);
            bis.close();

            // write the image to a file
            File outputfile = new File("src/test/resources/imgs/copied.jpg");
            ImageIO.write(image, "jpg", outputfile);

        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
