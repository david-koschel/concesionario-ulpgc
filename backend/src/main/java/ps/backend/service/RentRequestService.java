package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.dto.RentRequestDto;
import ps.backend.entity.RentRequest;
import ps.backend.entity.RentVehicle;
import ps.backend.entity.TestDriveRequest;
import ps.backend.repository.RentRequestRepository;
import ps.backend.repository.RentVehicleRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class RentRequestService {

    private final RentRequestRepository rentRequestRepository;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public RentRequestService(RentRequestRepository rentRequestRepository, EmailService emailService, TemplateEngine templateEngine) {
        this.rentRequestRepository = rentRequestRepository;
        this.emailService = emailService;
        this.templateEngine = templateEngine;
    }

    public List<RentRequestDto> findAll(){
        return rentRequestRepository.findAll().stream().map(
                rentRequest -> new RentRequestDto(
                        rentRequest.getRentVehicle(),
                        rentRequest.getStartDate(),
                        rentRequest.getEndDate(),
                        rentRequest.getName(),
                        rentRequest.getEmail()
                )
        ).toList();
    }

    public void save(RentRequest rentRequest){
        rentRequestRepository.save(rentRequest);
        sendConfirmationEmail(rentRequest);
    }

    public List<RentVehicle> getFreeRentVehicles(LocalDate startDate, LocalDate endDate){
        List<RentRequest> rentRequests = rentRequestRepository.findAll();
        List<RentVehicle> vehicles = new ArrayList<>();

        for (RentRequest rentRequest : rentRequests) {
            if (endDate.isBefore(rentRequest.getStartDate()) || startDate.isAfter(rentRequest.getEndDate())) {
                vehicles.add(rentRequest.getRentVehicle());
            }
        }

        return vehicles;
    }

    public void sendConfirmationEmail(RentRequest rentRequest){
        String email = rentRequest.getEmail();
        String subject = "Confirmación Alquiler de " + rentRequest.getRentVehicle().getModel();

        String emailBody = this.generateEmailBody(rentRequest);
        this.emailService.sendEmail(email, subject, emailBody);
    }

    private String generateEmailBody(RentRequest rentRequest) {
        String carModel = rentRequest.getRentVehicle().getModel();

        Context context = new Context();
        context.setVariable("model", carModel);
        context.setVariable("startDate", rentRequest.getStartDate());
        context.setVariable("endDate", rentRequest.getEndDate());
        return templateEngine.process("rent-mail.html", context);
    }
}
