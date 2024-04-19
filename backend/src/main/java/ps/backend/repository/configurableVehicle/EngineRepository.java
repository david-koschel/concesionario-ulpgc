package ps.backend.repository.configurableVehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleEngine;

@Repository
public interface EngineRepository extends JpaRepository<ConfigurableVehicleEngine, Integer> {
}
