package com.example.backend_sem2.controller;

import com.example.backend_sem2.dto.OrderRequest;
import com.example.backend_sem2.service.interfaceService.ClientMailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Mail")
public class MailController {
    @Autowired
    private ClientMailService clientService;

    @PostMapping("/sendMailHtml")
    public ResponseEntity<Boolean> sendEmailHtml(@RequestBody OrderRequest orderRequest){
            return ResponseEntity.ok(clientService.addRequestToDtoAndSendJsonMessage(orderRequest));
    }

}
