package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.dto.PaymentInfoDto;
import ps.backend.dto.RentRequestDto;
import ps.backend.entity.Payment;
import ps.backend.entity.PaymentType;
import ps.backend.entity.RentRequest;
import ps.backend.entity.RentVehicle;
import ps.backend.exception.BasicException;
import ps.backend.repository.RentRequestRepository;
import ps.backend.repository.RentVehicleRepository;

import java.time.LocalDate;
import java.util.List;

import static java.time.temporal.ChronoUnit.DAYS;

@Service
public class RentRequestService {

    private final RentRequestRepository rentRequestRepository;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;
    private final RentVehicleRepository rentVehicleRepository;
    private final PaymentService paymentService;
    private final UserService userService;

    public RentRequestService(RentRequestRepository rentRequestRepository, EmailService emailService, TemplateEngine templateEngine, RentVehicleRepository rentVehicleRepository, @Lazy PaymentService paymentService, UserService userService) {
        this.rentRequestRepository = rentRequestRepository;
        this.emailService = emailService;
        this.templateEngine = templateEngine;
        this.rentVehicleRepository = rentVehicleRepository;
        this.paymentService = paymentService;
        this.userService = userService;
    }

    public List<RentRequestDto> findAll() {
        return rentRequestRepository.findAll().stream().map(
                rentRequest -> new RentRequestDto(
                        rentRequest.getRentVehicle(),
                        rentRequest.getStartDate(),
                        rentRequest.getEndDate(),
                        false,
                        rentRequest.getId()
                        )
        ).toList();
    }

    public List<RentRequestDto> findUserRents() {
        return userService.findLoggedUser().getRentRequests().stream()
                .filter(rentRequest -> rentRequest.getEndDate().isAfter(LocalDate.now().minusDays(1)) && rentRequest.getPayment().paymentWasSuccessful())
                .map(rentRequest -> new RentRequestDto(
                        rentRequest.getRentVehicle(),
                        rentRequest.getStartDate(),
                        rentRequest.getEndDate(),
                        rentRequest.getPayment().paymentWasSuccessful(),
                        rentRequest.getId()
                )).toList();
    }

    @Transactional
    public PaymentInfoDto save(RentRequest rentRequest) {
        RentVehicle rentVehicle = rentVehicleRepository.findById(rentRequest.getRentVehicle().getId()).orElseThrow(EntityNotFoundException::new);

        if (rentVehicle.getRentRequests().stream()
                .filter(rentRequest2 -> rentRequest2.getEndDate().isAfter(LocalDate.now().minusDays(1)))
                .anyMatch(rentRequest2 ->
                requestTakesPlaceInInterval(rentRequest.getStartDate(), rentRequest.getEndDate(), rentRequest2)
        )) {
            throw new BasicException("Fechas ocupadas");
        }

        int days = (int) DAYS.between(rentRequest.getStartDate(), rentRequest.getEndDate()) + 1;
        int price = (int) (days * Math.floor(rentVehicle.getPrice() * 100));

        Payment payment = paymentService.createNewPayment(PaymentType.RENT, price);

        rentRequest.setUser(userService.findLoggedUser());
        rentRequest.setPayment(payment);

        rentRequestRepository.save(rentRequest);

        return paymentService.getPaymentInfo(payment, "http:localhost:4200/user");
    }

    public List<RentVehicle> getFreeRentVehicles(LocalDate startDate, LocalDate endDate) {
        List<RentVehicle> vehicles = rentVehicleRepository.findAll();

        return vehicles.stream()
                .filter(rentVehicle -> rentVehicle.getRentRequests().stream()
                .noneMatch(rentRequest -> requestTakesPlaceInInterval(startDate, endDate, rentRequest))
        ).toList();
    }

    private boolean requestTakesPlaceInInterval(LocalDate startDate, LocalDate endDate, RentRequest rentRequest) {
        return (rentRequest.getEndDate().isAfter(startDate) || rentRequest.getEndDate().equals(startDate)) &&
                (rentRequest.getStartDate().isBefore(endDate) || rentRequest.getStartDate().equals(endDate));
    }

    private void sendConfirmationEmail(RentRequest rentRequest) {
        String subject = "Confirmación Alquiler de " + rentRequest.getRentVehicle().getModel();
        String emailBody = this.generateEmailBody(rentRequest);
        this.emailService.sendRentInvoiceMail(emailBody, subject, rentRequest);
    }

    private String generateEmailBody(RentRequest rentRequest) {
        String carModel = rentRequest.getRentVehicle().getModel();

        Context context = new Context();
        context.setVariable("model", carModel);
        context.setVariable("startDate", rentRequest.getStartDate());
        context.setVariable("endDate", rentRequest.getEndDate());
        return templateEngine.process("rent-mail.html", context);
    }

    public void paymentConfirmation(Payment payment) {
        RentRequest rentRequest = payment.getRentRequest();
        if (payment.paymentWasSuccessful()) {
            sendConfirmationEmail(rentRequest);
        } else {
            rentRequestRepository.delete(rentRequest);
        }
    }

    public PaymentInfoDto continuePayment(Integer requestId) {
        RentRequest rentRequest = userService.findLoggedUser().getRentRequests().stream().filter(rentRequest1 -> rentRequest1.getId().equals(requestId)).findFirst().orElseThrow(EntityNotFoundException::new);
        return paymentService.getPaymentInfo(rentRequest.getPayment(), "http:localhost:4200/user");
    }
}
