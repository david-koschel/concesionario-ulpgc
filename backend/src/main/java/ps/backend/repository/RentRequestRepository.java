package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.RentRequest;

@Repository
public interface RentRequestRepository extends JpaRepository<RentRequest, Integer> {
}
