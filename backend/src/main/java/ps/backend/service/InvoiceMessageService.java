package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.entity.userVehicle.UserVehicle;

@Service
public class InvoiceMessageService {

    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public InvoiceMessageService(EmailService emailService, TemplateEngine templateEngine){
        this.emailService = emailService;
        this.templateEngine = templateEngine;
    }

    public void sendInvoiceMessageEmail(String to, UserVehicle userVehicle) {
        String emailBody = this.generateEmailBody();
        this.emailService.sendInvoiceMail(to, "Factura Concesionario ULPGC", emailBody, userVehicle);
    }

    private String generateEmailBody() {
        Context context = new Context();
        return this.templateEngine.process("invoice-message.html", context);
    }
}