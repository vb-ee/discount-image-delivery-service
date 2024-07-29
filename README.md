# Discounting Platform Image Delivery Service

This is the Image Delivery microservice for the Discounting Platform project. This service stores and provides access to images for different microservices.

## Launching

### Build an image

Dev:

`docker build -t image-delivery-service -f Dockerfile.dev`

Prod:

`docker build -t image-delivery-service Dockerfile`

### Run the container

`docker run -d -p 8080:80 image-delivery-service`

If you want to run the entire project, please go to the [parent repository](https://github.com/vb-ee/discount-platform).
