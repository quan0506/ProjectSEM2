package com.example.backend_sem2.service.interfaceService;

import com.example.backend_sem2.dto.SeatResponse;
import com.example.backend_sem2.entity.Seat;
import com.example.backend_sem2.entity.TheaterRoom;

import java.util.List;

public interface SeatService {
    Seat findSeatById(Long id);
    List<SeatResponse> getAllSeatOfASlotWithStatus(Long slotId);
    boolean isAllSeatIsAvailableInSlot(List<Long> seatIdList, Long slotId);
}
