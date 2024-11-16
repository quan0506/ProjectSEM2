package com.example.secondaryappsendemail.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {
    @Value("${rabbitmq.queue.name}")
    private String queue;
    @Value("${rabbitmq.exchange.name}")
    private String exchange;
    @Value("${rabbitmq.routing.key.name}")
    private String routingKey;

    @Bean
    public Queue queue(){
        return new Queue(queue);
    }
    @Bean
    public TopicExchange topicExchange(){
        return new TopicExchange(exchange);
    }
    @Bean
    public Binding binding(){
        return BindingBuilder.bind(queue())
                .to(topicExchange())
                .with(routingKey);
    }

//    Create rabbitMq Template for json message
//    @Bean
//    public MessageConverter converter(){
//    return new Jackson2JsonMessageConverter();
//}
//    @Bean
//    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory){
//        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
//        rabbitTemplate.setMessageConverter(converter());
//        return rabbitTemplate;
//    }



}
