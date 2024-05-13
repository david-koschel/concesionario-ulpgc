package ps.backend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ps.backend.dto.PaymentInfoDto;
import ps.backend.entity.PaymentType;
import ps.backend.service.PaymentService;

@RestController
@RequestMapping("api/tpv")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/notification/{type}")
    public void updatePaymentAfterNotification(PaymentInfoDto paymentInfoDto, @PathVariable PaymentType type) {
        paymentService.paymentConfirmation(paymentInfoDto, type);
    }
}
