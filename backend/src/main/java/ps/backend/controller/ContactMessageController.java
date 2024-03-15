package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import ps.backend.entity.ContactMessage;
import ps.backend.service.ContactMessageService;

import java.util.List;

@Controller
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService){
        this.contactMessageService = contactMessageService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<ContactMessage> findAll() {
        return this.contactMessageService.findAll();
    }

    @PostMapping("/form")
    public void sendContactMessageMail(@RequestBody ContactMessage contactMessage){
        this.contactMessageService.sendContactMessageEmail(contactMessage);
    }
}
