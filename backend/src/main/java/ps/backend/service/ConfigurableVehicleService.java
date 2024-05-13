package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import ps.backend.dto.PaymentInfoDto;
import ps.backend.entity.Payment;
import ps.backend.entity.User;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.entity.userVehicle.UserConfiguration;
import ps.backend.entity.userVehicle.UserVehicle;
import ps.backend.entity.userVehicle.VehicleExtra;
import ps.backend.entity.userVehicle.VehiclePaymentStatusEnum;
import ps.backend.exception.BasicException;
import ps.backend.repository.ConfigurableVehicleRepository;
import ps.backend.repository.UserConfigurationRepository;
import ps.backend.repository.UserVehicleRepository;

import java.util.List;
import java.util.stream.Collectors;

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

    @Transactional
    public PaymentInfoDto buyVehicle(Integer id) {
        User currentUser = userService.findLoggedUser();

        UserConfiguration userConfiguration = currentUser.getUserConfigurations().stream()
                .filter(config -> config.getId().equals(id))
                .findFirst().orElseThrow(BasicException::new);

        if (userConfiguration.isHidden()) throw new BasicException("Ya hay una compra en proceso");

        Payment payment = this.paymentService.createNewPayment(
                VEHICLE_PURCHASE,
                (int) Math.floor(userConfiguration.getTotalPrice() * 100)
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
                .totalPrice(userConfiguration.getTotalPrice())
                .payment(payment)
                .userConfigurationId(userConfiguration.getId())
                .paymentStatus(VehiclePaymentStatusEnum.IN_PROCESS)
                //TODO .extras()
                .build();

        UserVehicle savedVehicle = userVehicleRepository.save(userVehicle);


        savedVehicle.setExtras(userConfiguration.getSelectedExtras().stream()
                .map(extra ->
                        VehicleExtra.builder()
                                .name(extra.getName())
                                .description(extra.getDescription())
                                .build()
                ).collect(Collectors.toList())
        );

        userVehicleRepository.save(savedVehicle);

        userConfiguration.setHidden(true);
        userConfigurationRepository.save(userConfiguration);

        return paymentService.getPaymentInfo(payment, "http:localhost:4200/user");
    }

    public void paymentConfirmation(Payment payment) {
        UserVehicle vehicle = payment.getUserVehicle();
        if (payment.paymentWasSuccessful()) {
            vehicle.setPaymentStatus(VehiclePaymentStatusEnum.BOUGHT);
            userVehicleRepository.save(vehicle);
            UserConfiguration userConfiguration = userConfigurationRepository.findById(vehicle.getUserConfigurationId()).orElseThrow(EntityNotFoundException::new);
            invoiceMessageService.sendInvoiceMessageEmail(vehicle, userConfiguration);
            userConfigurationRepository.delete(userConfiguration);
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
