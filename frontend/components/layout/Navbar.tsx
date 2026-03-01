"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { roleHome } from "@/lib/constants";

const BriefcaseIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="7" width="18" height="12" rx="2" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    <path d="M3 12h18" />
  </svg>
);

const DashboardIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="4" rx="1" />
    <rect x="14" y="10" width="7" height="11" rx="1" />
    <rect x="3" y="13" width="7" height="8" rx="1" />
  </svg>
);

const LoginIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
  </svg>
);

const RegisterIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path d="M4 20a8 8 0 0 1 16 0" />
    <path d="M19 8v4" />
    <path d="M17 10h4" />
  </svg>
);

const LogoutIcon = (): JSX.Element => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 17l-5-5 5-5" />
    <path d="M5 12h13" />
    <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
  </svg>
);

export const Navbar = (): JSX.Element => {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const isJobsActive = pathname.startsWith("/jobs");
  const isDashboardActive =
    pathname.startsWith("/jobseeker") || pathname.startsWith("/recruiter") || pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-30 border-b border-brand-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link className="text-3 font-bold tracking-tight text-brand-800 sm:text-lg" href="/">
          Online Job Portal
        </Link>
        <nav className="flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/70 p-1 text-sm shadow-sm">
          <Link
            className={`rounded-full px-3 py-1.5 font-medium transition ${
              isJobsActive ? "bg-white text-brand-800 shadow-sm" : "text-slate-600 hover:bg-white/80"
            }`}
            href="/jobs"
            aria-label="Jobs"
            title="Jobs"
          >
            <BriefcaseIcon />
          </Link>
          {isAuthenticated && user ? (
            <>
              <Link
                className={`rounded-full px-3 py-1.5 font-medium transition ${
                  isDashboardActive ? "bg-white text-brand-800 shadow-sm" : "text-slate-600 hover:bg-white/80"
                }`}
                href={roleHome[user.role]}
                aria-label="Dashboard"
                title="Dashboard"
              >
                <DashboardIcon />
              </Link>
              <button
                className="rounded-full px-3 py-1.5 font-medium text-red-600 transition hover:bg-red-50"
                onClick={() => void logout()}
                aria-label="Logout"
                title="Logout"
              >
                <LogoutIcon />
              </button>
            </>
          ) : (
            <>
              <Link
                className="rounded-full px-3 py-1.5 font-medium text-slate-600 transition hover:bg-white/80"
                href="/login"
                aria-label="Login"
                title="Login"
              >
                <LoginIcon />
              </Link>
              <Link
                className="rounded-full bg-brand-700 px-3 py-1.5 font-semibold text-white transition hover:bg-brand-800"
                href="/register"
                aria-label="Register"
                title="Register"
              >
                <RegisterIcon />
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
