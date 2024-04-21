package ps.backend.entity.userVehicle;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import ps.backend.entity.User;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleColor;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleEngine;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleExtra;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleRim;

import java.util.List;

@Entity
@Getter
@Setter
public class UserConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne
    private User user;

    @ManyToOne
    private ConfigurableVehicle selectedVehicle;

    @ManyToOne
    private ConfigurableVehicleColor selectedColor;

    @ManyToOne
    private ConfigurableVehicleEngine selectedEngine;

    @ManyToOne
    private ConfigurableVehicleRim selectedRim;

    @ManyToMany
    @JoinTable(
            name = "user_configuration_extra",
            joinColumns = @JoinColumn(name = "user_configuration_id"),
            inverseJoinColumns = @JoinColumn(name = "configurable_vehicle_extra_id")
    )
    private List<ConfigurableVehicleExtra> selectedExtras;
}
