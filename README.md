# Daily Shop - Enterprise E-Commerce Platform

> A modern, highly scalable e-commerce ecosystem built with a distributed microservices backend and a high-performance Next.js frontend, inspired by modern retail chains like Shwapno.

---

## 🌟 Overview

**Daily Shop** is an enterprise-grade online shopping and inventory management platform designed to handle complex retail workflows. It features a distributed microservices backend communicating asynchronously via RabbitMQ, robust authentication, real-time cache management with Redis, multi-warehouse support, and an automated **FEFO (First-Expired, First-Out)** inventory dispatch system to manage perishable goods efficiently.

---

## 🏗️ Architecture & Tech Stack

### Frontend

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **UI Components:** Shadcn UI & Tailwind CSS

### Backend Microservices

- **Runtime:** Node.js & TypeScript
- **API Gateway:** Centralized routing and request verification
- **Database & ORM:** PostgreSQL with Prisma ORM
- **Caching & State:** Redis
- **Message Broker:** RabbitMQ (Event-driven inter-service communication)

### Services Breakdown

1. **API Gateway:** Entry point routing requests to respective microservices.
2. **Auth Service:** Secure user authentication, role-based access control, and token management.
3. **User Service:** User profile and address book management.
4. **Product Service:** Catalog management, categories, and searchable items.
5. **Inventory Service:** Multi-warehouse tracking and advanced batch management.
6. **Cart Service:** Real-time user shopping cart synchronization.
7. **Order Service:** Order lifecycle management and checkout workflows.
8. **Email Service:** Asynchronous notification handler for transactional emails.
9. **File Service:** Asset upload, media storage, and management.

---

## 🚀 Key Features

- **Multi-Warehouse Inventory:** Distribute stock across multiple fulfillment centers to optimize delivery times and shipping costs.
- **FEFO Batch Dispatch Logic:** Automatically prioritizes items with closer expiration dates for delivery to minimize waste and ensure product freshness (Shopno-style inventory handling).
- **Event-Driven Architecture:** Decoupled services communicating through RabbitMQ for reliable background processing (e.g., order placement triggering inventory deduction and email dispatch).
- **Secure & Scalable:** JWT-powered authentication, API gateway pattern, and Redis-backed caching for high availability.
- **Modern UI/UX:** Fast, accessible, and responsive interface built with Next.js and Shadcn UI.

---

## 📂 Repository Structure

- Backend Microservices: [GitHub - Daily Shop Server Micro](https://github.com/MdMahadiHasan11/daily-shop-server-micro)
- Frontend: Monitored within this repository (`/app`, `/components`, etc.)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- Redis
- RabbitMQ

### 1. Frontend Setup

Clone the repository and install dependencies:

```bash
git clone [https://github.com/MdMahadiHasan11/daily-shop.git](https://github.com/MdMahadiHasan11/daily-shop.git)
cd daily-shop
npm install
# or
yarn install
# or
pnpm install
```
