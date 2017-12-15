package unl.fct.artbiz.sales.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import unl.fct.artbiz.sales.model.Sale;
import unl.fct.artbiz.sales.model.SalesRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleService {

    @Autowired
    SalesRepository salesRepository;

    public List<Sale> getUserSales(long userId) {
        return salesRepository.findAll().stream().filter(sale -> {
            if (sale.getBid().getArtWorkObject().getAuthor() == userId ||
                    sale.getBid().getBidderId() == userId) {
                return true;
            } else {
                return false;
            }
        }).collect(Collectors.toList());
    }
}
