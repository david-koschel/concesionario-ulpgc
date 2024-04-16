package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ps.backend.dto.TestDriveRequestDto;
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

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<TestDriveRequestDto> findAll(){
        return testDriveRequestService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/form")
    public void add(@RequestBody TestDriveRequest testDriveRequest){
        testDriveRequestService.save(testDriveRequest);
    }
}
