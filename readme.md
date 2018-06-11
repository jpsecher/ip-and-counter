# Web server that returns IP and request count

This minimal web server can be used for testing load balancers.

It returns a text response with the IP of the webserver and the number of requests it has received, like

    IP: 172.17.0.2
    visits: 6

Run it by

    docker run -d -p 8080:8080 --name ip-and-counter jpsecher/ip-and-counter

Stop it by

    docker kill ip-and-counter

----

[![Docker build status](https://img.shields.io/docker/build/jpsecher/ip-and-counter.svg)](https://hub.docker.com/r/jpsecher/ip-and-counter/builds/)
