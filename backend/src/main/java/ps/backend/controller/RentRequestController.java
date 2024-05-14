package ps.backend.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.dto.PaymentInfoDto;
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

    //noused
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<RentRequestDto> findAll(){return rentRequestService.findAll();}

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user")
    public List<RentRequestDto> findAllByUser(){return rentRequestService.findUserRents();}

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/user/{id}")
    public PaymentInfoDto continuePayment(@PathVariable Integer id){return rentRequestService.continuePayment(id);}

    @PutMapping("public/form")
    public PaymentInfoDto add(@RequestBody RentRequest rentRequest){return rentRequestService.save(rentRequest);}

    @PutMapping("public/free-cars")
    public List<RentVehicle> findFreeVehicles(@RequestBody Intervals intervals){
        return rentRequestService.getFreeRentVehicles(intervals.getFormattedStartDate(), intervals.getFormattedEndDate());
    }

    @Getter
    @Setter
    public static class Intervals{
        String startDate;
        String endDate;

        LocalDate getFormattedStartDate() {
            String[] splitDate = startDate.split("/");
            return LocalDate.of(Integer.parseInt(splitDate[0]), Integer.parseInt(splitDate[1]), Integer.parseInt(splitDate[2]));
        }

        LocalDate getFormattedEndDate() {
            String[] splitDate = endDate.split("/");
            return LocalDate.of(Integer.parseInt(splitDate[0]), Integer.parseInt(splitDate[1]), Integer.parseInt(splitDate[2]));
        }
    }
}
