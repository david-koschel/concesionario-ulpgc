package ps.backend.service;

import org.springframework.stereotype.Service;
import ps.backend.entity.ContactMessage;
import ps.backend.repository.ContactMessageRepository;

import java.util.List;

@Service
public class ContactMessageService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactMessageService(ContactMessageRepository contactMessageRepository){
        this.contactMessageRepository = contactMessageRepository;
    }

    public List<ContactMessage> findAll(){
        return contactMessageRepository.findAll();
    }

    public void save(ContactMessage contactMessage){
        contactMessageRepository.save(contactMessage);
    }

    public void sendContactMessageEmail(ContactMessage contactMessage){
        this.save(contactMessage);
    }
}
