package ps.backend.service;

import org.springframework.stereotype.Service;
import ps.backend.entity.Catalogue;
import ps.backend.repository.CatalogueRepository;

import java.util.List;

@Service
public class CatalogueService {

    private final CatalogueRepository catalogueRepository;

    public CatalogueService(CatalogueRepository catalogueRepository){
        this.catalogueRepository = catalogueRepository;
    }

    public List<Catalogue> getCatalogue(){ return catalogueRepository.findAll();}

    public Catalogue findById(Integer id){ return catalogueRepository.findById(id).orElse(null);}


    public Catalogue updateCatalogue(Catalogue updatedCatalogue) {
        Catalogue existingCatalogue = catalogueRepository.findById(updatedCatalogue.getId()).orElse(null);
        if (existingCatalogue == null) {
            throw new IllegalArgumentException("Catálogo no encontrado");
        }

        existingCatalogue.setName(updatedCatalogue.getName());
        existingCatalogue.setDescription(updatedCatalogue.getDescription());
        existingCatalogue.setImagePath(updatedCatalogue.getImagePath());

        return catalogueRepository.save(existingCatalogue);
    }

    public Catalogue addVehicle(Catalogue newVehicle) {
        return catalogueRepository.save(newVehicle);
    }
}
