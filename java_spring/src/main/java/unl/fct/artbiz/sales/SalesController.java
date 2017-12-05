package unl.fct.artbiz.sales;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import unl.fct.artbiz.sales.model.Sale;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/sales")
public class SalesController {

    @RequestMapping(value = "/sales/user/{userId}")
    public List<Sale> getUserSales () {
        return new ArrayList<>();
    }


}
