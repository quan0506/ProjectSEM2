package com.example.secondaryappsendemail.service.interfaceService;

import com.example.secondaryappsendemail.dto.DataMailDto;

public interface RabbitMqJsonConsumer {
    void consumerJsonListener(String jsonMessage);
}
