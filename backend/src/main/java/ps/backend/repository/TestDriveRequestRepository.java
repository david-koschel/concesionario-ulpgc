package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.TestDriveCar;
import ps.backend.entity.TestDriveRequest;

import java.util.List;

@Repository
public interface TestDriveRequestRepository extends JpaRepository<TestDriveRequest, Integer> {
    List<TestDriveRequest> findAllByTestDriveCar(TestDriveCar testDriveCar);
}
