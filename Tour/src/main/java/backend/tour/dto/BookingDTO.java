package backend.tour.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
@Data
public class BookingDTO implements Serializable {
    private Long id;
    private Long userId;
    private Long scheduleId;
    private Integer numPeople;
    private BigDecimal totalPrice;
    private Instant bookingDate;
    private String status;
}
