package ps.backend.entity.configurableVehicle;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ConfigurableVehicleColor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String color;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String vehicleImage;

    private Float price;

    @JsonIgnore
    @ManyToOne
    private ConfigurableVehicle configurableVehicle;
}
