# Shared Package – Entities, DTOs, and Validators

## 📦 What is this?

This package provides **shared TypeORM entities, DTOs, and validation logic** for use across all microservices in this architecture.  
It enables type-safe, DRY, and consistent data modeling for all services.

---

## 🗂 Folder Structure

```
src/
├── entities/         # TypeORM models (User, Listing, Booking)
├── dtos/             # DTOs for create/update/response
└── index.ts          # Barrel file for clean imports
```

---

## 🚀 Usage

### In a Monorepo

- Import directly using a path alias or workspace dependency:

  ```ts
  import { User, CreateUserDto } from "shared";
  ```

- Make sure your `tsconfig.json` in each service has a path alias:
  ```json
  {
    "compilerOptions": {
      "paths": {
        "shared": ["../../packages/shared/src"]
      }
    }
  }
  ```

### As a Published Package

- Publish to your registry:

  ```bash
  npm version patch   # or minor/major
  npm publish
  ```

- Install in your service:
  ```bash
  npm install @yourorg/shared
  ```

---

## 🧑‍💻 Development

### Build

```bash
npm install
npm run build
```

### Lint

```bash
npm run lint
```

---

## 📝 Changelog & Versioning

- All changes must be documented in [`CHANGELOG.md`](./CHANGELOG.md).
- After updating, bump the version:
  ```bash
  npm version patch   # or minor/major
  ```
- Push with tags:
  ```bash
  git push && git push --tags
  ```

---

## 📐 Exports

### Entities

- `User`
- `Listing`
- `Booking`

### DTOs

- `CreateUserDto`, `UserResponseDto`
- `CreateListingDto`, `ListingResponseDto`
- `CreateBookingDto`, `BookingResponseDto`

### Example

```ts
import { User, CreateUserDto, UserResponseDto } from "shared";
```

---

## 🧩 Entity Model

### User

| Field    | Type                | Notes       |
| -------- | ------------------- | ----------- |
| id       | number              | PK          |
| name     | string              |             |
| email    | string              | unique      |
| role     | 'owner' \| 'renter' | enum        |
| listings | Listing[]           | one-to-many |
| bookings | Booking[]           | one-to-many |

### Listing

| Field         | Type      | Notes       |
| ------------- | --------- | ----------- |
| id            | number    | PK          |
| title         | string    |             |
| description   | string    |             |
| location      | string    |             |
| pricePerNight | number    |             |
| owner         | User      | many-to-one |
| bookings      | Booking[] | one-to-many |

### Booking

| Field    | Type    | Notes       |
| -------- | ------- | ----------- |
| id       | number  | PK          |
| fromDate | string  | date        |
| toDate   | string  | date        |
| status   | string  | enum        |
| user     | User    | many-to-one |
| listing  | Listing | many-to-one |

---

## 🛡️ Validation

DTOs use `class-validator` decorators for runtime validation.  
See `src/dtos/*.ts` for details.

---

## 📝 License

MIT

---
