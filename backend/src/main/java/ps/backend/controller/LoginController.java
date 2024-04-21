package ps.backend.controller;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.entity.User;
import ps.backend.security.LoginDto;
import ps.backend.service.EmailService;
import ps.backend.service.UserService;

@RestController
public class LoginController {

    private final UserService userService;
    public LoginController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping("api/login")
    public void fakeLogin(@RequestBody LoginDto loginDto) {
        throw new IllegalStateException("This method shouldn't be called. It's implemented by Spring Security filters.");
    }

    }


}
