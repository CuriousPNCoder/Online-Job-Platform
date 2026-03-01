# Online Job Portal Frontend

Production-style frontend built with Next.js App Router + TypeScript + Tailwind + React Query.

## Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- TanStack React Query
- Axios
- React Hook Form + Zod
- Jest + React Testing Library

## Auth Strategy
This frontend uses secure browser storage (`localStorage`) for JWT token and user payload.
- token key: `ojp_token`
- user key: `ojp_user`

## Environment Variables
Create `.env.local` from `.env.example`.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## Run
```bash
cd frontend
npm install
npm run dev
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

## Route Summary
Public:
- `/`
- `/login`
- `/register`
- `/jobs`
- `/jobs/:id`

Job Seeker:
- `/jobseeker/dashboard`
- `/jobseeker/profile`
- `/jobseeker/jobs`
- `/jobseeker/jobs/:id`
- `/jobseeker/applications`

Recruiter:
- `/recruiter/dashboard`
- `/recruiter/company-profile`
- `/recruiter/jobs`
- `/recruiter/jobs/new`
- `/recruiter/jobs/:id/edit`
- `/recruiter/jobs/:id/applicants`

Admin:
- `/admin/dashboard`
- `/admin/users`
- `/admin/jobs`
- `/admin/reports`

## API Contract Mapping
Base URL is `NEXT_PUBLIC_API_BASE_URL`.

Auth:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

Jobs:
- `GET /jobs`
- `GET /jobs/:id`
- `GET /recruiter/jobs`
- `POST /recruiter/jobs`
- `PUT /recruiter/jobs/:id`
- `DELETE /recruiter/jobs/:id`

Applications:
- `POST /jobs/:id/apply`
- `GET /me/applications`
- `GET /recruiter/jobs/:id/applications`
- `PATCH /applications/:id/status`

Admin:
- `GET /admin/users`
- `PATCH /admin/users/:id/disable`
- `GET /admin/jobs`
- `DELETE /admin/jobs/:id`
- `GET /admin/reports/summary`

## RBAC + Guarding
- `ProtectedRoute` checks authentication and role access on protected pages.
- Unauthorized role access redirects user to their own role dashboard with an error toast.
- Next middleware exists for request header wiring (`middleware.ts`) and can be extended for stricter edge checks.

## Folder Structure
```txt
frontend/
  app/
    (protected)/
      admin/
      jobseeker/
      recruiter/
    jobs/
    login/
    register/
    globals.css
    layout.tsx
    page.tsx
  components/
    applications/
    auth/
    jobs/
    layout/
    providers/
    ui/
  lib/
    api/
    validation/
    constants.ts
    rbac.ts
    types.ts
  __tests__/
  middleware.ts
```
