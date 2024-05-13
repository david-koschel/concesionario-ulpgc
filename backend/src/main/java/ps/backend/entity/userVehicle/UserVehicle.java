
package ps.backend.entity.userVehicle;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ps.backend.entity.Payment;
import ps.backend.entity.User;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonIgnore
    private User user;

    private String brand;

    private String model;

    private Float totalPrice;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String image;

    private String colorName;

    private String color;

    private String engineName;

    private String rimName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "configurable_vehicle_id")
    private List<VehicleExtra> extras;

    @OneToOne
    @JoinColumn(name = "payment_id")
    private Payment payment;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "VARCHAR")
    private VehiclePaymentStatusEnum paymentStatus;

    private Integer userConfigurationId;

}
