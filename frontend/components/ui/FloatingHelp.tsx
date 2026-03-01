"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type HelpItem = {
  title: string;
  text: string;
};

const helpByPath: Array<{ match: RegExp; heading: string; items: HelpItem[] }> = [
  {
    match: /^\/$/,
    heading: "Home Page Guide",
    items: [
      { title: "Hero Section", text: "Introduces the platform value and provides quick entry to registration and job browsing." },
      { title: "Trust Blocks", text: "Displays metrics, testimonials, and company presence to improve credibility for new users." },
      { title: "FAQ + Resources", text: "Explains common questions so users understand platform flow before signing up." }
    ]
  },
  {
    match: /^\/register/,
    heading: "Register Page Guide",
    items: [
      { title: "Role Selection", text: "Defines whether account is for job seeker or recruiter and changes dashboard access." },
      { title: "Validation Hints", text: "Shows field-level rules so users can correct issues before submit." },
      { title: "Password Guidance", text: "Improves account security with checklist and visibility toggle." }
    ]
  },
  {
    match: /^\/login/,
    heading: "Login Page Guide",
    items: [
      { title: "Quick Access", text: "Lets existing users sign in and redirects them to their role-specific dashboard." },
      { title: "Password Visibility", text: "Eye icon helps users verify typed password and reduce login mistakes." }
    ]
  },
  {
    match: /^\/jobseeker\/profile/,
    heading: "Profile + Resume Guide",
    items: [
      { title: "Resume Upload", text: "Uploads PDF/DOC/DOCX resume and links it directly to user profile for recruiters." },
      { title: "Profile Fields", text: "Stores contact, skills, and bio to improve job matching and recruiter visibility." },
      { title: "View/Download", text: "Allows checking the current uploaded resume to avoid outdated documents." }
    ]
  },
  {
    match: /^\/jobseeker\/dashboard/,
    heading: "Jobseeker Dashboard Guide",
    items: [
      { title: "Summary Cards", text: "Show open jobs, total applications, and your current profile role at a glance." },
      { title: "Left Sidebar", text: "Quickly navigate to Profile + Resume, Jobs search, and Application tracking." },
      { title: "Status Flow", text: "Track application movement from pending to shortlisted, rejected, or hired." }
    ]
  },
  {
    match: /^\/jobseeker\/jobs/,
    heading: "Job Search Guide",
    items: [
      { title: "Filter Panel", text: "Use keyword, location, category, job type, and salary range filters to narrow results." },
      { title: "Job Cards", text: "Review title, category, location, and salary band before opening details." },
      { title: "Apply Action", text: "Submit application from job details and avoid duplicate apply with system checks." }
    ]
  },
  {
    match: /^\/jobseeker\/applications/,
    heading: "My Applications Guide",
    items: [
      { title: "Application List", text: "Shows all jobs you applied for in reverse chronological order." },
      { title: "Status Badge", text: "Current state of each application is highlighted for fast tracking." },
      { title: "Remarks", text: "Recruiter feedback, if provided, appears alongside status updates." }
    ]
  },
  {
    match: /^\/recruiter\/jobs\/new|^\/recruiter\/jobs\/[^/]+\/edit/,
    heading: "Recruiter Job Form Guide",
    items: [
      { title: "Team Templates", text: "Category-based templates suggest role titles, skills, and description direction." },
      { title: "Skill Chips", text: "One-click suggestions help build a complete skill list faster." },
      { title: "Quality Checklist", text: "Improves clarity in responsibilities, salary, and outcomes for better applicants." }
    ]
  },
  {
    match: /^\/admin/,
    heading: "Admin Section Guide",
    items: [
      { title: "Dashboard Metrics", text: "Summarizes users, jobs, applications, and platform health in graphical form." },
      { title: "Manage Users/Jobs", text: "Provides moderation actions with filters and tables for operational control." },
      { title: "Reports", text: "Shows status distribution and conversion trends for decision making." }
    ]
  }
];

const defaultHelp: { heading: string; items: HelpItem[] } = {
  heading: "Page Guide",
  items: [
    { title: "Navigation", text: "Top navbar gives quick access to jobs and role dashboards." },
    { title: "Main Content", text: "This section is optimized for your current role and permissions." }
  ]
};

