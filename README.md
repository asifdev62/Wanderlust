# 🌍 Wanderlust — Travel & Booking Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<p align="center">
  <strong>Discover Places. Plan Trips. Create Memories.</strong>
  <br />
  A modern full-stack travel destination and booking application.
</p>

<p align="center">
  <a href="https://wanderlust-gamma-pink.vercel.app/">
    <img src="public/homepage.png" alt="Wanderlust Application Preview" width="100%" />
  </a>
</p>

<p align="center">
  <a href="https://wanderlust-gamma-pink.vercel.app/"><strong>🌐 Live Demo</strong></a>
  &nbsp; • &nbsp;
  <a href="https://github.com/asifdev62/Wanderlust"><strong>Frontend Source</strong></a>
  &nbsp; • &nbsp;
  <a href="https://github.com/asifdev62/wanderlust-server"><strong>Backend Source</strong></a>
</p>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Application Preview](#-application-preview)
- [Project Architecture](#-project-architecture)
- [API Documentation](#-api-documentation)
- [Database Structure](#-database-structure)
- [Authentication & Security](#-authentication--security)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Future Improvements](#-future-improvements)
- [What I Learned](#-what-i-learned)
- [Author](#-author)

## 📖 Overview

**Wanderlust** is a full-stack travel destination and booking web application designed to help users explore exciting destinations and manage their travel plans.

The platform provides an intuitive interface where users can discover destinations, explore detailed travel information, browse different categories, add destinations, and submit travel bookings.

Built with **Next.js, TypeScript, Express.js, and MongoDB**, Wanderlust demonstrates the integration of a modern frontend with a RESTful backend and database.

### 🎯 Project Goals

- Build a complete full-stack web application.
- Create a responsive and user-friendly travel experience.
- Develop RESTful APIs using Express.js.
- Integrate MongoDB for persistent data storage.
- Implement authentication and secure API communication.
- Deploy frontend and backend services.

## ✨ Key Features

| Feature | Description |
|---|---|
| 🌍 Destination Discovery | Explore travel destinations from different countries. |
| 🗺️ Destination Details | View destination descriptions, prices, and durations. |
| 🧭 Categories | Discover destinations by travel categories. |
| ➕ Add Destination | Submit new destination information. |
| 🎫 Travel Booking | Submit bookings for selected destinations. |
| 📅 Booking Management | Access travel booking information. |
| 🔐 User Authentication | Authenticate users with Better Auth. |
| 🛡️ JWT Integration | Support token-based authentication. |
| 📱 Responsive Design | Access the application on different screen sizes. |
| 🔗 REST API | Connect frontend functionality with backend services. |
| 🗄️ MongoDB Integration | Store destination and booking information. |

## 🛠️ Technology Stack

### Frontend

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind" alt="Frontend Technologies" />
</p>

- **Next.js** — Full-stack React framework and application routing.
- **React** — Component-based user interface.
- **TypeScript** — Type-safe application development.
- **Tailwind CSS** — Responsive and modern styling.
- **Better Auth** — User authentication.
- **Lucide React** — Interface icons.

### Backend

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" alt="Backend Technologies" />
</p>

- **Node.js** — JavaScript runtime.
- **Express.js** — Backend server and REST API development.
- **MongoDB** — NoSQL database.
- **JWT** — Token-based authentication.
- **dotenv** — Environment configuration.
- **CORS** — Cross-origin resource sharing.

### Development & Deployment

<p>
  <img src="https://skillicons.dev/icons?i=git,github,vscode,vercel" alt="Development Tools" />
</p>

- Git & GitHub
- Visual Studio Code
- Vercel

## 🖥️ Application Preview

### Homepage

<p align="center">
  <img src="public/homepage.png" alt="Wanderlust Homepage" width="100%" />
  <em>Wanderlust — Discover your next destination.</em>
</p>

### Main Application Modules

| Module | Purpose |
|---|---|
| Home | Explore the travel platform. |
| Destinations | Browse available destinations. |
| Add Destination | Add destination information. |
| My Bookings | Access booking-related information. |
| Admin | Administrative application section. |
| Authentication | Sign in and create an account. |

## 🏗️ Project Architecture

Wanderlust follows a separate frontend and backend architecture.

```text
                 ┌──────────────────────┐
                 │       User           │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Next.js Frontend   │
                 │   React + TypeScript │
                 └──────────┬───────────┘
                            │
                      REST API Requests
                            │
                            ▼
                 ┌──────────────────────┐
                 │   Express.js Server │
                 │      Node.js         │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │      MongoDB         │
                 │  Destination/Booking │
                 └──────────────────────┘
```

### Repository Links

| Repository | Description |
|---|---|
| [Wanderlust Frontend](https://github.com/asifdev62/Wanderlust) | Next.js client application |
| [Wanderlust Backend](https://github.com/asifdev62/wanderlust-server) | Express.js server and API |

## 🔌 API Documentation

The Express.js backend provides REST API endpoints for destination and booking operations.

### Destination APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/add-destination` | Create a new destination |
| `GET` | `/destination` | Get all destinations |
| `GET` | `/destination/:id` | Get destination by ID |

### Booking API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/booking` | Create a travel booking |

<sub>Note: These are the main documented endpoints. Refer to the backend repository for the latest implementation.</sub>

## 🗄️ Database Structure

Wanderlust uses **MongoDB** to manage application data.

**Database:** `wanderlast`

### Collections

**1. destination**

Stores travel destination information.

Possible fields include:

- Destination name
- Country
- Category
- Price
- Duration
- Departure date
- Image URL
- Description

**2. bookings**

Stores travel booking records.

Booking information is managed by the backend according to the booking implementation.

## 🔐 Authentication & Security

Authentication is integrated using **Better Auth**, with JWT-based authentication support.

Key security considerations:

- Better Auth for user authentication.
- JWT integration for token-based API communication.
- Cookie-based session caching.
- Protected application resources.
- Environment variables for sensitive configuration.
- Backend request validation.
- CORS configuration for frontend and backend communication.

## 🚀 Installation & Setup

Follow the instructions below to run Wanderlust on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/asifdev62/Wanderlust.git
```

```bash
cd Wanderlust
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Frontend Environment

Create a `.env.local` file in the frontend root directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Add any additional environment variables required by your authentication setup.

### 4. Start the Frontend

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:3000
```

### 5. Clone the Backend Repository

Open another terminal:

```bash
git clone https://github.com/asifdev62/wanderlust-server.git
```

```bash
cd wanderlust-server
```

### 6. Install Backend Dependencies

```bash
npm install
```

### 7. Configure Backend Environment

Create a `.env` file in the backend root directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Replace the MongoDB placeholder with your actual connection string and configure any additional required variables.

### 8. Start the Backend

If a development script exists:

```bash
npm run dev
```

Otherwise, use the entry-point command defined in your backend project. For example:

```bash
node index.js
```

Backend URL:

```text
http://localhost:5000
```

<sub>Keep your actual credentials, database connection strings, and authentication secrets private. Never commit `.env` files to GitHub.</sub>

## ⚙️ Environment Variables

### Frontend — `.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

### Backend — `.env`

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |

Configure additional authentication-related variables according to your actual implementation.

## 🔮 Future Improvements

- Advanced destination search and filtering.
- Price-based destination sorting.
- Improved booking management.
- Booking cancellation.
- User profile management.
- Enhanced administrative dashboard.
- Better loading and error states.
- Additional travel guides and destination content.

## 🎓 What I Learned

Working on Wanderlust helped me develop practical skills in:

- Building full-stack applications with Next.js and Express.js.
- Creating and integrating REST APIs.
- Managing application data with MongoDB.
- Implementing authentication with Better Auth.
- Working with JWT-based authentication.
- Connecting independent frontend and backend projects.
- Managing environment variables.
- Deploying web applications with Vercel.
- Understanding real-world application architecture.

## 👨‍💻 Author

<p align="center">
  <strong>Asif Ali</strong>
  <br />
  Full-Stack Web Developer
  <br /><br />
  <a href="https://github.com/asifdev62">
    <img src="https://img.shields.io/badge/GitHub-asifdev62-181717?style=for-the-badge&logo=github" alt="GitHub" />
  </a>
  <a href="https://github.com/asifdev62/Wanderlust">
    <img src="https://img.shields.io/badge/Frontend-Wanderlust-blue?style=for-the-badge&logo=next.js" alt="Frontend" />
  </a>
  <a href="https://github.com/asifdev62/wanderlust-server">
    <img src="https://img.shields.io/badge/Backend-Express.js-green?style=for-the-badge&logo=express" alt="Backend" />
  </a>
</p>

---

<p align="center">
  <strong>✈️ Explore More. Travel Further. Create Memories.</strong>
  <br />
  <br />
  <a href="https://wanderlust-gamma-pink.vercel.app/">
    <img src="https://img.shields.io/badge/Explore%20Wanderlust-Visit%20Live%20Website-D6A85F?style=for-the-badge&logo=vercel&logoColor=white" alt="Explore Wanderlust" />
  </a>
  <br />
  <br />
  <sub>Designed & Developed with ❤️ by Asif Ali</sub>
</p>
