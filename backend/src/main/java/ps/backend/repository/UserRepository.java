package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}
