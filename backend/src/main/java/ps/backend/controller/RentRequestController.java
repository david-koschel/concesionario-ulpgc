package ps.backend.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.dto.RentRequestDto;
import ps.backend.entity.RentRequest;
import ps.backend.entity.RentVehicle;
import ps.backend.service.RentRequestService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/rent-vehicle-request")
public class RentRequestController {

    private final RentRequestService rentRequestService;

    public RentRequestController(RentRequestService rentRequestService) {
        this.rentRequestService = rentRequestService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<RentRequestDto> findAll(){return rentRequestService.findAll();}

    @PutMapping("public/form")
    public void add(@RequestBody RentRequest rentRequest){rentRequestService.save(rentRequest);}

    @PutMapping("public/free-cars")
    public List<RentVehicle> findFreeVehicles(@RequestBody Intervals intervals){
        return rentRequestService.getFreeRentVehicles(intervals.getStartDate(), intervals.getEndDate());
    }

    @Getter
    @Setter
    public static class Intervals{
        LocalDate startDate;
        LocalDate endDate;
    }
}
