package ps.backend.repository.configurableVehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleRim;

@Repository
public interface RimRepository extends JpaRepository<ConfigurableVehicleRim, Integer> {
}
