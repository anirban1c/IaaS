# OTEL Demo stack
Demo for Opentelemetry components built with cdk8s to show case 


Requirements:
    Air gapped kubernetes (anthos)
    Fluentbit
    ELK Stack
    Prometheus
    Grafana
    Grafana Tempo (for logs)
    OTEL collector as a proxy for Logs, Metrics & Traces
    OTEL collect as an agent as a sidecar for all tennant apps 

    Ease of use to deploy the entire stack
    Vary various components - image/backends/UI


    Create a k3d server:

    ```
    k3d cluster create kevin -a 3 \
    --api-port 6550 \
    -p "8081:80@loadbalancer" \
    --image=rancher/k3s:latest \
    --verbose

    ```

    or with calico

    ```
    k3d cluster create kevin -a 3 \
    --api-port 6550 \
    -p "8081:80@loadbalancer" \
    --k3s-arg "--flannel-backend=none@server:*" \
    --k3s-arg '--disable-network-policy@server:*' \
    --volume "$(pwd)/cni/calico.yaml:/var/lib/rancher/k3s/server/manifests/calico.yaml" \
    --image=rancher/k3s:latest \
    --verbose
    ```


    Trafik ingress expose endpoints via nodeport 8081 on the local workstation
    LB/Ingress config for Azure/Aws/GCP 

