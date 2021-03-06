package com.playground.observability.spanish;

import com.playground.observability.common.pubsub.MsgConsumer;
import com.playground.observability.common.pubsub.MsgPublisher;
import com.playground.observability.common.pubsub.kafka.ConsumerRunner;
import com.playground.observability.common.pubsub.kafka.GenericProcessing;
import com.playground.observability.common.translator.TranslatorClientConfig;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;

@RestController
public class SpanishProcessingController extends GenericProcessing {

    private static final Logger LOGGER = LoggerFactory.getLogger(SpanishProcessingController.class);

    private static final long MAX_DELAY_MILLIS = 500;

    private static final Timer.Builder timer = Timer.builder("spanish_requests_latency")
            .publishPercentiles(0.5, 0.95, 0.99, 0.999)
            .publishPercentileHistogram()
            .sla(Duration.ofMillis(MAX_DELAY_MILLIS))
            .minimumExpectedValue(Duration.ofMillis(1))
            .maximumExpectedValue(Duration.ofMillis(MAX_DELAY_MILLIS + 100));

    @Autowired
    public SpanishProcessingController(MsgPublisher<Long, String> publisher,
                                       MsgConsumer<Long, String> consumer,
                                       MeterRegistry registry,
                                       TranslatorClientConfig translatorClientConfig,
                                       RestTemplate restTemplate) {
        super(publisher, consumer, MAX_DELAY_MILLIS, timer, registry);
        LOGGER.info("Creating new Consumer thread for Spanish...");
        Thread consumerThread = new Thread(new ConsumerRunner(consumer, this::send, translatorClientConfig, restTemplate));
        consumerThread.start();
    }

}