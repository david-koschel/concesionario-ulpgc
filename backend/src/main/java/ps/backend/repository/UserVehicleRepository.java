package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.userVehicle.UserVehicle;

@Repository
public interface UserVehicleRepository extends JpaRepository<UserVehicle, Integer> {
}
