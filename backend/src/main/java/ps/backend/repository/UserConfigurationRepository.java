package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.userVehicle.UserConfiguration;

@Repository
public interface UserConfigurationRepository extends JpaRepository<UserConfiguration, Integer> {
}
