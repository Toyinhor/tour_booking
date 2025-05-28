package backend.tour.service;

import backend.tour.entity.TourScheduleEntity;
import backend.tour.repository.TourScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TourScheduleService {
    @Autowired
    TourScheduleRepository tourScheduleRepository;

    private TourScheduleEntity DTOToEntity(TourScheduleEntity tourScheduleDTO) {
        TourScheduleEntity tourScheduleEntity = new TourScheduleEntity();
        tourScheduleEntity.setId(tourScheduleDTO.getId());
        tourScheduleEntity.setTourId(tourScheduleDTO.getTourId());
        tourScheduleEntity.setStartDate(tourScheduleDTO.getStartDate());
        tourScheduleEntity.setEndDate(tourScheduleDTO.getEndDate());
        tourScheduleEntity.setAvailableSlots(tourScheduleDTO.getAvailableSlots());
        return tourScheduleEntity;
    }

    public List<TourScheduleEntity> getSchedulesByTourId(Long tourId) {
        return tourScheduleRepository.findAllByTourId(tourId);
    }

    public void createSchedule(TourScheduleEntity tourScheduleDTO) {
        TourScheduleEntity tourScheduleEntity = DTOToEntity(tourScheduleDTO);
        tourScheduleRepository.save(tourScheduleEntity);
    }

    public void updateSchedule(TourScheduleEntity tourScheduleDTO) {
        TourScheduleEntity tourScheduleEntity = DTOToEntity(tourScheduleDTO);
        tourScheduleRepository.save(tourScheduleEntity);
    }

    public void deleteSchedule(Long id) {
        tourScheduleRepository.deleteById(id);
    }

    public void decreaseAvailableSlots(Long scheduleId, Integer slot) {
        TourScheduleEntity tourScheduleEntity = tourScheduleRepository.findById(scheduleId).orElse(null);
        if (tourScheduleEntity != null) {
            int availableSlots = tourScheduleEntity.getAvailableSlots();
            if (availableSlots > 0) {
                tourScheduleEntity.setAvailableSlots(availableSlots - slot);
                tourScheduleRepository.save(tourScheduleEntity);
            }
        }
    }
}