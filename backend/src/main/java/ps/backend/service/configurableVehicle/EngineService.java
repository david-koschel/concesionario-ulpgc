package ps.backend.service.configurableVehicle;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleEngine;
import ps.backend.repository.configurableVehicle.EngineRepository;

import java.util.List;

@Service
public class EngineService {

    private final EngineRepository engineRepository;

    public EngineService(EngineRepository engineRepository) {
        this.engineRepository = engineRepository;
    }

    public List<ConfigurableVehicleEngine> findAll() {
        return engineRepository.findAll();
    }

    public ConfigurableVehicleEngine findById(Integer id) {
        return engineRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public ConfigurableVehicleEngine save(ConfigurableVehicleEngine engine) {
        return engineRepository.save(engine);
    }

    public ConfigurableVehicleEngine update(ConfigurableVehicleEngine engine) {
        ConfigurableVehicleEngine engineDB = this.findById(engine.getId());
        engineDB.setName(engine.getName());
        engineDB.setDescription(engine.getDescription());
        engineDB.setPrice(engine.getPrice());
        return engineRepository.save(engineDB);
    }
}
