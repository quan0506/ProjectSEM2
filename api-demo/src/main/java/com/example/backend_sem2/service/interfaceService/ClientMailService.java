package com.example.backend_sem2.service.interfaceService;


import com.example.backend_sem2.dto.OrderRequest;

public interface ClientMailService {
    public Boolean addRequestToDtoAndSendJsonMessage(OrderRequest orderRequest);
}
