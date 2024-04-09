package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.CarModel;

@Repository
public interface CarModelRepository extends JpaRepository<CarModel, Integer> {
}
