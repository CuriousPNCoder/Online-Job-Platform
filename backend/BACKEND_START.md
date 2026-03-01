# Backend Service Start Guide

This document explains how to run the backend service locally.

## 1. Prerequisites
- Node.js 18+ (Node.js 20 recommended)
- npm 9+
- MongoDB running locally or a MongoDB Atlas connection string

## 2. Install Dependencies
From project root:

```bash
cd backend
npm install
```

## 3. Configure Environment
Create `.env` from the example file.

PowerShell (Windows):
```powershell
Copy-Item .env.example .env
```

Bash (Linux/macOS/Git Bash):
```bash
cp .env.example .env
```

Update required values in `.env`:
- `MONGODB_URI`
- `JWT_SECRET`
- `PORT` (default `5000`)
- `CORS_ORIGIN`

Generate a secure JWT secret (example using Node):

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
```

## 4. Seed Admin User (Optional but recommended)

```bash
npm run seed:admin
```

This uses `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` from `.env`.

## 5. Start Backend Service (Development)

```bash
npm run dev
```

Server starts on:
- `http://localhost:5000` (or your configured `PORT`)

Swagger links:
- `http://localhost:5000/api-docs` (Swagger UI)
- `http://localhost:5000/api-docs.json` (OpenAPI JSON payload wrapped in API response)

Expected startup log:

```txt
Server running on port 5000
API base URL: http://localhost:5000
Swagger UI: http://localhost:5000/api-docs
Swagger JSON: http://localhost:5000/api-docs.json
```

## 6. Start Backend Service (Production)

```bash
npm run build
npm start
```

## 7. Run Tests

```bash
npm test
```

## Error Handling Concept
This backend uses centralized error handling middleware in `src/middlewares/error.middleware.ts`.

Error handling flow:
- Route/controller/service throws an error.
- `ApiError` is used for controlled business errors (status code + error code + details).
- `ZodError` is converted to `400` with field-level validation details.
- Unknown errors fall back to `500 Internal server error`.

Standard error response shape:

```json
{
  "success": false,
  "message": "Error message",
  "errorCode": "OPTIONAL_CODE",
  "details": {}
}
```

Common examples:
- Validation failure (`400`): `errorCode: "VALIDATION_ERROR"`
- Unauthorized (`401`): token missing/invalid
- Forbidden (`403`): role does not have permission
- Not found (`404`): route or resource not found
- Internal error (`500`): unhandled server error

## Common Issues
- `EADDRINUSE`: Change `PORT` in `.env` or stop the process using that port.
- MongoDB connection error: Verify `MONGODB_URI` and network access/IP allowlist in Atlas.
- JWT errors: Ensure `JWT_SECRET` is set and non-empty.
