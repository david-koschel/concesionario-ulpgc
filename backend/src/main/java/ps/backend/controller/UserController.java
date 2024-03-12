package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.entity.User;
import ps.backend.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    //PETICIONES DE PRUEBA

    @GetMapping("/all")
    public List<User> findAll() {
        return userService.findAll();
    }

    @GetMapping("/current")
    public User findLoggedUser() {
        return userService.findLoggedUser();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/single/{id}")
    public User findById(@PathVariable Integer id) {
        return userService.findById(id);
    }
}
