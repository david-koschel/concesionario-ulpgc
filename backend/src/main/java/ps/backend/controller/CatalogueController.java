package ps.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ps.backend.entity.Catalogue;
import ps.backend.service.CatalogueService;

import java.util.List;

@RestController
@RequestMapping("api/catalogue")
public class CatalogueController {
    private final CatalogueService catalogueService;

    public CatalogueController(CatalogueService catalogueService) {
        this.catalogueService = catalogueService;
    }

    @GetMapping("/all")
    public List<Catalogue> getCatalogue(){ return catalogueService.getCatalogue();}

    @PostMapping("/add")
    public ResponseEntity<Catalogue> addCatalogue(@RequestBody Catalogue newVehicle) {
        System.out.println(newVehicle.getDescription());
        Catalogue savedCatalogue = catalogueService.addVehicle(newVehicle);
        return ResponseEntity.ok(savedCatalogue);
    }
    @PostMapping("/edit")
    public ResponseEntity<Catalogue> updateCatalogue(@RequestBody Catalogue updatedVehicle) {
        Catalogue updated = catalogueService.updateCatalogue(updatedVehicle);
        return ResponseEntity.ok(updated);
    }

}
