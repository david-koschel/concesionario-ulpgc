package ps.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ps.backend.entity.RentVehicle;
import ps.backend.service.RentVehicleService;

import java.util.List;

@RestController
@RequestMapping("api/rent-vehicles")
public class RentVehicleController {
    private final RentVehicleService rentVehicleService;

    public RentVehicleController(RentVehicleService rentVehicleService) {
        this.rentVehicleService = rentVehicleService;
    }

    @GetMapping("/all")
    public List<RentVehicle> getCatalogue() {
        return rentVehicleService.getCatalogue();
    }

    /*@PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<RentVehicle> addCatalogue(@RequestBody RentVehicle newVehicle) {
        RentVehicle savedCatalogue = rentVehicleService.addVehicle(newVehicle);
        return ResponseEntity.ok(savedCatalogue);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/edit")
    public ResponseEntity<RentVehicle> updateCatalogue(@RequestBody RentVehicle updatedVehicle) {
        RentVehicle updated = rentVehicleService.updateCatalogue(updatedVehicle);
        return ResponseEntity.ok(updated);
    }*/
}
