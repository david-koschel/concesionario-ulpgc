package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.backend.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
}
