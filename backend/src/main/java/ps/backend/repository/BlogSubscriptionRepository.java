package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ps.backend.entity.BlogSubscription;

import java.util.Optional;

@Repository
public interface BlogSubscriptionRepository extends JpaRepository<BlogSubscription, Integer> {
    Optional<BlogSubscription> findByEmail(String email);
}
