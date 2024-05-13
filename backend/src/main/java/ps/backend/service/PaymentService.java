package ps.backend.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import ps.backend.dto.PaymentInfoDto;
import ps.backend.entity.Payment;
import ps.backend.entity.PaymentType;
import ps.backend.exception.BasicException;
import ps.backend.repository.PaymentRepository;
import sis.redsys.api.ApiMacSha256;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class PaymentService {

    private final String key = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";
    private final String shopId = "999008881";
    private final ConfigurableVehicleService configurableVehicleService;

    @Value("${redsys.notification.url}")
    private String notificationUrl;

    private final PaymentRepository paymentRepository;

    private static final DateTimeFormatter DATE_AND_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMdd");

    public PaymentService(PaymentRepository paymentRepository, @Lazy ConfigurableVehicleService configurableVehicleService) {
        this.paymentRepository = paymentRepository;
        this.configurableVehicleService = configurableVehicleService;
    }


    @Transactional
    public Payment createNewPayment(PaymentType type, Integer amount) {
        Payment payment = new Payment();
        payment.setStatus(-1);
        payment.setAmount(amount);
        payment.setPaymentType(type);

        Payment savedPayment = this.paymentRepository.save(payment);

        savedPayment.setOrderNumber(LocalDate.now().format(DATE_AND_TIME_FORMATTER) + payment.getId());
        savedPayment.setModificationDate(ZonedDateTime.now());

        return this.paymentRepository.save(savedPayment);
    }

    public PaymentInfoDto getPaymentInfo(Payment payment, String url) {
        if (payment.getStatus() != -1) {
            throw new BasicException("Este pago ya ha sido procesado");
        }

        try {
            ApiMacSha256 apiMacSha256 = getApiMacSha256(payment, url);
            PaymentInfoDto paymentInfo = new PaymentInfoDto();
            paymentInfo.setDs_SignatureVersion("HMAC_SHA256_V1");
            paymentInfo.setDs_MerchantParameters(apiMacSha256.createMerchantParameters());
            paymentInfo.setDs_Signature(apiMacSha256.createMerchantSignature(key));
            return paymentInfo;
        } catch (UnsupportedEncodingException | InvalidKeyException | NoSuchAlgorithmException |
                 NoSuchPaddingException | InvalidAlgorithmParameterException | IllegalBlockSizeException |
                 BadPaddingException e) {
            throw new BasicException("Error al encriptar los datos de pago");
        }
    }

    public void paymentConfirmation(PaymentInfoDto response, PaymentType type) {
        ApiMacSha256 apiMacSha256 = new ApiMacSha256();
        try {
            apiMacSha256.decodeMerchantParameters(response.getDs_MerchantParameters());
            if (apiMacSha256.createMerchantSignatureNotif(key, response.getDs_MerchantParameters()).equals(response.getDs_Signature())) {
                String order = apiMacSha256.getOrderNotif();
                Integer status = Integer.valueOf(apiMacSha256.getParameter("Ds_Response"));
                this.updatePayment(order, status, type);
            } else {
                throw new BasicException("Respuesta con firma inválida");
            }

        } catch (InvalidAlgorithmParameterException | UnsupportedEncodingException | NoSuchPaddingException |
                 IllegalBlockSizeException | NoSuchAlgorithmException | BadPaddingException | InvalidKeyException e) {
            throw new BasicException("Error al desencriptar pago");
        }
    }

    private void updatePayment(String order, Integer status, PaymentType type) {
        Payment payment = this.paymentRepository.findByOrderNumber(order).orElseThrow(EntityNotFoundException::new);
        if (payment.getPaymentType() != type)
            throw new BasicException("El tipo de pago no concuerda con el de la entidad");
        payment.setStatus(status);
        payment.setModificationDate(ZonedDateTime.now());
        paymentRepository.save(payment);
        if (type == PaymentType.VEHICLE_PURCHASE) {
            configurableVehicleService.paymentConfirmation(payment);
        }
    }

    private ApiMacSha256 getApiMacSha256(Payment payment, String url) {
        ApiMacSha256 apiMacSha256 = new ApiMacSha256();

        apiMacSha256.setParameter("DS_MERCHANT_AMOUNT", String.valueOf(payment.getAmount()));
        apiMacSha256.setParameter("DS_MERCHANT_ORDER", payment.getOrderNumber());
        apiMacSha256.setParameter("DS_MERCHANT_MERCHANTCODE", shopId);
        apiMacSha256.setParameter("DS_MERCHANT_CURRENCY", "978");
        apiMacSha256.setParameter("DS_MERCHANT_TRANSACTIONTYPE", "0");
        apiMacSha256.setParameter("DS_MERCHANT_TERMINAL", "1");
        apiMacSha256.setParameter("DS_MERCHANT_URLOK", url);
        apiMacSha256.setParameter("DS_MERCHANT_URLKO", url);
        apiMacSha256.setParameter("DS_MERCHANT_MERCHANTURL", "%s/%s".formatted(notificationUrl, payment.getPaymentType().name()));

        return apiMacSha256;
    }
}
