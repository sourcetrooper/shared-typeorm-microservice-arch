# Service B – API Gateway / Proxy Service

## 📌 Description

Service B acts as an API gateway or proxy, forwarding requests to Service A for core business logic and data persistence. It exposes RESTful endpoints for users, listings, and bookings, and provides a single entry point for client applications.

## 📦 Features

- Express.js API server
- Forwards requests to Service A using Axios
- Swagger UI documentation at `/docs`
- Uses shared DTOs for type safety
- Easily extendable for additional endpoints

## 🗂 Folder Structure

```
src/
├── controllers/       # Handles HTTP logic
├── routes/            # Express routes with Swagger docs
├── services/          # Axios HTTP logic to Service A
└── index.ts           # Server bootstrap
```

## 🔧 Usage

```bash
# Run the service locally
npm install
npm start
```

> **Swagger UI:**
>
> - When running locally (npm start): http://localhost:4000/docs
> - When running in Docker: http://localhost:3001/docs

## 🥪 Endpoints

| Method | Route     | Description          |
| ------ | --------- | -------------------- |
| POST   | /users    | Create a new user    |
| GET    | /users    | List all users       |
| POST   | /listings | Create a new listing |
| GET    | /listings | List all listings    |
| POST   | /bookings | Create a new booking |
| GET    | /bookings | List all bookings    |
| GET    | /health   | Health check         |
| GET    | /docs     | Swagger UI           |

---

### 🧑‍💻 Developers

- Add or modify DTOs inside `@shared/core`.
- Add new routes/controllers/services as needed.
- Use Swagger JSDoc comments for API docs.
