package ps.backend.service.configurableVehicle;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleRim;
import ps.backend.repository.configurableVehicle.RimRepository;

import java.util.List;

@Service
public class RimService {

    private final RimRepository rimRepository;

    public RimService(RimRepository rimRepository) {
        this.rimRepository = rimRepository;
    }

    public List<ConfigurableVehicleRim> findAll() {
        return rimRepository.findAll();
    }

    public ConfigurableVehicleRim findById(int id) {
        return rimRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public ConfigurableVehicleRim save(ConfigurableVehicleRim rim) {
        return rimRepository.save(rim);
    }

    public ConfigurableVehicleRim update(ConfigurableVehicleRim rim) {
        ConfigurableVehicleRim rimDB = findById(rim.getId());
        rimDB.setName(rim.getName());
        rimDB.setDescription(rim.getDescription());
        rimDB.setImage(rim.getImage());
        rimDB.setPrice(rim.getPrice());
        return rimRepository.save(rimDB);
    }
}
