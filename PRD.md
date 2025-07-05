# 🧠 Case Study: Shared Models and Service Decoupling in a TypeORM + MySQL Backend

## 👨‍💻 Role

**Senior Full-Stack Developer**

---

## 📘 Context

You are working on a large backend system built with **Node.js + TypeScript**, using **TypeORM** to interact with a **MySQL** database.

- Currently, all services use TypeORM entity models for both runtime logic and type definitions.
- The project is monolithic but is being gradually broken into **independent microservices**.
- The goal is to **avoid duplicating** entity definitions and business logic across these services, while maintaining **type safety**, **decoupling**, and long-term **scalability**.

---

## 🎯 Your Mission

Design a strategy to **share models and business logic** across standalone services **without duplicating code**, while also preparing the codebase for future scalability.

Then, implement a **working prototype** that reflects your architectural approach.

---

## 🧩 Requirements

### 📐 Part 1: Architectural Design

You must present your solution for the following:

1. **Shared Code Structure**

   - How will you organize entity models, DTOs, and validation logic?

2. **Entity Synchronization**

   - How will you ensure all services stay up-to-date with shared entities?

3. **Migrations and Schema Evolution**

   - How will you handle database migrations and schema updates across services?

4. **Service Decoupling**
   - How will you protect against tight coupling between services?

---

### 🛠️ Part 2: Technical Implementation

Implement a **minimum working solution** that demonstrates your strategy.

#### 🔧 Deliverables

1. **Core Shared Module**

   - Your choice of structure (e.g., npm-style package, folder import, etc.)

2. **Main Application (Service A)**

   - Node.js / Express service using TypeORM + MySQL
   - Includes a working **migration** and **seeding** example

3. **Standalone Service (Service B)**

   - A second app that consumes the same shared models
   - Uses the **same or a different database**
   - Demonstrates **model compatibility** across services

4. **README Documentation**
   - Explain your folder structure, tooling, and how to add new models without breaking other services

---

## 🧪 Bonus Points (Optional)

- ✅ **TypeScript Separation** between DB entities and transport types (DTOs)
- ✅ Support for both **monorepo** and **polyrepo** structures
- ✅ Handle **versioning** of shared code
- ✅ Setup **CI (GitHub Actions)** to lint, test, and build the shared code

---
