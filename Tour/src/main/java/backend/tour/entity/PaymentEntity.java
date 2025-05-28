package backend.tour.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "payments")
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "booking_id")
    private Long bookingId;

    @ColumnDefault("current_timestamp()")
    @Column(name = "payment_date", nullable = true)
    private Instant paymentDate;

    @Column(name = "amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "method", length = 50)
    private String method;

    @ColumnDefault("'PENDING'")
    @Column(name = "status", length = 20)
    private String status;

//    @ManyToOne
//    @JoinColumn(name = "booking_id", referencedColumnName = "id", insertable = false, updatable = false)
//    private  BookingEntity booking;

}