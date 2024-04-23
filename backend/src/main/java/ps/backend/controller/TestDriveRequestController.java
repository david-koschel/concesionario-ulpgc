package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.expression.Dates;
import ps.backend.dto.TestDriveRequestDto;
import ps.backend.entity.TestDriveCar;
import ps.backend.entity.TestDriveRequest;
import ps.backend.service.TestDriveRequestService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/test-drive-request")
public class TestDriveRequestController {

    private final TestDriveRequestService testDriveRequestService;

    public TestDriveRequestController(TestDriveRequestService testDriveRequestService) {
        this.testDriveRequestService = testDriveRequestService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<TestDriveRequestDto> findAll(){
        return testDriveRequestService.findAll();
    }

    @PutMapping("/form")
    public void add(@RequestBody TestDriveRequest testDriveRequest){
        testDriveRequestService.save(testDriveRequest);
    }

    @PutMapping("/occupied-dates")
    public List<Date> findOccupiedDates(@RequestBody TestDriveCar testDriveCar){
        return testDriveRequestService.getOccupiedDatesByTestDriveCar(testDriveCar);
    }
}
