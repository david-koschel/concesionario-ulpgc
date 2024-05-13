package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.entity.UserIndependentExtras;
import ps.backend.entity.userVehicle.UserConfiguration;
import ps.backend.entity.userVehicle.UserVehicle;

@Service
public class InvoiceMessageService {

    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public InvoiceMessageService(EmailService emailService, TemplateEngine templateEngine){
        this.emailService = emailService;
        this.templateEngine = templateEngine;
    }

    public void sendVehicleInvoiceMessageEmail(UserVehicle userVehicle, UserConfiguration configuration) {
        String emailBody = this.generateEmailBody();
        this.emailService.sendVehicleInvoiceMail(
                userVehicle.getUser().getEmail(),
                "Factura Concesionario ULPGC - Vehículo",
                emailBody,
                configuration,
                userVehicle.getPayment().getOrderNumber()
        );
    }

    public void sendExtraInvoiceMessageEmail(UserIndependentExtras extra) {
        String emailBody = this.generateEmailBody();
        this.emailService.sendExtraInvoiceMail(
                extra.getUser().getEmail(),
                "Factura Concesionario ULPGC - Accesorio",
                emailBody,
                extra
        );
    }

    private String generateEmailBody() {
        Context context = new Context();
        return this.templateEngine.process("invoice-message.html", context);
    }
}