package ps.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.service.ConfigurableVehicleService;

import java.util.List;

@RestController
@RequestMapping("api/catalogue")
public class CatalogueController {
    private final ConfigurableVehicleService configurableVehicleService;

    public CatalogueController(ConfigurableVehicleService configurableVehicleService) {
        this.configurableVehicleService = configurableVehicleService;
    }

    @GetMapping("/all")
    public List<ConfigurableVehicle> getCatalogue(){ return configurableVehicleService.getCatalogue();}

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<ConfigurableVehicle> addCatalogue(@RequestBody ConfigurableVehicle newVehicle) {
        ConfigurableVehicle savedCatalogue = configurableVehicleService.addVehicle(newVehicle);
        return ResponseEntity.ok(savedCatalogue);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/edit")
    public ResponseEntity<ConfigurableVehicle> updateCatalogue(@RequestBody ConfigurableVehicle updatedVehicle) {
        ConfigurableVehicle updated = configurableVehicleService.updateCatalogue(updatedVehicle);
        return ResponseEntity.ok(updated);
    }
}
