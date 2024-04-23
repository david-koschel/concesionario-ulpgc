package ps.backend.service;

import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.stereotype.Service;
import ps.backend.entity.TestDriveCar;
import ps.backend.repository.TestDriveCarRepository;

import java.util.List;

@Service
public class TestDriveCarService {

    private final TestDriveCarRepository testDriveCarRepository;

    public TestDriveCarService(TestDriveCarRepository testDriveCarRepository) {
        this.testDriveCarRepository = testDriveCarRepository;
    }

    public List<TestDriveCar> findAll() {return testDriveCarRepository.findAll();}

    public void save(TestDriveCar testDriveCar) {testDriveCarRepository.save(testDriveCar);}

    public TestDriveCar findById(Integer id) {return testDriveCarRepository.findById(id).get();}

    public void deleteById(Integer id) {testDriveCarRepository.deleteById(id);}
}
