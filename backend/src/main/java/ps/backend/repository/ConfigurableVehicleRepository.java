package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;

@Repository
public interface ConfigurableVehicleRepository extends JpaRepository<ConfigurableVehicle,Integer> {

}
