# Monitoring Tool POC

This is a Proof of Concept (POC) for a monitoring tool built using **Grafana**, **Loki**, and **Promtail** to collect, visualize, and analyze logs and metrics from your system and nodejs application.

## Deployment Architecture

The Simple Scalable Deployment (SSD) mode provides a horizontally scalable setup with a clear separation of concerns between its components. Dedicated instances for read and write. 

It’s designed for production environments where a balance between performance and operational simplicity is needed.

## How to run 

1. Create three file in the loki directory and add S3 bucket access_key_id, secret_access_key, and endpoint
   1. s3_access_key
   2. s3_secret_key
   3. s3_endpoint
2. Run `docker compose up -d` from the root directory to start the services.

## Grafana Integration
1. Log in to Grafana.
2. Add Loki as a data source:
    URL: http://loki-gateway:80
3. Save and test the data source.