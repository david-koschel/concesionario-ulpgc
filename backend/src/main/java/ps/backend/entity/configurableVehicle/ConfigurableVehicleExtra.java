package ps.backend.entity.configurableVehicle;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Entity
@Getter
@Setter
@Table(name = "extra")
public class ConfigurableVehicleExtra {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String description;

    @Column(columnDefinition="MEDIUMTEXT")
    private String image;

    private Float price;
}
