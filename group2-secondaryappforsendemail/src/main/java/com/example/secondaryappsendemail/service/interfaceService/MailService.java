package com.example.secondaryappsendemail.service.interfaceService;

import com.example.secondaryappsendemail.dto.DataMailDto;
import jakarta.mail.MessagingException;

public interface MailService {
    void sendEmail(DataMailDto dataMailDto,String templateName) throws MessagingException;
}
