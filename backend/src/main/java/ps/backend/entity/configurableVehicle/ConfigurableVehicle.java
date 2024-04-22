package ps.backend.entity.configurableVehicle;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
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

    private String brand;

    private String model;

    private Float basePrice;

    private String description;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String image;

    @OneToMany(mappedBy = "configurableVehicle", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<ConfigurableVehicleColor> colors;

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
}

