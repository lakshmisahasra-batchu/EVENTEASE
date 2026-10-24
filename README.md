# EventEase — Campus Workshop Registration

EventEase is a web application for discovering campus workshops and registering for events through a simple, interactive interface.

## Features

- Browse upcoming campus workshops.
- Filter workshops by Technology, Design, and Tools.
- View workshop dates, times, venues, descriptions, and seat availability.
- Register for workshops using a name and email address.
- Explore campus clubs and their social media links.
- Enjoy a modern interface with colorful workshop cards.

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB integration planned

## Project Structure

```text
eventease/
├── server/
│   └── server.js
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Prerequisites

- Node.js and npm
- Visual Studio Code or another code editor

## Installation and Setup

### 1. Install dependencies

Open a terminal in the project root and run:

```bash
npm install
```

### 2. Start the backend

Open a terminal and run:

```bash
node server/server.js
```

The backend runs at `http://localhost:3001`.

Health check: `http://localhost:3001/api/health`

Keep this terminal open.

### 3. Start the frontend

Open a second terminal in the project root and run:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

Keep both servers running while testing the application.

## API

### Register for a workshop

- **Method:** `POST`
- **Endpoint:** `/api/workshops/:id/register`

Example request body:

```json
{
  "name": "Student Name",
  "email": "student@example.com"
}
```

Available workshop IDs:

- `web-dev`
- `ui-ux`
- `git-github`

The backend validates registration details, checks seat availability, and returns a success response with the remaining seats.

## Database Status

MongoDB integration is not yet complete. Currently, workshop availability and registration records are stored in server memory and reset when the backend restarts.

## Future Enhancements

- Integrate MongoDB for persistent registration storage.
- Add a registration management dashboard.
- Introduce student authentication and registration history.
- Improve registration validation and error handling.

---

**Project:** EventEase  
**Purpose:** Campus workshop discovery and registration  
**Current status:** React frontend and Express backend implemented; database integration pending.
