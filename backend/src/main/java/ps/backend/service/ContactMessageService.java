package ps.backend.service;

import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import ps.backend.entity.ContactMessage;
import ps.backend.repository.ContactMessageRepository;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;
    private final TemplateEngine templateEngine;

    public ContactMessageService(ContactMessageRepository contactMessageRepository, EmailService emailService, TemplateEngine templateEngine){
        this.contactMessageRepository = contactMessageRepository;
        this.emailService = emailService;
        this.templateEngine = templateEngine;
    }

    public List<ContactMessage> findAll(){
        return contactMessageRepository.findAll();
    }

    private ContactMessage findById(Integer id) {
        return contactMessageRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public void save(ContactMessage contactMessage){
        contactMessageRepository.save(contactMessage);
    }

    public void sendContactMessageEmail(ContactMessage answer) {
        ContactMessage contactMessage = this.findById(answer.getId());

        String emailBody = this.generateEmailBody(contactMessage.getSubject(), answer.getMessage());
        this.emailService.sendEmail(contactMessage.getEmail(), answer.getSubject(), emailBody);

        contactMessage.setAnswered(true);
        this.save(contactMessage);
    }

    private String generateEmailBody(String originalSubject, String message) {
        Context context = new Context();
        context.setVariable("originalSubject", originalSubject);
        context.setVariable("message", message);
        return this.templateEngine.process("contact-message.html", context);
    }
}
