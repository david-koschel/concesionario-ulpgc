package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.dto.PaymentInfoDto;
import ps.backend.entity.Payment;
import ps.backend.entity.User;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.entity.userVehicle.UserConfiguration;
import ps.backend.entity.userVehicle.UserVehicle;
import ps.backend.entity.userVehicle.VehiclePaymentStatusEnum;
import ps.backend.exception.BasicException;
import ps.backend.repository.ConfigurableVehicleRepository;
import ps.backend.repository.UserConfigurationRepository;
import ps.backend.repository.UserVehicleRepository;

import java.util.List;

import static ps.backend.entity.PaymentType.VEHICLE_PURCHASE;

@Service
public class ConfigurableVehicleService {

    private final ConfigurableVehicleRepository configurableVehicleRepository;
    private final UserService userService;
    private final UserConfigurationRepository userConfigurationRepository;
    private final UserVehicleRepository userVehicleRepository;
    private final InvoiceMessageService invoiceMessageService;
    private final PaymentService paymentService;

    public ConfigurableVehicleService(ConfigurableVehicleRepository configurableVehicleRepository, UserService userService, UserConfigurationRepository userConfigurationRepository, UserVehicleRepository userVehicleRepository, InvoiceMessageService invoiceMessageService, PaymentService paymentService) {
        this.configurableVehicleRepository = configurableVehicleRepository;
        this.userService = userService;
        this.userConfigurationRepository = userConfigurationRepository;
        this.userVehicleRepository = userVehicleRepository;
        this.invoiceMessageService = invoiceMessageService;
        this.paymentService = paymentService;
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

    public List<UserConfiguration> getUserConfigurations() {
        return userService.findLoggedUser()
                .getUserConfigurations()
                .stream().filter(userConfiguration -> !userConfiguration.isHidden())
                .toList();
    }

    public PaymentInfoDto buyVehicle(Integer id) {
        User currentUser = userService.findLoggedUser();

        UserConfiguration userConfiguration = currentUser.getUserConfigurations().stream()
                .filter(config -> config.getId().equals(id))
                .findFirst().orElseThrow(BasicException::new);

        float totalPrice = userConfiguration.getSelectedVehicle().getBasePrice() +
                userConfiguration.getSelectedColor().getPrice() +
                userConfiguration.getSelectedRim().getPrice() +
                userConfiguration.getSelectedEngine().getPrice() +
                userConfiguration.getSelectedExtras().stream().reduce(0f, (subtotal, element) -> subtotal + element.getPrice(), Float::sum);

        Payment payment = this.paymentService.createNewPayment(
                VEHICLE_PURCHASE,
                (int) Math.floor(totalPrice * 100)
        );

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
                .payment(payment)
                .userConfigurationId(userConfiguration.getId())
                .paymentStatus(VehiclePaymentStatusEnum.IN_PROCESS)
                //TODO .extras()
                .build();

        userVehicleRepository.save(userVehicle);

        userConfiguration.setHidden(true);
        userConfigurationRepository.save(userConfiguration);

        return paymentService.getPaymentInfo(payment, "http:localhost:4200/user");
    }

    public void paymentConfirmation(Payment payment) {
        UserVehicle vehicle = payment.getUserVehicle();
        if (payment.paymentWasSuccessful()) {
            vehicle.setPaymentStatus(VehiclePaymentStatusEnum.BOUGHT);
            invoiceMessageService.sendInvoiceMessageEmail(vehicle);
            userConfigurationRepository.deleteById(vehicle.getUserConfigurationId());
        } else {
            UserConfiguration userConfiguration = userConfigurationRepository.findById(vehicle.getUserConfigurationId()).orElseThrow(EntityNotFoundException::new);
            userConfiguration.setHidden(false);
            userConfigurationRepository.save(userConfiguration);
            userVehicleRepository.delete(vehicle);
        }
    }

    public PaymentInfoDto getPaymentInfo(Integer userVehicleId) {
        UserVehicle userVehicle = this.userVehicleRepository.findById(userVehicleId).orElseThrow(EntityNotFoundException::new);

        if (userVehicle.getPaymentStatus() == VehiclePaymentStatusEnum.IN_PROCESS) {
            return this.paymentService.getPaymentInfo(userVehicle.getPayment(), "http:localhost:4200/user");
        }

        throw new BasicException("Estado del vehiculo inválido");
    }

    public List<UserVehicle> getUserVehicles() {
        return userService.findLoggedUser().getUserVehicles();
    }
}
