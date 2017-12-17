package unl.fct.artbiz.sales;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import unl.fct.artbiz.auth.annotations.RestrictedToMatchingUserGivenId;
import unl.fct.artbiz.sales.model.Sale;
import unl.fct.artbiz.sales.services.SaleService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/sales")
public class SalesController {

    @Autowired
    SaleService saleService;

    @RestrictedToMatchingUserGivenId
    @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
    public List<Sale> getUserSales (@PathVariable long userId) {
        return saleService.getUserSales(userId);
    }

    @RequestMapping(value = "/{saleId}/makePublic", method = RequestMethod.PUT)
    public Sale makePublic (@PathVariable long saleId) {
        return saleService.changePrivacy(saleId, true);
    }

    @RequestMapping(value = "/{saleId}/makePrivate", method = RequestMethod.PUT)
    public Sale makePrivate (@PathVariable long saleId) {
        return saleService.changePrivacy(saleId, false);
    }
}
