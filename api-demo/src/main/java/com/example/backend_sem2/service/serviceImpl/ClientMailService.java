package com.example.backend_sem2.service.serviceImpl;

import com.example.backend_sem2.dto.DataMailDto;
import com.example.backend_sem2.dto.OrderRequest;
import com.example.backend_sem2.entity.Movie;
import com.example.backend_sem2.entity.Seat;
import com.example.backend_sem2.entity.Slot;
import com.example.backend_sem2.entity.TheaterRoom;
import com.example.backend_sem2.service.interfaceService.*;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ClientMailService implements com.example.backend_sem2.service.interfaceService.ClientMailService {

    @Autowired
    private SlotService slotService;
    @Autowired
    private MovieService movieService;
    @Autowired
    private TheaterRoomServiceImpl theaterRoomService;
    @Autowired
    private AmazonService amazonService;
    @Autowired
    private ProducerServiceImpl producerService;
    @Autowired
    private SeatService seatService;
    @Override
    public Boolean addRequestToDtoAndSendJsonMessage(OrderRequest orderRequest) {
       try {
           DataMailDto dataMail = new DataMailDto();

           dataMail.setTo(orderRequest.getCustomerEmail());
           dataMail.setSubject("Booking Ticket Successfully!");

           Slot slot = slotService.getSlotById(orderRequest.getSlotId());
           Movie movie = movieService.findMovieById(slot.getMovie().getId());
           TheaterRoom theaterRoom = theaterRoomService.findTheaterRoomById(slot.getTheaterRoom().getId());
           List<String> seatName = orderRequest.getSeatIdList().stream()
                   .map(s-> seatService.findSeatById(s).getSeatName())
                   .collect(Collectors.toList());
           Map<String, Object> props = new HashMap<>();
           props.put("slotId",orderRequest.getSlotId());
           props.put("startTime",slot.getStartTime().format(DateTimeFormatter.ofPattern("dd/MM/yyyy - HH:mm:ss Z")));
           props.put("seatName",seatName);
           props.put("movieName",movie.getMovieName());
           props.put("theaterRoom",theaterRoom.getTheaterRoomName());
           props.put("imagePath", amazonService.createPreSignedPosterUrl(movie.getPosterUrl()));


           dataMail.setProps(props);
           producerService.sendJsonMessage(dataMail);
//           mailService.sendHtmlMail(dataMail,"email-template");
           return true;
       }catch (Exception e){
            e.printStackTrace();
       }return false;
    }
}
