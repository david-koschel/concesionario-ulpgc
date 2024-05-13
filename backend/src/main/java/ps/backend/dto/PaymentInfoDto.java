package ps.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentInfoDto {
    private String ds_SignatureVersion;
    private String ds_MerchantParameters;
    private String ds_Signature;

    @Override
    public String toString() {
        return "PaymentInfoDto{" +
                "ds_SignatureVersion='" + ds_SignatureVersion + '\'' +
                ", ds_MerchantParameters='" + ds_MerchantParameters + '\'' +
                ", ds_Signature='" + ds_Signature + '\'' +
                '}';
    }
}
