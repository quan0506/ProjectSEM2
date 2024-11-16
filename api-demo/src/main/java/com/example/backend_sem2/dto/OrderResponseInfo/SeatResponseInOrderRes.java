package com.example.backend_sem2.dto.OrderResponseInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
public class SeatResponseInOrderRes {
    private Long id;
    private String seatName;
    private String seatClass;
    private Double price;
}
