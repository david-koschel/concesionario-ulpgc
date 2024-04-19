package ps.backend.repository.configurableVehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleExtra;

@Repository
public interface ExtraRepository extends JpaRepository<ConfigurableVehicleExtra, Integer> {
}
