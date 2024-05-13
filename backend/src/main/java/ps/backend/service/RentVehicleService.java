package ps.backend.service;

import org.springframework.stereotype.Service;
import ps.backend.entity.RentVehicle;
import ps.backend.repository.RentVehicleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RentVehicleService {

    private final RentVehicleRepository rentVehicleRepository;

    public RentVehicleService(RentVehicleRepository rentVehicleRepository) {
        this.rentVehicleRepository = rentVehicleRepository;
    }

    public List<RentVehicle> getCatalogue() {
        return rentVehicleRepository.findAll();
    }

    public Optional<RentVehicle> findById(Integer id) {
        return rentVehicleRepository.findById(id);
    }

}