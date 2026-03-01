import Link from "next/link";

export const Footer = (): JSX.Element => {
  return (
    <footer className="mt-16 border-t border-brand-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-brand-900">Online Job Portal</h3>
          <p className="mt-2 text-sm text-slate-600">
            Trusted hiring platform for job seekers, recruiters, and admins with transparent status tracking.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-800">Platform</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/jobs">Browse Jobs</Link>
            </li>
            <li>
              <Link href="/register">Create Account</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-800">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Email: support@onlinejobportal.com</li>
            <li>Help Desk: +91 90000 12345</li>
            <li>Mon-Fri: 9:00 AM - 6:00 PM</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-800">Trust</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Verified Employers</li>
            <li>Role-Based Access Control</li>
            <li>Application Status Transparency</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-100 py-4 text-center text-xs text-slate-500">
        (c) {new Date().getFullYear()} Online Job Portal. All rights reserved.
      </div>
    </footer>
  );
};

