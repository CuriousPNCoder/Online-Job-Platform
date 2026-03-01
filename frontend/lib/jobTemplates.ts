export type TeamCategory = "IT" | "Marketing" | "Sales" | "HR" | "Finance" | "Operations";

type JobTemplate = {
  roles: string[];
  skills: string[];
  descriptionHint: string;
};

export const teamCategories: TeamCategory[] = ["IT", "Marketing", "Sales", "HR", "Finance", "Operations"];

export const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

export const seniorityOptions = ["Junior", "Mid-Level", "Senior", "Lead", "Manager"];

export const templatesByCategory: Record<TeamCategory, JobTemplate> = {
  IT: {
    roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "QA Engineer", "DevOps Engineer"],
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "REST API", "Git"],
    descriptionHint: "Mention product domain, tech stack, deployment workflow, and code quality expectations."
  },
  Marketing: {
    roles: ["Digital Marketing Executive", "SEO Specialist", "Content Strategist", "Performance Marketer", "Brand Manager"],
    skills: ["SEO", "Google Ads", "Meta Ads", "Analytics", "Campaign Planning", "Content Writing"],
    descriptionHint: "Include campaign goals, channels, target audience, and performance KPIs."
  },
  Sales: {
    roles: ["Sales Executive", "Inside Sales Specialist", "Account Manager", "Business Development Associate", "Regional Sales Manager"],
    skills: ["Lead Generation", "CRM", "Negotiation", "Pipeline Management", "Communication", "Closing"],
    descriptionHint: "Add sales targets, territory scope, CRM process, and client engagement responsibilities."
  },
  HR: {
    roles: ["HR Executive", "Talent Acquisition Specialist", "HR Business Partner", "L&D Coordinator", "HR Operations Analyst"],
    skills: ["Recruitment", "Employee Relations", "Onboarding", "HRMS", "Policy Management", "Interviewing"],
    descriptionHint: "State hiring volume, HR operations scope, and employee lifecycle responsibilities."
  },
  Finance: {
    roles: ["Accountant", "Financial Analyst", "Payroll Specialist", "Audit Associate", "Finance Manager"],
    skills: ["Financial Reporting", "Excel", "Budgeting", "Taxation", "Reconciliation", "Compliance"],
    descriptionHint: "Highlight reporting cycles, statutory compliance, and tools used for financial operations."
  },
  Operations: {
    roles: ["Operations Executive", "Process Analyst", "Logistics Coordinator", "Project Coordinator", "Operations Manager"],
    skills: ["Process Improvement", "Coordination", "Reporting", "Vendor Management", "SOPs", "Problem Solving"],
    descriptionHint: "Describe process ownership, coordination responsibilities, and key operational metrics."
  }
};
