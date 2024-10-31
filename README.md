# URL Shortener with Redis and Docker
This project is a simple URL shortener application that uses Redis to store shortened URLs with data persistence and expiry. The URLs expire after 2 days, providing a lightweight and temporary URL redirection service.


## Features
- **URL Expiration**: Each shortened URL expires after 2 days, automatically removing it from the database.
- **Custom Aliases**: Users can create a custom alias for their shortened URLs, subject to validation rules.
- **Rate Limiting**: Implemented using express-rate-limit to restrict the number of requests to the URL generation endpoint, preventing abuse.


## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Project Structure

- **Dockerfile**: Sets up the Docker container for the application.
- **docker-compose.yml**: Configures multi-container Docker applications with Redis and the app.
- **src/**: Contains the application code.
- **index.js**: The main server file.

## Prerequisites

- **Docker**: Make sure Docker is installed on your system. [Install Docker](https://docs.docker.com/get-docker/)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd <project_directory>

## Running the Project

1. **Build and start the Docker containers**:
   docker-compose up --build
2. **Access the application**:
   The app will run on http://localhost:3000
3. **Stopping the application**:
   docker-compose down

## Usage
After starting the app, use a tool like Postman to interact with the API.

## API Endpoints
1. **Generate Short URL**
   - Endpoint: /url/shorten
   - Method: POST
   - Body: {
             "url": "https://example.com",
             "customAlias": "optional-custom-alias"
           }
   - Response: Returns the generated short URL

2. **Redirect Short URL**
   - Endpoint: /url/:shortUrl (This shortUrl is a value of id that you have received while generating short URL.)
   - Method: GET
   - Response: Redirects to the original URL if found, otherwise returns a 404 error.(try the full url on Browser.)

3. **Get Statistics**
   - Endpoint: /url/stats/:shortUrl (This shortUrl is a value of id that you have received while generating short URL.)
   - Method: GET
   - Response: Returns the number of times a URL has been accessed and access timestamps.
