package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.entity.userVehicle.UserConfiguration;
import ps.backend.repository.ConfigurableVehicleRepository;
import ps.backend.repository.UserConfigurationRepository;

import java.util.List;

@Service
public class ConfigurableVehicleService {

    private final ConfigurableVehicleRepository configurableVehicleRepository;
    private final UserService userService;
    private final UserConfigurationRepository userConfigurationRepository;

    public ConfigurableVehicleService(ConfigurableVehicleRepository configurableVehicleRepository, UserService userService, UserConfigurationRepository userConfigurationRepository) {
        this.configurableVehicleRepository = configurableVehicleRepository;
        this.userService = userService;
        this.userConfigurationRepository = userConfigurationRepository;
    }

    public List<ConfigurableVehicle> getCatalogue() {
        return configurableVehicleRepository.findAll();
    }

    public ConfigurableVehicle findById(Integer id) {
        return configurableVehicleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public ConfigurableVehicle updateCatalogue(ConfigurableVehicle updatedVehicle) {
        ConfigurableVehicle existingVehicle = this.findById(updatedVehicle.getId());
        updatedVehicle.getColors().forEach(color -> color.setConfigurableVehicle(existingVehicle));
        return configurableVehicleRepository.save(updatedVehicle);
    }

    public ConfigurableVehicle addVehicle(ConfigurableVehicle newVehicle) {
        ConfigurableVehicle savedVehicle = this.configurableVehicleRepository.save(newVehicle);
        newVehicle.getColors().forEach(color -> color.setConfigurableVehicle(savedVehicle));
        return configurableVehicleRepository.save(savedVehicle);
    }

    public UserConfiguration saveConfiguration(UserConfiguration configuration) {
        configuration.setUser(userService.findLoggedUser());
        return userConfigurationRepository.save(configuration);
    }

    public List<UserConfiguration> getConfigurations() {
        return userService.findLoggedUser().getUserConfigurations();
    }
}
