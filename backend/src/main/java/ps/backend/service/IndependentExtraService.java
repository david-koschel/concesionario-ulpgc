package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import ps.backend.dto.PaymentInfoDto;
import ps.backend.entity.IndependentExtra;
import ps.backend.entity.Payment;
import ps.backend.entity.PaymentType;
import ps.backend.entity.User;
import ps.backend.entity.UserIndependentExtras;
import ps.backend.repository.IndependentExtraRepository;
import ps.backend.repository.UserIndependentExtrasRepository;

import java.util.List;

@Service
public class IndependentExtraService {
    private final IndependentExtraRepository independentExtraRepository;
    private final UserService userService;
    private final UserIndependentExtrasRepository userIndependentExtrasRepository;
    private final PaymentService paymentService;
    private final InvoiceMessageService invoiceMessageService;

    public IndependentExtraService(IndependentExtraRepository independentExtraRepository, UserService userService, UserIndependentExtrasRepository userIndependentExtrasRepository, PaymentService paymentService, InvoiceMessageService invoiceMessageService) {
        this.independentExtraRepository = independentExtraRepository;
        this.userService = userService;
        this.userIndependentExtrasRepository = userIndependentExtrasRepository;
        this.paymentService = paymentService;
        this.invoiceMessageService = invoiceMessageService;
    }

    public List<IndependentExtra> findAll(){
        return  independentExtraRepository.findAll();
    }


    public List<UserIndependentExtras> getUserIndependentExtras(){
        return userService.findLoggedUser().getUserIndependentExtras()
                .stream().filter(UserIndependentExtras::isBought)
                .toList();
    }

    public PaymentInfoDto buyUserIndependentExtra(Integer id) {
        User user = userService.findLoggedUser();
        IndependentExtra independentExtra = independentExtraRepository.findById(id).orElseThrow(EntityNotFoundException::new);

        Payment payment = this.paymentService.createNewPayment(PaymentType.EXTRA_PURCHASE, (int) (independentExtra.getPrice() * 100));

        UserIndependentExtras userIndependentExtras = UserIndependentExtras.builder()
                .user(user)
                .name(independentExtra.getName())
                .description(independentExtra.getDescription())
                .image(independentExtra.getImage())
                .price(independentExtra.getPrice())
                .payment(payment)
                .bought(false)
                .build();

        UserIndependentExtras save = userIndependentExtrasRepository.save(userIndependentExtras);
        return paymentService.getPaymentInfo(save.getPayment(), "http:localhost:4200/user");
    }

    public void paymentConfirmation(Payment payment) {
        UserIndependentExtras extra = payment.getUserIndependentExtras();
        if (payment.paymentWasSuccessful()) {
            extra.setBought(true);
            userIndependentExtrasRepository.save(extra);
            invoiceMessageService.sendExtraInvoiceMessageEmail(userIndependentExtrasRepository.save(extra));
        } else {
            userIndependentExtrasRepository.delete(extra);
        }

    }


    public IndependentExtra saveIndependentExtra(IndependentExtra independentExtra) {
        return independentExtraRepository.save(independentExtra);
    }

    public IndependentExtra updateIndependentExtra(IndependentExtra independentExtra){
        return independentExtraRepository.save(independentExtra);
    }

}

