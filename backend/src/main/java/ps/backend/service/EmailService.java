package ps.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ps.backend.entity.userVehicle.UserConfiguration;
import ps.backend.entity.userVehicle.UserVehicle;

import java.io.UnsupportedEncodingException;

@Service
public class EmailService {

    @Value("${spring.mail.username}")
    private String EMAIL_ADDRESS;

    private static final String EMAIL_NAME = "Concesionario ULPGC";
    private final JavaMailSender emailSender;
    private final PdfService pdfService;

    public EmailService(JavaMailSender emailSender, PdfService pdfService) {
        this.emailSender = emailSender;
        this.pdfService = pdfService;
    }

    public void sendEmail(String to, String subject, String body) {
        try {
            MimeMessageHelper helper = this.createEmailObject(to, subject, body);
            emailSender.send(helper.getMimeMessage());
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendInvoiceMail(String to, String subject, String body, UserConfiguration userConfiguration) {
        try {
            MimeMessageHelper helper = this.createEmailObject(to, subject, body);
            ByteArrayDataSource attachment = this.pdfService.generateInvoicePDF(userConfiguration);
            helper.addAttachment(attachment.getName(), attachment);
            emailSender.send(helper.getMimeMessage());
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    private MimeMessageHelper createEmailObject(String to, String subject, String body) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(EMAIL_ADDRESS, EMAIL_NAME);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        return helper;
    }
}