package com.example.backend_sem2.service.serviceImpl;

import com.example.backend_sem2.entity.TheaterRoom;
import com.example.backend_sem2.repository.TheaterRoomRepo;
import com.example.backend_sem2.service.interfaceService.TheaterRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class TheaterRoomServiceImpl implements TheaterRoomService {
    @Autowired
    private TheaterRoomRepo theaterRoomRepo;


    @Override
    public TheaterRoom findTheaterRoomById(Long id) {
        return theaterRoomRepo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("slot not found with id:  " +id));
    }
}
