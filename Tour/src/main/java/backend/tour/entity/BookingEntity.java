package backend.tour.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "bookings")
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "num_people", nullable = false)
    private Integer numPeople;

    @Column(name = "total_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPrice;

    @ColumnDefault("current_timestamp()")
    @Column(name = "booking_date", nullable = false)
    private Instant bookingDate;

    @ColumnDefault("'PENDING'")
    @Column(name = "status", length = 20)
    private String status;

//    @OneToMany(mappedBy = "booking")
//    private Set<PaymentEntity> payments = new LinkedHashSet<>();
//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
//    private TourScheduleEntity tourSchedule;

}