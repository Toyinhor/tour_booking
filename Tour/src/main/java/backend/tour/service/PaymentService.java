package backend.tour.service;

import backend.tour.entity.BookingEntity;
import backend.tour.entity.PaymentEntity;
import backend.tour.repository.BookingRepository;
import backend.tour.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class PaymentService {
    @Autowired
    PaymentRepository  paymentRepository;

    @Autowired
    BookingService bookingService;

    private PaymentEntity DTOToEntity(PaymentEntity paymentDTO) {
        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setId(paymentDTO.getId());
        paymentEntity.setBookingId(paymentDTO.getBookingId());
        paymentEntity.setAmount(paymentDTO.getAmount());
        paymentEntity.setPaymentDate(paymentDTO.getPaymentDate());
        paymentEntity.setStatus(paymentDTO.getStatus());
        return paymentEntity;
    }

    public PaymentEntity createPayment(Long bookingId) {
        PaymentEntity paymentEntity = new PaymentEntity();
        BookingEntity bookingEntity = bookingService.getBookingById(bookingId);
        paymentEntity.setBookingId(bookingId);
        paymentEntity.setAmount(bookingEntity.getTotalPrice());
        paymentEntity.setPaymentDate(null);
        paymentEntity.setMethod(null);
        paymentEntity.setStatus("PENDING");
        return paymentRepository.save(paymentEntity);
    }

    public PaymentEntity getPaymentByBookingId(Long bookingId) {
        return paymentRepository.findFirstByBookingId(bookingId);
    }

    public PaymentEntity purchasePayment(Long PaymentId) {
        PaymentEntity paymentEntity = paymentRepository.findFirstById(PaymentId);
        paymentEntity.setMethod("WEB PURCHASE");
        paymentEntity.setStatus("PURCHASED");
        paymentEntity.setPaymentDate(Instant.now());
        return paymentRepository.save(paymentEntity);
    }

}
