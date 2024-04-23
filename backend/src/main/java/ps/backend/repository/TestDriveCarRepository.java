package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.TestDriveCar;

@Repository
public interface TestDriveCarRepository extends JpaRepository<TestDriveCar, Integer> {
}
