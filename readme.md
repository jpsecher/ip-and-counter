# Web server that returns IP and request count

This minimal web server can be used for testing load balancers and reverse proxies.

It returns a text response with the IP of the webserver and the number of requests it has received, like

    Server: worker-1
    Container IPs: 10.0.0.113,172.18.0.5,10.0.1.126
    Visits: 6

    Host: counter.mycompany.com
    X-Forwarded-For: 34.230.12.56

Run it by

    docker run -d -p 8080:8080 --name ip-and-counter jpsecher/ip-and-counter $(hostname)

Stop it by

    docker kill ip-and-counter

It has a non-counting health endpoint at `/health`.  It can be used in a Docker Swarm setting like

    version: '3.8'
    services:
      counter:
        image: jpsecher/ip-and-counter
        environment:
          hostname: "{% raw %}{{.Node.Hostname}}{% endraw %}"
        ports:
          - target: 8080
        healthcheck:
          test: ["CMD", "node", "-e", "fetch('http://localhost:8080/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]
        networks:
          - loadbalancer
        deploy:
          mode: global
          labels:
            - "traefik.http.services.counter.loadbalancer.server.port=8080"
            - "traefik.http.routers.counter.entrypoints=public"
            - "traefik.http.routers.counter.rule=Host(`counter.{{ domain }}`)"
    networks:
      loadbalancer:
        external: true


----
[Docker Hub](https://hub.docker.com/r/jpsecher/ip-and-counter/builds/)
