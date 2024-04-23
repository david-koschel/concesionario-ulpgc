package ps.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class TestDriveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "test_drive_car_id", referencedColumnName = "id")
    private TestDriveCar testDriveCar;

    private Date startDate;

    private Date endDate;

    private String name;

    private String email;

    private boolean accepted;
}
