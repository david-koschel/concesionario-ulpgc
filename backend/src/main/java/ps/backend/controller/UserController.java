package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ps.backend.entity.User;
import ps.backend.service.EmailService;
import ps.backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService, EmailService emailService) {
        this.userService = userService;
    }

    @GetMapping("/current")
    public User findLoggedUser() {
        return userService.findLoggedUser();
    }

    @PostMapping("/current")
    public User updatedLoggedUser(@RequestBody User user) {
        return userService.updatedLoggedUser(user);
    }

    //PETICIONES DE PRUEBA

    @GetMapping("/all")
    public List<User> findAll() {
        return userService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/single/{id}")
    public User findById(@PathVariable Integer id) {
        return userService.findById(id);
    }
}
