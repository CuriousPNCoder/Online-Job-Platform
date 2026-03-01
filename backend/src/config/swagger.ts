export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Online Job Portal API",
    version: "1.0.0",
    description: "REST API documentation for Job Seeker, Recruiter, and Admin flows."
  },
  servers: [{ url: "http://localhost:5000" }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  tags: [
    { name: "Auth" },
    { name: "Jobs" },
    { name: "JobSeeker" },
    { name: "Recruiter" },
    { name: "Applications" },
    { name: "Admin" }
  ],
  paths: {
    "/auth/register": { post: { tags: ["Auth"], summary: "Register jobseeker/recruiter" } },
    "/auth/login": { post: { tags: ["Auth"], summary: "Login user" } },
    "/auth/me": { get: { tags: ["Auth"], summary: "Current user", security: [{ bearerAuth: [] }] } },
    "/auth/logout": { post: { tags: ["Auth"], summary: "Logout", security: [{ bearerAuth: [] }] } },

    "/jobs": { get: { tags: ["Jobs"], summary: "List jobs with filters and pagination" } },
    "/jobs/{id}": { get: { tags: ["Jobs"], summary: "Get job by ID" } },
    "/jobs/{id}/apply": {
      post: { tags: ["JobSeeker"], summary: "Apply to job", security: [{ bearerAuth: [] }] }
    },

    "/me/profile": {
      get: { tags: ["JobSeeker"], summary: "Get job seeker profile", security: [{ bearerAuth: [] }] },
      put: { tags: ["JobSeeker"], summary: "Update job seeker profile", security: [{ bearerAuth: [] }] }
    },
    "/me/applications": {
      get: { tags: ["JobSeeker"], summary: "List my applications", security: [{ bearerAuth: [] }] }
    },

    "/recruiter/profile": {
      get: { tags: ["Recruiter"], summary: "Get recruiter profile", security: [{ bearerAuth: [] }] },
      put: { tags: ["Recruiter"], summary: "Update recruiter profile", security: [{ bearerAuth: [] }] }
    },
    "/recruiter/jobs": {
      get: { tags: ["Recruiter"], summary: "List recruiter jobs", security: [{ bearerAuth: [] }] },
      post: { tags: ["Recruiter"], summary: "Create recruiter job", security: [{ bearerAuth: [] }] }
    },
    "/recruiter/jobs/{id}": {
      put: { tags: ["Recruiter"], summary: "Update recruiter job", security: [{ bearerAuth: [] }] },
      delete: { tags: ["Recruiter"], summary: "Delete recruiter job", security: [{ bearerAuth: [] }] }
    },
    "/recruiter/jobs/{id}/applications": {
      get: { tags: ["Recruiter"], summary: "List applicants for job", security: [{ bearerAuth: [] }] }
    },

    "/applications/{id}/status": {
      patch: {
        tags: ["Applications"],
        summary: "Update application status (recruiter owner/admin)",
        security: [{ bearerAuth: [] }]
      }
    },

    "/admin/users": { get: { tags: ["Admin"], summary: "List users", security: [{ bearerAuth: [] }] } },
    "/admin/users/{id}/disable": {
      patch: { tags: ["Admin"], summary: "Disable user", security: [{ bearerAuth: [] }] }
    },
    "/admin/jobs": { get: { tags: ["Admin"], summary: "List jobs", security: [{ bearerAuth: [] }] } },
    "/admin/jobs/{id}": {
      delete: { tags: ["Admin"], summary: "Delete job", security: [{ bearerAuth: [] }] }
    },
    "/admin/reports/summary": {
      get: { tags: ["Admin"], summary: "Summary report", security: [{ bearerAuth: [] }] }
    }
  }
};

export const totalApiCount = 23;
