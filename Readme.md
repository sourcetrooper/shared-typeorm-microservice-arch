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

## 🧪 Bonus Goals (Work in Progress)

- GitHub Actions CI: build/test shared code
- TypeScript separation: DB entities vs Transport DTOs
- Shared validation logic using `class-validator`
- Unit test examples for services
- API-first design: OpenAPI / Swagger setup

## 📝 License

MIT

---
