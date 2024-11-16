package com.example.backend_sem2.service.serviceImpl;

import com.example.backend_sem2.dto.DataMailDto;
import com.example.backend_sem2.service.interfaceService.ProducerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ProducerServiceImpl implements ProducerService {
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.routing.key.name}")
    private String routingKey;
    private static final Logger LOGGER = LoggerFactory.getLogger(ProducerServiceImpl.class);

    private RabbitTemplate rabbitTemplate;

    @Autowired
    public void setRabbitTemplate(RabbitTemplate rabbitTemplate){
        this.rabbitTemplate = rabbitTemplate;
    }


    @Override
    public void sendJsonMessage(DataMailDto dataMailDto) {
            LOGGER.info(String.format("Json message sent -> %s",dataMailDto.toString()));
            rabbitTemplate.convertAndSend(exchange,routingKey,dataMailDto);
    }
}
