package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.dto.TestDriveRequestDto;
import ps.backend.entity.TestDriveCar;
import ps.backend.entity.TestDriveRequest;
import ps.backend.entity.User;
import ps.backend.repository.TestDriveRequestRepository;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

    public List<TestDriveRequestDto> findAll(){
        return testDriveRequestRepository.findAll().stream().map(
                testDriveRequest -> new TestDriveRequestDto(
                        testDriveRequest.getName(),
                        testDriveRequest.getEmail(),
                        testDriveRequest.getTestDriveCar(),
                        testDriveRequest.getStartDate(),
                        testDriveRequest.getEndDate(),
                        testDriveRequest.isAccepted()
                )
        ).toList();
    }

    public void save(TestDriveRequest testDriveRequest){
        testDriveRequestRepository.save(testDriveRequest);
        sendConfirmationEmail(testDriveRequest);
    }

    public List<Date> getOccupiedDatesByTestDriveCar(TestDriveCar testDriveCar) {
        List<TestDriveRequest> testDriveRequestsList = testDriveRequestRepository.findAllByTestDriveCar(testDriveCar);
        List<Date> occupiedDates = new ArrayList<>();
        Date currentDate = new Date();

        for (TestDriveRequest testDriveRequest : testDriveRequestsList) {
            Date startDate = testDriveRequest.getStartDate();
            Date endDate = testDriveRequest.getEndDate();

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(startDate);

            while (!calendar.getTime().after(endDate)) {
                Date currentCalendarDate = calendar.getTime();
                if (currentCalendarDate.equals(startDate) || currentCalendarDate.equals(endDate) || currentCalendarDate.after(currentDate)) {
                    occupiedDates.add(currentCalendarDate);
                }
                calendar.add(Calendar.DATE, 1);
            }
        }
        return occupiedDates;
    }

    public void sendConfirmationEmail(TestDriveRequest testDriveRequest){
        String email = testDriveRequest.getEmail();
        String subject = "Confirmación Solicitud de Prueba de Vehículo";

        String emailBody = this.generateEmailBody(testDriveRequest);
        this.emailService.sendEmail(email, subject, emailBody);
    }

    private String generateEmailBody(TestDriveRequest testDriveRequest) {
        String carModel = testDriveRequest.getTestDriveCar().getModel();

        Context context = new Context();
        context.setVariable("model", carModel);
        context.setVariable("startDate", testDriveRequest.getStartDate());
        context.setVariable("endDate", testDriveRequest.getEndDate());
        return templateEngine.process("test-drive-mail.html", context);
    }
}
