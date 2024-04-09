package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.entity.CarModel;
import ps.backend.entity.TestDriveCar;
import ps.backend.entity.TestDriveRequest;
import ps.backend.entity.User;
import ps.backend.repository.TestDriveRequestRepository;

import java.util.List;

@Service
public class TestDriveRequestService {

    private final TestDriveRequestRepository testDriveRequestRepository;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public TestDriveRequestService(TestDriveRequestRepository testDriveRequestRepository, EmailService emailService, TemplateEngine templateEngine) {
        this.testDriveRequestRepository = testDriveRequestRepository;
        this.emailService = emailService;
        this.templateEngine = templateEngine;
    }

    public List<TestDriveRequest> findAll(){
        return testDriveRequestRepository.findAll();
    }

    public void save(TestDriveRequest testDriveRequest){
        testDriveRequestRepository.save(testDriveRequest);
    }

    public void sendConfirmationEmail(TestDriveRequest testDriveRequest){
        User user = testDriveRequest.getUser();
        String subject = "Confirmación Solicitud de Prueba de Vehículo";

        String emailBody = this.generateEmailBody(testDriveRequest);
        this.emailService.sendEmail(user.getEmail(), subject, emailBody);

        this.save(testDriveRequest);
    }

    private String generateEmailBody(TestDriveRequest testDriveRequest) {
        CarModel carModel = testDriveRequest.getTestDriveCar().getModel();

        Context context = new Context();
        context.setVariable("model", carModel.getModelName());
        context.setVariable("startDate", testDriveRequest.getStartDate());
        context.setVariable("endDate", testDriveRequest.getEndDate());
        return templateEngine.process("test-drive-mail.html", context);
    }
}
