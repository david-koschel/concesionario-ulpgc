package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.backend.entity.UserIndependentExtras;

public interface UserIndependentExtrasRepository extends JpaRepository<UserIndependentExtras,Integer> {
}
