# Nooro Todo API

Backend service for the **Todo List App** built with **Express.js**, **TypeScript**, **Prisma**, and **MySQL**.

---

## 🚀 Features
- REST API for managing tasks
- CRUD operations:
  - `GET /tasks`
  - `GET /tasks/:id`
  - `POST /tasks`
  - `PUT /tasks/:id`
  - `DELETE /tasks/:id`
- Prisma ORM for database access
- MySQL (via Docker or local install)
- Written in **TypeScript** for type safety

---

## 🛠 Tech Stack
- Node.js + Express.js
- TypeScript
- Prisma ORM
- MySQL
- Docker (optional for local DB)

---

## 🔑 Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (to run MySQL in a container)

---

## 📦 Setup

### 1. Clone & Install
```bash
git clone https://github.com/SeaForeEx/nooro-todo-api.git
cd nooro-todo-api
npm install
```

### 2) Configure environment variables
Create .env (copy from .env.example if present) with:
```bash
PORT=4000
CORS_ORIGIN=http://localhost:3000
DATABASE_URL="mysql://root:root@localhost:3306/todo"
```

### 3) Confirm docker-compose.yml and start MySQL
In the project root, confirm that there is a file called docker-compose.yml with this content:

```bash
services:
  db:
    image: mysql:latest
    container_name: todo_mysql
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: todo
      ports:
        - "3306:3306"
      volumes:
        - db:/var/lib/mysql

volumes:
  db: {}
```

If there isn't, then create a docker-compose.yml file and paste the code above in there.

Then start the container:
```bash
docker compose up -d
```

### 4) Initialize Prisma (generate client + run migrations)
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5) Run the API in development mode
```bash
npm run dev
```
Once running, the API will be available at:
```bash
http://localhost:4000
```
