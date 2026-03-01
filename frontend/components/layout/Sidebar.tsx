"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Role } from "@/lib/types";

const linksByRole: Record<Role, Array<{ href: string; label: string }>> = {
  jobseeker: [
    { href: "/jobseeker/dashboard", label: "Dashboard" },
    { href: "/jobseeker/profile", label: "Profile + Resume" },
    { href: "/jobseeker/jobs", label: "Jobs" },
    { href: "/jobseeker/applications", label: "My Applications" }
  ],
  recruiter: [
    { href: "/recruiter/dashboard", label: "Dashboard" },
    { href: "/recruiter/company-profile", label: "Company Profile" },
    { href: "/recruiter/jobs", label: "My Jobs" },
    { href: "/recruiter/jobs/new", label: "Create Job" }
  ],
  admin: [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/users", label: "Manage Users" },
    { href: "/admin/jobs", label: "Manage Jobs" },
    { href: "/admin/reports", label: "Reports" }
  ]
};

export const Sidebar = ({ role }: { role: Role }): JSX.Element => {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-brand-100 bg-white p-4 md:block">
      <ul className="space-y-2">
        {linksByRole[role].map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${
                pathname === item.href ? "bg-brand-100 text-brand-800" : "text-slate-600 hover:bg-brand-50"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
