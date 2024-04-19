package ps.backend.entity.configurableVehicle;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ConfigurableVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private ConfigurableVehicleModel model;

    @ManyToMany
    @JoinTable(
            name = "configurable_vehicle_engine",
            joinColumns = @JoinColumn(name = "configurable_vehicle_id"),
            inverseJoinColumns = @JoinColumn(name = "configurable_vehicle_engine_id")
    )
    private List<ConfigurableVehicleEngine> engines;

    @ManyToMany
    @JoinTable(
            name = "configurable_vehicle_rim",
            joinColumns = @JoinColumn(name = "configurable_vehicle_id"),
            inverseJoinColumns = @JoinColumn(name = "configurable_vehicle_rim_id")
    )
    private List<ConfigurableVehicleRim> rims;

    @ManyToMany
    @JoinTable(
            name = "configurable_vehicle_extra",
            joinColumns = @JoinColumn(name = "configurable_vehicle_id"),
            inverseJoinColumns = @JoinColumn(name = "configurable_vehicle_extra_id")
    )
    private List<ConfigurableVehicleExtra> extras;

    private String description;
}

