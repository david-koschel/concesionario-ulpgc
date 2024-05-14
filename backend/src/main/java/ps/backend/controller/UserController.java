package ps.backend.controller;

import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.dto.ForgotPasswordDto;
import ps.backend.entity.User;
import ps.backend.exception.BasicException;
import ps.backend.service.EmailService;
import ps.backend.service.ResetPasswordService;
import ps.backend.service.UserService;
import ps.backend.dto.RestorePasswordRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;
    private final EmailService emailService;
    private final ResetPasswordService resetPasswordService;

    public UserController(UserService userService, EmailService emailService, ResetPasswordService resetPasswordService) {
        this.userService = userService;
        this.emailService = emailService;
        this.resetPasswordService = resetPasswordService;
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

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/sendEmail")
    public void sendEmail(@RequestBody String sendEmail) {
        emailService.sendEmail(sendEmail, "Recuperación de Contraseña", "http://localhost:4200/forgot-password?email=" + sendEmail);
    }

    @GetMapping("/password/forgot")
    public void forgotPassword(@NotNull @RequestParam String username) {
        resetPasswordService.requestPasswordChange(username);
    }

    @PostMapping("/password/reset")
    public void resetPassword(@RequestBody ForgotPasswordDto forgotPasswordDto) {
        resetPasswordService.resetPassword(forgotPasswordDto);
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

    @ExceptionHandler(BasicException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public Map<String, String> exceptionHandler(BasicException e) {
        Map<String, String> result = new HashMap<>();
        result.put("message", e.getMessage());
        return result;
    }
}
