package ps.backend.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class TestDriveRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private TestDriveCar testDriveCar;

    private Date startDate;

    private Date endDate;

    @OneToOne
    private User user;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public TestDriveCar getTestDriveCar() {
        return testDriveCar;
    }

    public void setTestDriveCar(TestDriveCar testDriveCar) {
        this.testDriveCar = testDriveCar;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
