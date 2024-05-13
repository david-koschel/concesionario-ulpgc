package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.RentVehicle;

@Repository
public interface RentVehicleRepository extends JpaRepository<RentVehicle, Integer> {

}

