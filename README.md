# Dummy Translation Service - DTS

This project is intended to be used as a PoC for Observability principles. If you want to read more about
the concept of observability in distributed systems see the [References] section below.

## DTS - High Level Architecture

The system is composed of 5 services devoted to wonderful task of translating completely useless and irrelevant English sentences.

![DTS Architecture](/images/DTS-Arch.png)

## How to run the project using docker-compose

Install [Docker](https://www.docker.com/) v19.0+ in your machine and simply run

    docker-compose up -d

## How to recreate the docker images for each of the services

If you have modified the code and want to recreate the images for a particular service, simply run the following command:

    DOCKER_BUILDKIT=1 docker build -f $SERVICE-Dockerfile -t dts/$service .

Where you need to fill the right details for each service. For example, to rebuild the image of the english service use:

    DOCKER_BUILDKIT=1 docker build -f English-Dockerfile -t dts/english .

You can also use the convenience `buildAll.sh` script to rebuild all the images

## How to run the project in Kubernetes

Refer to the [k8s section](k8s/README.md)

## Using the Dummy Translator Service

Once the system is up and all its services are up and running you can trigger the translation process by sending a GET request to
the English initiator service. For example:

    http://localhost:8091/start?batch=10

Will trigger the service to send batches of 10 messages (in English) to the **english** kafka topic every second

You can also stop the publishing using an equivalent GET request:

    http://localhost:8091/stop

## Observing the system

Once the DTS system is up and running you can use the list of URLs below to connect to each of the services providing insights about how the system is behaving:

Kibana: http://localhost:5601/

Prometheus UI: http://localhost:9090/

Grafana: http://localhost:3000/

Zipkin UI: http://localhost:9411/

The ports for each of these services can be modified in the `docker-compose.yml` file

Also, you can optionally start up Kafka console consumers as well in case you want to see the flow of messages coming in each Kafka topic.
This can be done in two ways depending on whether you have a local installation of Kafka or prefer to use the dockerized version:

1. Local Kafka


    ${KAFKA_HOME}/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic $TOPIC

So, for example, to consume messages from the Spanish topic:

    ${KAFKA_HOME}/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic spanish

2. From the dockerized Kafka


    docker run -it --rm --network="observability-poc_observability" --link observability-poc_kafka_1 bitnami/kafka:2 /opt/bitnami/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka:29092 --topic spanish

## Running the Angular Application

Included is an Angular 9 application for the purpose of demoing observability capabilities using Kibana and Grafana. To bypass CORS issues and automatic error capturing using the Elastic APM RUM Agent, the Elastic APM server was integrated as a Docker service.

The main points of the application for this purpose are as follows:

- The application uses the NPM Package [APM RUM Agent](https://www.elastic.co/guide/en/apm/agent/rum-js/current/angular-integration.html) from Elastic.
- Said package includes an `APMService` which is initialized in the main `route` file and subscribes to [Angular Router Events](https://angular.io/api/router/Event) to capture events in Angular.
- Some of these events need to be manually sent to APM, such as HTTP errors. An Angular HTTP interceptor was created for this purpose that uses the `captureError` function.
- All these captured events are sent to the APM service running on port `8200`.
- Since HTTP errors are sent manually, new indexable fields are created that mimic the non indexable fields created by Elastic (called `custom` fields). Find these fields prefixed by `labels` i.e (`labels.name`) in Kibana. These new fields are:
  - name
  - message
  - ok
  - status
  - status_text
  - url
- These indexable fields are added to the payload before the event is sent to APM, using the `addFilter` function.
- A grafana Elastic integration and a very basic dashboard (a file in JSON format) are included for a quick demo.

### To run:

1. `cd` to the `angular` directory and run `npm install`
2. Build all services with `docker-compose build` or just build the angular app with `docker-compose build angular`
3. Run the project with `docker-compose up`. The angular app will be accesible on the default `http://localhost:4200`.
4. To see that APM is running, see `http://localhost:8200`

### Things to watch out for:

- Ensure the correct APM index is selected in Kibana
- Ensure the same index is selected in the Grafana Elastic Data Source
- Running all the services could take a while. Be patient!

---

## References

- [The three pillars of Observability](https://www.oreilly.com/library/view/distributed-systems-observability/9781492033431/ch04.html)
  Distributed Systems Observability by Cindy Sridharan, O'Reilly

### Events logs

- [Elastic Stack](https://www.elastic.co/elastic-stack)

### Metrics

- [Prometheus IO](https://prometheus.io/)

- [Micrometer.io](https://micrometer.io/docs)

### Distributed Tracing

- [The Open Tracing project](https://opentracing.io/)

- [Zipkin IO](https://zipkin.io/)

- [Spring Cloud Sleuth](https://spring.io/projects/spring-cloud-sleuth)
