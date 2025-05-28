package backend.tour.repository;

import backend.tour.entity.TourScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourScheduleRepository extends JpaRepository<TourScheduleEntity, Long> {

    List<TourScheduleEntity> findAllByTourId(Long tourId);
}