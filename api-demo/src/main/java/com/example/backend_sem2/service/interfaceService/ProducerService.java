package com.example.backend_sem2.service.interfaceService;

import com.example.backend_sem2.dto.DataMailDto;

public interface ProducerService {
    public void sendJsonMessage(DataMailDto dataMailDto);
}
