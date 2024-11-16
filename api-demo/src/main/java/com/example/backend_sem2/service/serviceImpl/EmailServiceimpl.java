//package com.example.backend_sem2.service.serviceImpl;
//
//import com.example.backend_sem2.dto.DataMailDto;
//import com.example.backend_sem2.dto.OrderRequest;
//import com.example.backend_sem2.service.interfaceService.MailService;
//import jakarta.mail.MessagingException;
//import jakarta.mail.internet.MimeMessage;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.MimeMessageHelper;
//import org.springframework.stereotype.Service;
//import org.thymeleaf.context.Context;
//import org.thymeleaf.spring6.SpringTemplateEngine;
//
//@Service
//public class EmailServiceimpl implements MailService {
//    @Autowired
//    private JavaMailSender mailSender;
//    @Autowired
//    private SpringTemplateEngine templateEngine;
//
//    @Override
//    public void sendHtmlMail(DataMailDto dataMailDto, String templateName) throws MessagingException {
//        MimeMessage message = mailSender.createMimeMessage();
//
//        MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
//
//        Context context = new Context();
//        context.setVariables(dataMailDto.getProps());
//
//        String html = templateEngine.process(templateName, context);
//
//        helper.setTo(dataMailDto.getTo());
//        helper.setSubject(dataMailDto.getSubject());
//        helper.setText(html, true);
//
//        mailSender.send(message);
//    }
//}
