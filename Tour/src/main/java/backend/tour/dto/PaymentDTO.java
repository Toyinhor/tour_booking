package backend.tour.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

@Data
public class PaymentDTO implements Serializable {
    private Long id;
    private Long bookingId;
    private Instant paymentDate;
    private BigDecimal amount;
    private String method;
    private String status;
}
