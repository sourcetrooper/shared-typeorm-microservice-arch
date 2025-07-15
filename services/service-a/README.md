# Service A – Core Backend Service

## 📌 Description

Service A is responsible for:

- Managing data persistence using **TypeORM + MySQL**
- Exposing RESTful endpoints for `users`, `listings`, and `bookings`
- Running migrations and seeding data during setup

This service **interacts directly with the database** and implements full CRUD for the core domain models (`User`, `Listing`, `Booking`).

## 📦 Features

- Express.js API server
- TypeORM-based DB access layer
- Shared entities and DTOs from `@shared/core`
- Migrations and database seeding logic
- Validation and serialization via TypeScript types
- Organized by controllers, services, and routes
- Returns responses as DTOs (Data Transfer Objects) to ensure a clean, stable API contract

## 🗂 Folder Structure

```
src/
├── controllers/       # Business logic (User, Listing, Booking)
├── routes/            # Express routes for each resource
├── services/          # Service layer for DB logic
├── data-source.ts     # TypeORM DataSource config
├── seed.ts            # Seeding script
└── index.ts           # Server bootstrap
```

## 🔧 Usage

```bash
# Run the service
npm install
npm run build
npm run migration:run
npm run seed
npm start
```

## 🥪 Endpoints

| Method | Route         | Description          |
| ------ | ------------- | -------------------- |
| GET    | /health       | Health check         |
| GET    | /users        | List all users       |
| POST   | /users        | Create a new user    |
| GET    | /users/:id    | Get user by ID       |
| PUT    | /users/:id    | Update user by ID    |
| DELETE | /users/:id    | Delete user by ID    |
| GET    | /listings     | List all listings    |
| POST   | /listings     | Create a new listing |
| GET    | /listings/:id | Get listing by ID    |
| PUT    | /listings/:id | Update listing by ID |
| DELETE | /listings/:id | Delete listing by ID |
| GET    | /bookings     | List all bookings    |
| POST   | /bookings     | Create a new booking |
| GET    | /bookings/:id | Get booking by ID    |
| PUT    | /bookings/:id | Update booking by ID |
| DELETE | /bookings/:id | Delete booking by ID |

---

### 🧑‍💻 Developers

- Add or modify entities and DTOs inside `@shared/core`.
- Add or update controllers/services/routes in `src/`.
- Run `npm run migration:generate` to sync DB schema.
- Seed data using `npm run seed`.
- Use DTOs and validation for all create/update endpoints.
