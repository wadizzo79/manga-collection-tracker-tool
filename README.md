# Manga Collection Tracker

A web application for managing and tracking physical manga collections, built using React, JavaScript, Node.js, and Express.js.

The application allows users to search for manga titles, add them to their collection, select different editions, and track the volumes they own.

The project is currently in development, with a focus on integrating external data sources to provide accurate publication and volume information across different manga publishers.

## Features

- **Manga Search:** Search for manga titles using the AniList API.
- **Collection Management:** Add and remove manga from a personal collection.
- **Edition Selection:** Select between available manga editions, including singles and omnibus editions.
- **Volume Tracking:** Record collected volumes individually or using volume ranges.
- **Publication Data Integration:** Retrieve manga and volume information from external APIs.

## Development Status

This project is currently under development.

Current priorities include:
- Improving the accuracy of volume and edition information.
- Expanding publication data coverage across different publishers.
- Refining data handling and collection management.
- Implementing persistent storage for collection data.

## Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML & CSS
- Vite

**Backend**
- Node.js
- Express.js

**APIs**
- AniList API (GraphQL) – Manga search and general information
- Open Library API (REST) – Book and publication information

**Development Tools**
- Git & GitHub
- Visual Studio Code

## Installation and Setup

### Prerequisites

- Node.js and npm
- Git

### Running the Application

1. Clone the repository and open the project in your code editor.

2. Open a terminal in the frontend directory (the folder containing the Vite `package.json`).

Install dependencies:

    npm install

Start the frontend development server:

    npm run dev

3. Open a second terminal in the backend directory (the folder containing the Express `package.json`).

Install dependencies:

    npm install

Start the backend server:

    npm run dev

4. Open the local URL provided by Vite in your browser.

Both the frontend and backend servers should be running for the application to work correctly.
