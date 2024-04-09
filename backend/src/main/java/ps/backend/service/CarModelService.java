package ps.backend.service;

import org.springframework.stereotype.Service;
import ps.backend.entity.CarModel;
import ps.backend.repository.CarModelRepository;

import java.util.List;

@Service
public class CarModelService {

    private final CarModelRepository carModelRepository;

    public CarModelService(CarModelRepository carModelRepository) {
        this.carModelRepository = carModelRepository;
    }

    public List<CarModel> findAll() {
        return this.carModelRepository.findAll();
    }

    public void save(CarModel carModel) {
        this.carModelRepository.save(carModel);
    }

    public void delete(CarModel carModel) {
        this.carModelRepository.delete(carModel);
    }
}
