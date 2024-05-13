package ps.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ps.backend.entity.Payment;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    Optional<Payment> findByOrderNumber(String order);
}
