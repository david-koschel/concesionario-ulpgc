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

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<User> findAll() {
        return userService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/single/{id}")
    public User findById(@PathVariable Integer id) {
        return userService.findById(id);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/new")
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update")
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @PutMapping("/current")
    public User updatedLoggedUser(@RequestBody User user) {
        return userService.updatedLoggedUser(user);
    }

}
