package com.example.secondaryappsendemail.service.implService;

import com.example.secondaryappsendemail.dto.DataMailDto;
import com.example.secondaryappsendemail.service.interfaceService.MailService;
import com.example.secondaryappsendemail.service.interfaceService.RabbitMqJsonConsumer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RabbitMqJsonConsumerImpl implements RabbitMqJsonConsumer {
    @Autowired
    private MailService mailService;
    private static final Logger LOGGER = LoggerFactory.getLogger(RabbitMqJsonConsumer.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @RabbitListener(queues = {"${rabbitmq.queue.name}"})
    @Override
    public void consumerJsonListener(String jsonMessage) {
        try {
            DataMailDto dataMailDto  = objectMapper.readValue(jsonMessage, DataMailDto.class);
            LOGGER.info(String.format("Received Json Message -> %s",dataMailDto.toString()));
            mailService.sendEmail(dataMailDto,"email-template");
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (MessagingException ME) {
            ME.printStackTrace();
        }


    }
}
