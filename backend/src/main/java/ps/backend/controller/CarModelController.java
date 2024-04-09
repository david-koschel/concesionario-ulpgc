package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import ps.backend.entity.CarModel;
import ps.backend.service.CarModelService;

import java.util.List;

@RestController
@RequestMapping("api/car-model")
public class CarModelController {

    private CarModelService carModelService;

    public CarModelController(CarModelService carModelService) {
        this.carModelService = carModelService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<CarModel> getAll() {
        return this.carModelService.findAll();
    }


    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void addCarModel(@RequestBody CarModel carModel) {
        this.carModelService.save(carModel);
    }

    @PostMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public void updateCarModel(@RequestBody CarModel carModel) {
        this.carModelService.save(carModel);
    }

    @PostMapping("/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCarModel(@RequestBody CarModel carModel) {
        this.carModelService.delete(carModel);
    }
}
