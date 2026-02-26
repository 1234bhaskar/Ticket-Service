# Ticket Service

A simple **TypeScript + Express** microservice that generates **auto-incrementing random ticket IDs** using sharded PostgreSQL databases.

---

## 🚀 Features

✔ Randomly selects a shard and safely increments a ticket counter in a **transactional way**  
✔ Exposes a lightweight **HTTP API** to request generated ticket IDs

---

## 📦 Prerequisites

Before running the project, make sure you have:

- 🟢 Node.js (v18 or higher recommended)
- 📦 npm

---

## 🛠️ Setup Instructions


  1. Install dependencies:

```bash
     npm install
```
  2. Copy or edit the `.env` file with your values. Example variables used by the app:

     * PORT (default 5000)
     * Url (for logging, e.g. http://localhost)
     * SHARD_0, SHARD_1, SHARD_2 (Postgres connection strings)

  3. Build (TypeScript): npm run build
  4. Development (auto-build + run): npm run dev

### .env example

Create a `.env` file in the project root with values like the example below. Replace usernames, passwords, hosts and database names with your real values.

```bash
    PORT=5000
    URL=http://localhost

    # Postgres shard connection strings (replace credentials/hosts/db names)
    SHARD_0=postgres://user:password@localhost:5432/shard0db
    SHARD_1=postgres://user:password@localhost:5432/shard1db
    SHARD_2=postgres://user:password@localhost:5432/shard2db
```

---

## 📜 Scripts

- **npm run dev**  
  Runs the application in development mode using `tsx` with file watching.

- **npm run build**  
  Compiles TypeScript to JavaScript using `tsc` and resolves path aliases using `tsc-alias`.

- **npm start**  
  Runs the compiled production build from the `dist` folder.

---

## API

  * GET /api/getId
    * Response: { status: 'Success', randomID: number } or errors (-1) used in code to indicate failures

## Database

The service expects a `tickets` table with at least these columns:

  * id (int PRIMARY KEY)
  * start (int)
  * end (int)
  * current (int)

Notes:

  * The service selects a random row id and locks it using `FOR UPDATE` within a transaction, checks `current` vs `end`, increments `current`, then returns the previous `current`.
  * Ensure each shard connection string (SHARD_0..2) points to a database that has the tickets table and appropriate rows.