export const FloatingHelp = (): JSX.Element => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const content = useMemo(() => {
    const found = helpByPath.find((entry) => entry.match.test(pathname));
    return found ? { heading: found.heading, items: found.items } : defaultHelp;
  }, [pathname]);

  useEffect(() => {
    setSelectedIndex(0);
    setIsSpeaking(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakSelected = (): void => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const selected = content.items[selectedIndex];
    if (!selected) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${selected.title}. ${selected.text}.`);
    utterance.volume = volume;
    utterance.rate = rate;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = (): void => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const selectedItem = content.items[selectedIndex];
  const canGoPrev = selectedIndex > 0;
  const canGoNext = selectedIndex < content.items.length - 1;
  const panelVisible = isOpen || isClosing;

  const openPanel = (): void => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const closePanel = (): void => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 180);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => (isOpen ? closePanel() : openPanel())}
        className="help-fab fixed bottom-5 right-5 z-50 rounded-full bg-brand-700 p-3 text-white shadow-lg transition duration-200 hover:scale-105 hover:bg-brand-800 active:scale-95"
        aria-label="Open help"
        title="Help"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.1 9a3 3 0 1 1 5.7 1.2c-.5.8-1.5 1.2-2.1 1.8-.4.3-.7.8-.7 1.5" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      </button>

      {panelVisible && (
        <div className={`fixed bottom-20 right-5 z-50 w-[92vw] max-w-md rounded-xl border border-brand-200 bg-white p-4 shadow-2xl ${isClosing ? "help-panel-exit" : "help-panel-enter"}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-brand-900">{content.heading}</h3>
              <p className="text-xs text-slate-500">Select a section and review explanation one by one.</p>
            </div>
            <button className="rounded p-1 text-slate-500 transition hover:bg-brand-50" onClick={closePanel} aria-label="Close help">
              x
            </button>
          </div>

          <div className="mt-3 rounded-lg border border-brand-100 p-2">
            <p className="px-1 text-xs font-semibold text-brand-900">Sections</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {content.items.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(idx);
                    stopSpeech();
                  }}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition duration-200 ${
                    idx === selectedIndex ? "bg-brand-700 text-white" : "border border-brand-200 bg-white text-brand-800 hover:bg-brand-50"
                  }`}
                >
                  {idx + 1}. {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-brand-100 bg-brand-50 p-3">
            <p className="text-sm font-semibold text-brand-900">{selectedItem?.title}</p>
            <p className="mt-1 text-xs text-slate-700">{selectedItem?.text}</p>
            <div className="mt-3 flex items-center justify-between">
              <button
                type="button"
                disabled={!canGoPrev}
                onClick={() => {
                  if (canGoPrev) {
                    setSelectedIndex((prev) => prev - 1);
                    stopSpeech();
                  }
                }}
                className="rounded-md border border-brand-200 px-2.5 py-1 text-xs font-semibold text-brand-800 transition hover:bg-white disabled:opacity-40"
              >
                Previous
              </button>
              <p className="text-xs text-slate-500">
                Section {selectedIndex + 1} of {content.items.length}
              </p>
              <button
                type="button"
                disabled={!canGoNext}
                onClick={() => {
                  if (canGoNext) {
                    setSelectedIndex((prev) => prev + 1);
                    stopSpeech();
                  }
                }}
                className="rounded-md border border-brand-200 px-2.5 py-1 text-xs font-semibold text-brand-800 transition hover:bg-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-brand-100 p-3">
            <p className="text-xs font-semibold text-brand-900">Read Aloud</p>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <label className="text-xs text-slate-600">
                Volume
                <input
                  className="mt-1 w-full"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                />
              </label>
              <label className="text-xs text-slate-600">
                Speed
                <input
                  className="mt-1 w-full"
                  type="range"
                  min="0.7"
                  max="1.4"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={speakSelected}
                className="rounded-md bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-800"
              >
                {isSpeaking ? "Replay Selected" : "Read Selected"}
              </button>
              <button
                type="button"
                onClick={stopSpeech}
                className="rounded-md border border-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-800 transition hover:bg-brand-50"
              >
                Stop
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
