# Shared TypeORM Microservice Architecture

A shared architecture example showing how a single shared TypeORM package can be used across multiple services in a scalable, TypeScript-based backend system.

## 🧩 Overview

This project demonstrates:

- ✅ Code-first database modeling with TypeORM
- ✅ Sharing entity models, DTOs, and validators across multiple services
- ✅ Clean separation of concerns for long-term microservice scalability
- ✅ Optional Docker + CI-friendly structure

## 📦 Structure

```
shared-typeorm-microservice-arch/
├── packages/
│   └── shared/              # Shared models, DTOs, validators (like NuGet lib)
├── services/
│   ├── service-a/           # Main app - runs migrations & seeding
│   └── service-b/           # Secondary app - reads data, uses shared logic
├── docker-compose.yml       # Multi-service orchestration
├── README.md
```

## 📐 Monorepo / Polyrepo Support

- In a **monorepo**, the shared package is imported via a relative path.
- In a **polyrepo**, the shared folder can be published as an npm package (`@yourorg/shared`) and versioned independently.

## 📦 Shared Versioning and Reuse

The shared package is fully versioned (package.json) and can be reused across services.
You can bump versions with:

```bash
npm version patch # or minor / major
```

Later, this package can be published to an internal or public npm registry.
Services can consume different versions if needed:

```bash
npm install shared@1.0.1
```

Note:

- Remove local install logic and path aliases from `tsconfig.json`
- Update package.json to use the npm version of `@your-scope/shared`
- Clean up Dockerfiles by removing manual COPY and npm install `./shared` steps

## 🚀 Getting Started

```bash
# Start all services (DB, Service A, Service B)
docker-compose up --build
```

You can also run each service individually by navigating into its folder:

```bash
# Example: Run service-a
cd services/service-a
npm install
npm run start
```

> **Note:** If you start Service A outside Docker, you must have a MySQL server running and accessible at the configured host/port (default: `localhost:3306`), with the correct credentials and database name (`shared_arch`).

## Sahred Data Model

🧍 User
id: number (PK)
name: string
email: string (unique)
role: enum → 'owner' | 'renter'
listings: Listing[] (one-to-many)
bookings: Booking[] (one-to-many)
🏠 Listing
id: number (PK)
title: string
description: string
location: string
pricePerNight: number
owner: User (many-to-one)
bookings: Booking[] (one-to-many)
📅 Booking
id: number (PK)
fromDate: string (date)
toDate: string (date)
status: string (default: confirmed)
user: User (many-to-one)
listing: Listing (many-to-one)

## 🧠 Architecture Strategy & Case Study Q&A

---

### 1. How will you structure shared code (e.g., entity models, DTOs, validation logic)?

We use a `packages/shared` package that contains:

- **Entities** → `src/entities` (TypeORM models like `User`, `Listing`, `Booking`)
- **DTOs** → `src/dtos` (e.g., `CreateUserDTO`, `CreateBookingDTO`)
- **Validation logic** → via decorators from `class-validator` on the DTOs
- A **barrel file** (`index.ts`) to expose all shared items cleanly

This ensures type safety, code reuse, and clean separation of concerns.

---

### 2. How will you ensure entities stay in sync between services?

All services import shared models via:

- **Monorepo**: local path (e.g., `import { User } from '../../packages/shared'`)
- **Polyrepo**: versioned internal NPM package (`@shared/core@1.0.2`)

Entities remain in sync by:

- Bumping version numbers after updates
- Keeping changelog
- Updating only when each service is ready (version isolation)

---

### 3. How will you handle migrations and database schema evolution across services?

- Migrations live inside **Service A** (not the shared package)
- Shared only contains entities, not migrations
- Service A is responsible for running all DB migrations

This avoids migration conflicts between services and keeps schema ownership clear.
If another service (like B) needs to update schema, coordination is needed.

---

### 4. How will you protect against tight coupling between services?

- Services only depend on the shared **models, DTOs, and types**, never logic
- No direct service-to-service calls (communication via API or message queues)
- Shared code is versioned and consumed as a package, not live linked

This keeps services independently deployable, testable, and evolvable.

---

### 5. How do you add new models without breaking other services?

1. Create entity in `src/entities`
2. Optionally add matching DTO in `src/dtos`
3. Update `index.ts` (barrel file)
4. Run `npm run build`
5. Update **CHANGELOG.md** (BEFORE version bump)
6. Run `npm version patch` / `minor` / `major`
7. Run `git push && git push --tags`

Services can then update shared dependency only when ready. No breaking changes unless they explicitly upgrade.

---

## 📝 License

MIT

---
