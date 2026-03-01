import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function LandingPage(): JSX.Element {
  const companyLogos = [
    { name: "TechNova", src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=600&q=80" },
    { name: "CloudPeak", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" },
    { name: "FinAxis", src: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80" },
    { name: "DataPulse", src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80" }
  ];

  const companyPhotos = [
    {
      title: "TechNova Campus",
      subtitle: "Engineering and product teams",
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "CloudPeak Hiring Hub",
      subtitle: "Interview and assessment space",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "FinAxis Recruiter Panel",
      subtitle: "Fast-track recruiter collaboration",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80",
      logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const trustStats = [
    { label: "Verified Employers", value: "1,200+" },
    { label: "Active Openings", value: "8,500+" },
    { label: "Successful Hires", value: "42,000+" },
    { label: "Average Response Time", value: "< 48 hrs" }
  ];

  const processSteps = [
    {
      title: "1. Create Verified Profile",
      text: "Job seekers and recruiters onboard with validated form checks and role-specific fields."
    },
    {
      title: "2. Apply or Shortlist",
      text: "Applications are tracked in one flow, and recruiters can update statuses in real time."
    },
    {
      title: "3. Track Every Update",
      text: "From pending to hired, status and remarks are visible so nobody is left guessing."
    }
  ];

  const faqs = [
    {
      q: "Are jobs and recruiters verified?",
      a: "Yes. Employer accounts are reviewed and users can only access role-allowed features."
    },
    {
      q: "Can I track my application status?",
      a: "Yes. You can view complete history and status updates for every application."
    },
    {
      q: "How is user data protected?",
      a: "The platform uses JWT authentication, validation rules, and access controls across dashboards."
    }
  ];

  const hiringCategories = [
    "Software & IT",
    "Sales & Marketing",
    "Finance & Operations",
    "Design & Product",
    "Customer Success",
    "HR & Talent"
  ];

  const resources = [
    {
      title: "Resume Optimization Guide",
      text: "Build stronger profiles with practical resume and portfolio recommendations."
    },
    {
      title: "Interview Preparation Checklist",
      text: "Step-by-step preparation framework to improve screening and final-round confidence."
    },
    {
      title: "Recruiter Hiring Playbook",
      text: "Structured process for role definition, candidate review, and status communication."
    }
  ];

  const testimonials = [
    {
      quote:
        "I moved from internship to full-time in 3 weeks. The status tracking and recruiter updates were clear at every step.",
      name: "Ananya S.",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote:
        "The applicant pipeline is clean and fast. We shortlist and update candidates in minutes instead of using spreadsheets.",
      name: "Rahul K.",
      role: "Talent Lead, TechNova",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote:
        "Admin reporting gives us real visibility on jobs, user activity, and hiring outcomes without manual compilation.",
      name: "Meera D.",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="page-wrap space-y-8">
      <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-500 p-10 text-white shadow-card">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-100">Online Job Portal</p>
        <h1 className="mt-2 text-4xl font-bold">Find Jobs. Hire Faster. Track Everything.</h1>
        <p className="mt-3 max-w-2xl text-brand-50">
          Trusted platform for Job Seekers, Recruiters, and Admins with transparent workflows, secure access, and live
          status tracking.
        </p>
        <div className="mt-6 flex gap-3">
          <Link className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-700" href="/register">
            Create Account
          </Link>
          <Link className="rounded-md border border-white px-4 py-2 text-sm font-semibold" href="/jobs">
            Browse Jobs
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((item) => (
          <Card key={item.label}>
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-bold text-brand-800">{item.value}</p>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-brand-900">Trusted by hiring teams</h2>
          <p className="text-sm text-slate-500">Verified companies actively posting jobs</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {companyLogos.map((logo) => (
            <img
              key={logo.name}
              className="h-28 w-full rounded-xl border border-brand-100 bg-white p-2 object-cover"
              src={logo.src}
              alt={`${logo.name} company`}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-900">Inside our hiring network</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {companyPhotos.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-xl border border-brand-100 bg-white">
              <img className="h-44 w-full object-cover" src={item.image} alt={item.title} />
              <div className="flex items-center gap-3 p-3">
                <img className="h-10 w-10 rounded-md border border-brand-100 bg-white p-1 object-cover" src={item.logo} alt={`${item.title} logo`} />
                <div>
                  <p className="text-sm font-semibold text-brand-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <h3 className="text-lg font-semibold text-brand-900">Job Seeker</h3>
          <p className="mt-2 text-sm text-slate-600">Build profile, apply to jobs, and track statuses.</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-brand-900">Recruiter</h3>
          <p className="mt-2 text-sm text-slate-600">Create jobs, manage applicants, and update application outcomes.</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold text-brand-900">Admin</h3>
          <p className="mt-2 text-sm text-slate-600">Moderate users/jobs and monitor platform reports.</p>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-900">What users say</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name}>
              <p className="text-sm italic text-slate-700">"{item.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img className="h-12 w-12 rounded-full border border-brand-100 bg-brand-50" src={item.image} alt={`${item.name} profile`} />
                <div>
                  <p className="font-semibold text-brand-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-200 bg-white p-6 shadow-card">
        <h2 className="text-2xl font-bold text-brand-900">Why this platform is trustworthy</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p className="rounded-lg bg-brand-50 p-3 text-sm text-slate-700">Role-based access for job seekers, recruiters, and admins.</p>
          <p className="rounded-lg bg-brand-50 p-3 text-sm text-slate-700">Validated forms and user-friendly error messaging across workflows.</p>
          <p className="rounded-lg bg-brand-50 p-3 text-sm text-slate-700">Application status tracking from pending to hired.</p>
          <p className="rounded-lg bg-brand-50 p-3 text-sm text-slate-700">Admin oversight with summary reports and moderation tools.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-900">How hiring works here</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {processSteps.map((step) => (
            <Card key={step.title}>
              <h3 className="text-base font-semibold text-brand-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-white p-6">
        <h2 className="text-2xl font-bold text-brand-900">Security and platform standards</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <p className="rounded-lg border border-brand-100 bg-white p-3 text-sm text-slate-700">JWT-based authentication and protected route enforcement.</p>
          <p className="rounded-lg border border-brand-100 bg-white p-3 text-sm text-slate-700">Form validation and structured error handling to prevent bad input.</p>
          <p className="rounded-lg border border-brand-100 bg-white p-3 text-sm text-slate-700">Audit-friendly admin reports for users, jobs, and application counts.</p>
          <p className="rounded-lg border border-brand-100 bg-white p-3 text-sm text-slate-700">Clear status lifecycle: pending, shortlisted, rejected, hired.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-900">Frequently asked questions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((item) => (
            <Card key={item.q}>
              <h3 className="text-base font-semibold text-brand-900">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.a}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-brand-200 bg-white p-6 shadow-card">
        <h2 className="text-2xl font-bold text-brand-900">Hiring categories covered</h2>
        <p className="mt-2 text-sm text-slate-600">
          Discover opportunities and candidates across high-demand domains.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hiringCategories.map((category) => (
            <div key={category} className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-900">
              {category}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-900">Career and hiring resources</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {resources.map((item) => (
            <Card key={item.title}>
              <h3 className="text-base font-semibold text-brand-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-brand-800 p-8 text-white shadow-card">
        <h2 className="text-2xl font-bold">Join a trusted hiring platform</h2>
        <p className="mt-2 max-w-2xl text-brand-100">
          Whether you are looking for your next role or hiring your next team member, Online Job Portal keeps the process transparent and reliable.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-brand-800" href="/register">
            Start for Free
          </Link>
          <Link className="rounded-md border border-white px-4 py-2 text-sm font-semibold text-white" href="/jobs">
            View Open Jobs
          </Link>
        </div>
      </section>
    </div>
  );
}
