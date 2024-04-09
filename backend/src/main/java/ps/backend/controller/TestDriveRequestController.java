package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.entity.TestDriveRequest;
import ps.backend.service.TestDriveRequestService;

import java.util.List;

@RestController
@RequestMapping("api/test-drive-request")
public class TestDriveRequestController {

    private final TestDriveRequestService testDriveRequestService;

    public TestDriveRequestController(TestDriveRequestService testDriveRequestService) {
        this.testDriveRequestService = testDriveRequestService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<TestDriveRequest> findAll(){
        return testDriveRequestService.findAll();
    }
}
