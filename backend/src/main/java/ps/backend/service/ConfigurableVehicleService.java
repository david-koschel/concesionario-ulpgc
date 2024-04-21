package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.repository.ConfigurableVehicleRepository;

import java.util.List;

@Service
public class ConfigurableVehicleService {

    private final ConfigurableVehicleRepository configurableVehicleRepository;

    public ConfigurableVehicleService(ConfigurableVehicleRepository configurableVehicleRepository) {
        this.configurableVehicleRepository = configurableVehicleRepository;
    }

    public List<ConfigurableVehicle> getCatalogue() { //cambiar a dto
        return configurableVehicleRepository.findAll();
    }

    public ConfigurableVehicle findById(Integer id) {
        return configurableVehicleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }


    public ConfigurableVehicle updateCatalogue(ConfigurableVehicle updatedCatalogue) {
        ConfigurableVehicle existingCatalogue = this.findById(updatedCatalogue.getId());

        existingCatalogue.setBrand(updatedCatalogue.getBrand());
        existingCatalogue.setModel(updatedCatalogue.getModel());
        existingCatalogue.setDescription(updatedCatalogue.getDescription());
        existingCatalogue.setImage(updatedCatalogue.getImage());

        return configurableVehicleRepository.save(existingCatalogue);
    }

    public ConfigurableVehicle addVehicle(ConfigurableVehicle newVehicle) {
        return configurableVehicleRepository.save(newVehicle);
    }
}
