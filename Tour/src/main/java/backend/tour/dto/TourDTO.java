package backend.tour.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

@Data
public class TourDTO implements Serializable {
    private Long id;
    private String title;
    private String description;
    private String location;
    private BigDecimal price;
    private Integer durationDays;
    private String imageUrl;
    private Instant createdAt;
}
