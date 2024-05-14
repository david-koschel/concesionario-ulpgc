package ps.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class RentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private RentVehicle rentVehicle;

    private LocalDate startDate;

    private LocalDate endDate;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @ManyToOne
    @JsonIgnore
    private User user;
}
