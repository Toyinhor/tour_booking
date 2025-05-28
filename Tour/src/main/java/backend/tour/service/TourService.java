package backend.tour.service;

import backend.tour.entity.TourEntity;
import backend.tour.entity.TourScheduleEntity;
import backend.tour.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class TourService {
    @Autowired
    TourRepository tourRepository;

    private TourEntity DTOToEntity(TourEntity tourDTO) {
        TourEntity tourEntity = new TourEntity();
        tourEntity.setId(tourDTO.getId());
        tourEntity.setTitle(tourDTO.getTitle());
        tourEntity.setDescription(tourDTO.getDescription());
        tourEntity.setLocation(tourDTO.getLocation());
        tourEntity.setPrice(tourDTO.getPrice());
        tourEntity.setDurationDays(tourDTO.getDurationDays());
        tourEntity.setCreatedAt(Instant.now());
        tourEntity.setImageUrl(tourDTO.getImageUrl());
        return tourEntity;
    }

    public List<TourEntity> findAll(){
        return tourRepository.findAll();
    }

    public TourEntity findById(Long id){
        return tourRepository.findById(id).orElse(null);
    }

    public List<TourEntity> getTour(Integer page){
        Integer offset = page * 6;
        return  tourRepository.GetTour(offset, 6);
    }

    public void createTour(TourEntity tourDTO) {
        TourEntity tourEntity = DTOToEntity(tourDTO);
        tourRepository.save(tourEntity);
    }

    public void updateTour(TourEntity tourDTO) {
        TourEntity tourEntity = DTOToEntity(tourDTO);
        tourRepository.save(tourEntity);
    }

    public void deleteTour(Long id) {
        tourRepository.deleteById(id);
    }

    public List<TourEntity> getLastestTour(){
        return tourRepository.LastestTour();
    }
}
