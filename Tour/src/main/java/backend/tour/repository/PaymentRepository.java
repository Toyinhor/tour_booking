package backend.tour.repository;

import backend.tour.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    PaymentEntity findFirstByBookingId(Long bookingId);
    PaymentEntity findFirstById(Long id);
}
