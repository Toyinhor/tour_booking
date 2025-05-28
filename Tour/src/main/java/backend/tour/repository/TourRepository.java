package backend.tour.repository;

import backend.tour.entity.TourEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<TourEntity, Long> {

    @Query(value = "SELECT * FROM tours ORDER BY id DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<TourEntity> GetTour(@Param("offset") Integer offset, @Param("limit") Integer limit);

    @Query(value = "SELECT * FROM tours ORDER BY id DESC LIMIT 3 OFFSET 0", nativeQuery = true)
    List<TourEntity> LastestTour();
}