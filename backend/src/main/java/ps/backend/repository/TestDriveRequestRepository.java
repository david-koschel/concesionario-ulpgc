package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.entity.TestDriveRequest;

@Repository
public interface TestDriveRequestRepository extends JpaRepository<TestDriveRequest, Integer> {
}
