package ps.backend.entity.configurableVehicle;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class ConfigurableVehicleModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    @Column(columnDefinition="MEDIUMTEXT")
    private String image;

    @OneToMany
    @JoinColumn(name = "model_id")
    private List<ConfigurableVehicleModelMake> makes;
}

