# Online Job Portal Backend (Node.js + Express + TypeScript + MongoDB)

Complete REST API backend for:
- Job Seeker
- Recruiter
- Admin

## Tech Stack
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT auth + bcrypt password hashing
- Zod validation

## Folder Structure
```txt
backend/
  postman/
    Online-Job-Portal.postman_collection.json
  src/
    config/
      db.ts
      env.ts
    controllers/
      admin.controller.ts
      applications.controller.ts
      auth.controller.ts
      jobs.controller.ts
      me.controller.ts
      recruiter.controller.ts
    middlewares/
      auth.middleware.ts
      error.middleware.ts
      notFound.middleware.ts
      rateLimit.middleware.ts
      rbac.middleware.ts
      validate.middleware.ts
    models/
      Application.ts
      Job.ts
      RecruiterProfile.ts
      User.ts
    routes/
      admin.routes.ts
      applications.routes.ts
      auth.routes.ts
      index.ts
      jobs.routes.ts
      me.routes.ts
      recruiter.routes.ts
    seed/
      admin.seed.ts
    services/
      admin.service.ts
      application.service.ts
      auth.service.ts
      jobs.service.ts
      me.service.ts
      recruiter.service.ts
    tests/
      auth.test.ts
      duplicate-apply.test.ts
      job-validation.test.ts
      recruiter-authz.test.ts
      setup.ts
    types/
      common.ts
      express.d.ts
    validators/
      admin.validators.ts
      applications.validators.ts
      auth.validators.ts
      jobs.validators.ts
      me.validators.ts
      recruiter.validators.ts
    app.ts
    server.ts
  .env.example
  .gitignore
  jest.config.ts
  package.json
  tsconfig.json
```

## Environment Variables
Copy `.env.example` to `.env`:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/job-portal
JWT_SECRET=replace_with_secure_secret
PORT=5000
CORS_ORIGIN=http://localhost:3000
ADMIN_EMAIL=admin@jobportal.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=System Admin
```

## Setup & Run
```bash
npm install
npm run seed:admin
npm run dev
```

Swagger docs:
```txt
http://localhost:5000/api-docs
http://localhost:5000/api-docs.json
```

Build/start:
```bash
npm run build
npm start
```

Tests:
```bash
npm test
```

## Key Implementations
- Unique email (`User.email` unique index)
- Role enum (`jobseeker | recruiter | admin`)
- Duplicate apply blocked (service check + unique compound index on `Applications(jobId, jobSeekerId)`)
- Application status enum (`pending | shortlisted | rejected | hired`)
- Job required fields enforced by Mongoose schema
- Pagination for jobs, applicants, applications, admin list endpoints
- Filtering for jobs and applicants
- Reports summary endpoint for admin
- Login rate limiting
- Helmet + CORS
- Central error format:
```json
{
  "success": false,
  "message": "Error message",
  "errorCode": "OPTIONAL_CODE",
  "details": {}
}
```

## Endpoint List
Total APIs: `23`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

### Job Browsing
- `GET /jobs`
- `GET /jobs/:id`

### Job Seeker
- `GET /me/profile`
- `PUT /me/profile`
- `POST /jobs/:id/apply`
- `GET /me/applications`

### Recruiter
- `GET /recruiter/profile`
- `PUT /recruiter/profile`
- `POST /recruiter/jobs`
- `PUT /recruiter/jobs/:id`
- `DELETE /recruiter/jobs/:id`
- `GET /recruiter/jobs`
- `GET /recruiter/jobs/:id/applications`
- `PATCH /applications/:id/status`

### Admin
- `GET /admin/users`
- `PATCH /admin/users/:id/disable`
- `GET /admin/jobs`
- `DELETE /admin/jobs/:id`
- `GET /admin/reports/summary`

## cURL Examples
Register:
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"A","email":"a@example.com","password":"Password123","role":"jobseeker"}'
```

Login:
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"a@example.com","password":"Password123"}'
```

Create Job (recruiter):
```bash
curl -X POST http://localhost:5000/recruiter/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <RECRUITER_TOKEN>" \
  -d '{"title":"Backend Dev","description":"REST APIs with Node","skillsRequired":["Node"],"location":"Remote","salaryRange":{"min":50000,"max":80000,"currency":"USD"},"category":"Engineering","jobType":"Full-time"}'
```

Apply Job:
```bash
curl -X POST http://localhost:5000/jobs/<JOB_ID>/apply \
  -H "Authorization: Bearer <JOBSEEKER_TOKEN>"
```

Report:
```bash
curl http://localhost:5000/admin/reports/summary \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```
