# Dragon Ball Super Card Game Fusion World API

This is the backend service for the Dragon Ball Super Card Game Fusion World application. It handles user authentication, card management, deck building, and more.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/api-dbscg-fw.git
   cd api-dbscg-fw
   ```
2. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a .env file in the root directory with the following variables:
   ```
   PORT=3000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

## Running the Application

Start the server:

```
npm start
```

For development with nodemon:

```
npm run dev
```

## API Documentation

API documentation is available via Swagger. After starting the server, navigate to http://localhost:3000/api-docs to view the documentation.

## Folder Structure
```
src/
|-- controllers/
|-- domain/
| |-- models/
| |-- interfaces/
| |-- services/
|-- infrastructure/
| |-- database/
| |-- repositories/
|-- routes/
|-- app.js
|-- config.js
|-- index.js
```

## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Create a new Pull Request.