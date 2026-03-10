# JobTracker API

A full-stack job application tracking system built with Spring Boot and React.

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

## Features

- 🔐 JWT Authentication (Register / Login)
- 📋 Full CRUD for job applications
- 🔄 Real-time status updates (Applied, Interview, Offer, Rejected)
- 📖 Swagger UI API documentation
- 🐳 Docker Compose for local development

## Tech Stack

**Backend**
- Java 21 + Spring Boot 4
- Spring Security + JWT
- Spring Data JPA + Hibernate
- PostgreSQL
- Docker + Docker Compose
- Swagger / OpenAPI

**Frontend**
- React 19 + TypeScript
- Tailwind CSS
- Axios
- Vite

## Architecture
```
Controller → Service → Repository → PostgreSQL
```

- **Controller** – handles HTTP requests
- **Service** – business logic
- **Repository** – database access via JPA
- **DTOs** – separate internal entities from API responses

## Getting Started

### Prerequisites
- Java 21
- Docker Desktop
- Node.js 18+

### Backend
```bash
# Start PostgreSQL
docker compose up -d

# Run Spring Boot
./mvnw spring-boot:run
```

API runs on `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | ❌ |
| POST | /api/auth/login | Login | ❌ |
| GET | /api/applications | Get all applications | ✅ |
| POST | /api/applications | Create application | ✅ |
| GET | /api/applications/{id} | Get by ID | ✅ |
| PUT | /api/applications/{id} | Update application | ✅ |
| DELETE | /api/applications/{id} | Delete application | ✅ |