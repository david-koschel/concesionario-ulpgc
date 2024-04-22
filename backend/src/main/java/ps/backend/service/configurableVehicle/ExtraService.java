package ps.backend.service.configurableVehicle;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleExtra;
import ps.backend.repository.configurableVehicle.ExtraRepository;

import java.util.List;

@Service
public class ExtraService {

    private final ExtraRepository extraRepository;

    public ExtraService(ExtraRepository extraRepository) {
        this.extraRepository = extraRepository;
    }

    public List<ConfigurableVehicleExtra> findAll() {
        return extraRepository.findAll();
    }

    public ConfigurableVehicleExtra findById(Integer id) {
        return extraRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public ConfigurableVehicleExtra save(ConfigurableVehicleExtra extra) {
        return extraRepository.save(extra);
    }

    public ConfigurableVehicleExtra update(ConfigurableVehicleExtra extra) {
        ConfigurableVehicleExtra extraDB = this.findById(extra.getId());
        extraDB.setName(extra.getName());
        extraDB.setDescription(extra.getDescription());
        extraDB.setImage(extra.getImage());
        extraDB.setPrice(extra.getPrice());
        return extraRepository.save(extraDB);
    }
}
