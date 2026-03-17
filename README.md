# Xepci Rent Full Stack Starter

This package contains:
- `client/`: React + Vite frontend adapted from the Lovable prototype
- `server/`: Express + Prisma backend starter

## Quick start

### 1. Frontend
Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Backend
Create `server/.env` from `server/.env.example`.

### 3. Install dependencies

```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 4. Run Prisma and seed

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
node prisma/seed.js
```

### 5. Start both apps

```bash
cd ..
npm run dev
```
