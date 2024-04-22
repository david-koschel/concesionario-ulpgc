package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.entity.User;
import ps.backend.exception.BasicException;
import ps.backend.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public User findLoggedUser() {
        return userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).orElse(null);
    }

    public User save(User user) {
        if (this.userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new BasicException("El nombre de usuario ya está registrado");
        }
        if (this.userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BasicException("El correo electrónico ya está registrado");
        }
        return userRepository.save(user);
    }

    public User register(User user) {
        if (this.userRepository.findByUsername(user.getUsername()).isPresent() && this.userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BasicException("El nombre de usuario y el correo electrónico ya han sido registrados");
        } else if (this.userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new BasicException("El nombre de usuario ya ha sido registrado");
        } else if (this.userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BasicException("El correo electrónico ya ha sido registrado");
        }
        emailService.sendEmail(user.getEmail(), "Mensaje de Bienvenida", "Bienvenido");
        return userRepository.save(user);
    }

    public User update(User user) {
        User userDB = this.findById(user.getId());
        return this.updateUser(user, userDB);
    }

    public User updatedLoggedUser(User user) {
        User currentUser = findLoggedUser();
        user.setRole(currentUser.getRole());
        user.setId(currentUser.getId());
        user.setPassword(currentUser.getPassword());
        return this.updateUser(user, currentUser);
    }

    private User updateUser(User newUser, User currentUser) {
        if (!newUser.getUsername().equals(currentUser.getUsername()) && this.userRepository.findByUsername(newUser.getUsername()).isPresent()) {
            throw new BasicException("El nombre de usuario ya está registrado");
        }
        if (!newUser.getEmail().equals(currentUser.getEmail()) && this.userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            throw new BasicException("El correo electrónico ya está registrado");
        }
        return userRepository.save(newUser);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
            return createSpringSecurityUser(optionalUser.get());
        }
        throw new RuntimeException("The user " + username + " wasn't found in the database");
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(User user) {
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().toString()))
        );
    }
}
