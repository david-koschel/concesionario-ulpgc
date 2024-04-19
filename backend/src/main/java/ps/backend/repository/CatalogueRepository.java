package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.Catalogue;

@Repository
public interface CatalogueRepository extends JpaRepository<Catalogue,Integer> {

}
