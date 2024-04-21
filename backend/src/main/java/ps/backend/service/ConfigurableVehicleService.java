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

    public ConfigurableVehicle updateCatalogue(ConfigurableVehicle updatedCatalogue) {

        ConfigurableVehicle existingCatalogue = this.findById(updatedCatalogue.getId());

        existingCatalogue.setBrand(updatedCatalogue.getBrand());
        existingCatalogue.setModel(updatedCatalogue.getModel());
        existingCatalogue.setDescription(updatedCatalogue.getDescription());
        existingCatalogue.setImage(updatedCatalogue.getImage());

        return configurableVehicleRepository.save(existingCatalogue);
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
