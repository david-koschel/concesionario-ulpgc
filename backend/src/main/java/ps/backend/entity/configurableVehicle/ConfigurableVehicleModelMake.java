package ps.backend.entity.configurableVehicle;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ConfigurableVehicleModelMake {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    private Float price;

    @OneToMany
    @JoinColumn(name = "make_id")
    private List<ConfigurableVehicleMakeColor> colors;
}
