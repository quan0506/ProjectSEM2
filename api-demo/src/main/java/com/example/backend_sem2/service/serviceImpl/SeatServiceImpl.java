package com.example.backend_sem2.service.serviceImpl;

import com.example.backend_sem2.enums.SeatStatusEnum;
import com.example.backend_sem2.dto.SeatResponse;
import com.example.backend_sem2.entity.Seat;
import com.example.backend_sem2.mapper.SeatMapper;
import com.example.backend_sem2.repository.OrderDetailRepo;
import com.example.backend_sem2.repository.SeatRepo;
import com.example.backend_sem2.service.interfaceService.OrderDetailService;
import com.example.backend_sem2.service.interfaceService.SeatService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@AllArgsConstructor
public class SeatServiceImpl implements SeatService {
    private SeatRepo seatRepo;
    private OrderDetailService orderDetailService;
    private SeatMapper seatMapper;
    private OrderDetailRepo orderDetailRepo;

    @Override
    public Seat findSeatById(Long id) {
        return seatRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("seat not found with id:  " +id));
    }

    @Override
    public List<SeatResponse> getAllSeatOfASlotWithStatus(Long slotId) {
        List<String> orderedSeatNameList = orderDetailService.getAllOrderedSeatName(slotId);
        List<Seat> seatsListInSlot = seatRepo.getSeatBySlotId(slotId);

        return seatsListInSlot.stream()
                .map(seat -> {
                    SeatResponse seatResponse = seatMapper.toDto(seat);
                    if(orderedSeatNameList.contains(seat.getSeatName())){
                        seatResponse.setStatus(SeatStatusEnum.BOOKED);
                    }else {
                        seatResponse.setStatus(SeatStatusEnum.AVAILABLE);
                    }
                    return seatResponse;
                }).toList();
    }

    @Override
    @Transactional
    public boolean isAllSeatIsAvailableInSlot(List<Long> seatIdList, Long slotId) {
        return seatIdList.stream().noneMatch(
                seatId -> orderDetailRepo.existsBySeat_IdAndOrder_Slot_Id(seatId, slotId)
        );
    }
}
