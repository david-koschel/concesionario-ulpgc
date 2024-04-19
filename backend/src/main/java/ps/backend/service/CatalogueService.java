package ps.backend.service;

import org.springframework.stereotype.Service;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.repository.CatalogueRepository;

import java.util.List;

@Service
public class CatalogueService {

    private final CatalogueRepository catalogueRepository;

    public CatalogueService(CatalogueRepository catalogueRepository) {
        this.catalogueRepository = catalogueRepository;
    }

    public List<ConfigurableVehicle> getCatalogue() {
        return catalogueRepository.findAll();
    }

    public ConfigurableVehicle findById(Integer id) {
        return catalogueRepository.findById(id).orElse(null);
    }


    public ConfigurableVehicle updateCatalogue(ConfigurableVehicle updatedCatalogue) {
        ConfigurableVehicle existingCatalogue = catalogueRepository.findById(updatedCatalogue.getId()).orElse(null);
        if (existingCatalogue == null) {
            throw new IllegalArgumentException("Catálogo no encontrado");
        }

        existingCatalogue.setBrand(updatedCatalogue.getBrand());
        existingCatalogue.setModel(updatedCatalogue.getModel());
        existingCatalogue.setDescription(updatedCatalogue.getDescription());
        existingCatalogue.setImage(updatedCatalogue.getImage());

        return catalogueRepository.save(existingCatalogue);
    }

    public ConfigurableVehicle addVehicle(ConfigurableVehicle newVehicle) {
        return catalogueRepository.save(newVehicle);
    }
}
