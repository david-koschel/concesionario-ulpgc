package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ps.backend.entity.TestDriveCar;
import ps.backend.service.TestDriveCarService;

import java.util.List;

@RestController
@RequestMapping("api/test-drive-car")
public class TestDriveCarController {

    private final TestDriveCarService testDriveCarService;

    public TestDriveCarController(TestDriveCarService testDriveCarService) {
        this.testDriveCarService = testDriveCarService;
    }

    @GetMapping("/all")
    public List<TestDriveCar> getTestDriveCars() {
        return testDriveCarService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/add")
    public void createTestDriveCar(@RequestBody TestDriveCar testDriveCar) {
        testDriveCarService.save(testDriveCar);
    }
}
