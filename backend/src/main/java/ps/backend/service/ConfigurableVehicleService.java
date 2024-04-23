package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.entity.User;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.entity.userVehicle.UserConfiguration;
import ps.backend.entity.userVehicle.UserVehicle;
import ps.backend.exception.BasicException;
import ps.backend.repository.ConfigurableVehicleRepository;
import ps.backend.repository.UserConfigurationRepository;
import ps.backend.repository.UserVehicleRepository;

import java.util.List;

@Service
public class ConfigurableVehicleService {

    private final ConfigurableVehicleRepository configurableVehicleRepository;
    private final UserService userService;
    private final UserConfigurationRepository userConfigurationRepository;
    private final UserVehicleRepository userVehicleRepository;
    private final InvoiceMessageService invoiceMessageService;

    public ConfigurableVehicleService(ConfigurableVehicleRepository configurableVehicleRepository, UserService userService, UserConfigurationRepository userConfigurationRepository, UserVehicleRepository userVehicleRepository, InvoiceMessageService invoiceMessageService) {
        this.configurableVehicleRepository = configurableVehicleRepository;
        this.userService = userService;
        this.userConfigurationRepository = userConfigurationRepository;
        this.userVehicleRepository = userVehicleRepository;
        this.invoiceMessageService = invoiceMessageService;
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

    public void saveVehicle(Integer id) {
        User currentUser = userService.findLoggedUser();
        UserConfiguration userConfiguration = currentUser.getUserConfigurations().stream()
                .filter(config -> config.getId().equals(id))
                .findFirst().orElseThrow(BasicException::new);

        Float totalPrice = userConfiguration.getSelectedVehicle().getBasePrice() +
                userConfiguration.getSelectedColor().getPrice() +
                userConfiguration.getSelectedRim().getPrice() +
                userConfiguration.getSelectedEngine().getPrice() +
                userConfiguration.getSelectedExtras().stream().reduce(0f, (subtotal, element) -> subtotal + element.getPrice(), Float::sum);

        UserVehicle userVehicle = UserVehicle.builder()
                .user(currentUser)
                .brand(userConfiguration.getSelectedVehicle().getBrand())
                .model(userConfiguration.getSelectedVehicle().getModel())
                .image(userConfiguration.getSelectedVehicle().getImage())
                .color(userConfiguration.getSelectedColor().getColor())
                .colorName(userConfiguration.getSelectedColor().getName())
                .engineName(userConfiguration.getSelectedEngine().getName())
                .rimName(userConfiguration.getSelectedRim().getName())
                .totalPrice(totalPrice)
                //TODO .extras()
                .build();

        UserVehicle saved = userVehicleRepository.save(userVehicle);
        invoiceMessageService.sendInvoiceMessageEmail(currentUser.getEmail(), saved);
        userConfigurationRepository.delete(userConfiguration);
    }

    public List<UserVehicle> getUserVehicles() {
        return userService.findLoggedUser().getUserVehicles();
    }
}
