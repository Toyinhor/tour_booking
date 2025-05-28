package backend.tour.controller;

import backend.tour.entity.PaymentEntity;
import backend.tour.service.BookingService;
import backend.tour.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @GetMapping("/{bookingId}")
    public ResponseEntity<PaymentEntity> getPathPayment(@PathVariable Long bookingId){
        PaymentEntity payment = paymentService.getPaymentByBookingId(bookingId);
        if (payment == null){
            return ResponseEntity.ok(paymentService.createPayment(bookingId));
        }
        return ResponseEntity.ok(payment);
    }

    @PutMapping("/purchase/{PaymentId}")
    public ResponseEntity<?> purchasePayment(@PathVariable Long PaymentId){
        paymentService.purchasePayment(PaymentId);
        return ResponseEntity.ok().build();
    }
}
