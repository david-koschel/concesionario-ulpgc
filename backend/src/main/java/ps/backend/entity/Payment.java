package ps.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import ps.backend.entity.userVehicle.UserVehicle;

import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String orderNumber;

    private Integer amount;

    private Integer status;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR")
    private PaymentType paymentType;

    private ZonedDateTime modificationDate;

    @JsonIgnore
    @OneToOne(mappedBy = "payment")
    private UserVehicle userVehicle;

    @JsonIgnore
    @OneToOne(mappedBy = "payment")
    private UserIndependentExtras userIndependentExtras;

    @JsonIgnore
    @OneToOne(mappedBy = "payment")
    private RentRequest rentRequest;

    public boolean paymentWasSuccessful() {
        return status >= 0 && status <= 99;
    }

}