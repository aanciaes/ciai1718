package unl.fct.artbiz.artwork.common;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.artwork.serializer.ListArtworkSerializer;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class OrderLists {

    public static List<ListArtworkSerializer> order (String orderBy, List<ListArtworkSerializer> result, boolean reverse) {

        if(result.equals("noorder"))
            return result;

        if (orderBy.equals("date")) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            result.sort((a1, a2) -> {
                try {
                    Date d1 = sdf.parse(a1.getArtWork().getDateOfCreation());
                    Date d2 = sdf.parse(a2.getArtWork().getDateOfCreation());
                    return d1.compareTo(d2);
                } catch (ParseException e) {
                    e.printStackTrace();
                    return 0;
                }
            });
        }

        if(orderBy.equals("name")){
            result.sort(Comparator.comparing(a -> a.getArtWork().getName().toLowerCase()));
        }

        if(orderBy.equals("author")){
            result.sort(Comparator.comparing(a -> a.getAuthorName().toLowerCase()));
        }

        if(reverse)
            Collections.reverse(result);

        return result;
    }
}
