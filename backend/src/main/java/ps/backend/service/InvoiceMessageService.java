package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class InvoiceMessageService {

    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public InvoiceMessageService(EmailService emailService, TemplateEngine templateEngine){
        this.emailService = emailService;
        this.templateEngine = templateEngine;
    }

    public void sendInvoiceMessageEmail() {
        String emailBody = this.generateEmailBody();
        this.emailService.sendInvoiceMail("", "Factura Concesionario ULPGC", emailBody);
    }

    private String generateEmailBody() {
        Context context = new Context();
        return this.templateEngine.process("invoice-message.html", context);
    }
}