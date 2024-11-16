package com.example.backend_sem2.service.serviceImpl;

import com.example.backend_sem2.dto.SlotResponse;
import com.example.backend_sem2.entity.Slot;
import com.example.backend_sem2.mapper.SlotMapper;
import com.example.backend_sem2.repository.SlotRepo;
import com.example.backend_sem2.service.interfaceService.SlotService;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class SlotServiceImpl implements SlotService {
    private SlotRepo slotRepo;
    private SlotMapper slotMapper;

    @Override
    public List<Slot> getSlotsByMovie_Id(Long id) {
        return slotRepo.getSlotsByMovie_Id(id);
    }

    @Override
    public Slot getSlotById(Long id) {
        return slotRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("slot not found with id:  " +id));
    }

    @Override
    public List<SlotResponse> getSlotsByMovie_IdBetweenTwoZonedDateTimes(Pageable pageable, Long id, ZonedDateTime startOfShowDate, ZonedDateTime endOfShowDate) {
        return slotRepo.getSlotsByMovie_IdAndStartTimeBetween(pageable, id, startOfShowDate, endOfShowDate)
                .stream().map(slotMapper::toSlotResponse).toList();
    }

}
