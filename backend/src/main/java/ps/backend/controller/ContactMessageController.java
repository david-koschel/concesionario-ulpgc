package ps.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ps.backend.entity.ContactMessage;
import ps.backend.service.ContactMessageService;

import java.util.List;

@RestController
@RequestMapping("api/contact_message")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(ContactMessageService contactMessageService){
        this.contactMessageService = contactMessageService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/all")
    public List<ContactMessage> findAll() {
        return this.contactMessageService.findAll();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/answer")
    public void sendAnswerContactMessageMail(@RequestBody ContactMessage contactMessage){
        this.contactMessageService.sendContactMessageEmail(contactMessage);
    }

    @PostMapping("/form")
    public void sendContactMessageMail(@RequestBody ContactMessage contactMessage){
        this.contactMessageService.save(contactMessage);
    }
}
