# Web server that returns IP and request count

This minimal web server can be used for testing load balancers and reverse proxies.

It returns a text response with the IP of the webserver and the number of requests it has received, like

    Server: worker-1
    IP: 172.17.0.2
    Visits: 6

    Host: counter.mycompany.com
    X-Forwarded-For: 34.230.12.56

Run it by

    docker run -d -p 8080:8080 --name ip-and-counter jpsecher/ip-and-counter $(hostname)

Stop it by

    docker kill ip-and-counter

It has a non-counting health endpoint at `/health`.

----

[![Docker build status](https://img.shields.io/docker/build/jpsecher/ip-and-counter.svg)](https://hub.docker.com/r/jpsecher/ip-and-counter/builds/)
