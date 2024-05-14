package ps.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import ps.backend.entity.UserIndependentExtras;
import ps.backend.entity.userVehicle.UserConfiguration;

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

    public void sendMultipleEmail(String subject, String body, String... to) {
        try {
            MimeMessageHelper helper = this.createEmailObjectMultiple(subject, body, to);
            emailSender.send(helper.getMimeMessage());
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendVehicleInvoiceMail(String to, String subject, String body, UserConfiguration userConfiguration, String orderNumber) {
        try {
            MimeMessageHelper helper = this.createEmailObject(to, subject, body);
            ByteArrayDataSource attachment = this.pdfService.generateVehicleInvoicePDF(userConfiguration, orderNumber);
            helper.addAttachment(attachment.getName(), attachment);
            emailSender.send(helper.getMimeMessage());
        } catch (MessagingException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendExtraInvoiceMail(String to, String subject, String body, UserIndependentExtras extra) {
        try {
            MimeMessageHelper helper = this.createEmailObject(to, subject, body);
            ByteArrayDataSource attachment = this.pdfService.generateExtraInvoicePDF(extra, extra.getPayment().getOrderNumber());
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

    private MimeMessageHelper createEmailObjectMultiple(String subject, String body, String... to) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setFrom(EMAIL_ADDRESS, EMAIL_NAME);
        helper.setBcc(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        return helper;
    }
}