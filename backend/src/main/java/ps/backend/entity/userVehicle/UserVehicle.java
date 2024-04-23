
package ps.backend.entity.userVehicle;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import ps.backend.entity.User;

import java.util.List;

@Entity
@Getter
@Setter
public class UserVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
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

    @OneToMany
    @JoinColumn(name = "configurable_vehicle_id")
    private List<VehicleExtra> extras;
}
