"use client";

import "./course-detail.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import SmecnewLayout from "../components/smecnew/SmecnewLayout";
import type { CourseEntry } from "./courseData";
import { WHATSAPP_NUMBER, getWhatsAppMessageHeader } from "../whatsappMeta";
import { CourseSchema } from "../components/StructuredData";

const IST_TIME_ZONE = "Asia/Kolkata";
const COMMUNICATION_OPTIONS = ["Zoom", "Google Meet", "Phone call", "Campus Visit"] as const;
const IST_TIME_SLOTS = [
  "09:00 AM IST",
  "10:00 AM IST",
  "11:00 AM IST",
  "12:00 PM IST",
  "01:00 PM IST",
  "02:00 PM IST",
  "03:00 PM IST",
  "04:00 PM IST",
  "05:00 PM IST",
  "06:00 PM IST",
  "07:00 PM IST",
  "08:00 PM IST",
  "09:00 PM IST",
];

const CERTIFICATE_ROADMAP_STEPS = [
  "Enquiry",
  "Enrolling",
  "Orientation Classes",
  "Study Classes",
  "Practical Section",
  "Interview Preparation",
  "Certificates",
  "Placements",
];

function getISTDateParts(baseDate = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(baseDate);

  const year = Number(parts.find((part) => part.type === "year")?.value ?? "0");
  const month = Number(parts.find((part) => part.type === "month")?.value ?? "1");
  const day = Number(parts.find((part) => part.type === "day")?.value ?? "1");

  return { year, month, day };
}

function getISTDateInputValue(dayOffset: number) {
  const { year, month, day } = getISTDateParts();
  const baseUtcDate = new Date(Date.UTC(year, month - 1, day));
  baseUtcDate.setUTCDate(baseUtcDate.getUTCDate() + dayOffset);
  return baseUtcDate.toISOString().slice(0, 10);
}

function formatISTDateLabel(dateInput: string) {
  if (!dateInput || typeof dateInput !== 'string') {
    return "";
  }

  try {
    const [year, month, day] = dateInput.split("-").map(Number);
    if (!year || !month || !day) {
      return "";
    }
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIME_ZONE,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(utcDate);
  } catch (error) {
    console.error('Error formatting date:', error);
    return "";
  }
}

function shiftMonthInput(monthInput: string, offset: number) {
  if (!monthInput || typeof monthInput !== 'string') {
    return "";
  }
  
  try {
    const [year, month] = monthInput.split("-").map(Number);
    if (!year || !month) {
      return "";
    }
    const utcDate = new Date(Date.UTC(year, month - 1 + offset, 1));
    const nextYear = utcDate.getUTCFullYear();
    const nextMonth = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
    return `${nextYear}-${nextMonth}`;
  } catch (error) {
    console.error('Error shifting month:', error);
    return "";
  }
}

function formatISTMonthLabel(monthInput: string) {
  if (!monthInput || typeof monthInput !== 'string') {
    return "";
  }
  
  try {
    const [year, month] = monthInput.split("-").map(Number);
    if (!year || !month) {
      return "";
    }
    const utcDate = new Date(Date.UTC(year, month - 1, 1));
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIME_ZONE,
      month: "long",
      year: "numeric",
    }).format(utcDate);
  } catch (error) {
    console.error('Error formatting month:', error);
    return "";
  }
}

function getFutureLeadersHeading(course: CourseEntry): string {
  const isCivilCourse =
    course.slug.includes("civil") ||
    course.title.toLowerCase().includes("civil") ||
    course.category.toLowerCase().includes("civil");

  if (isCivilCourse) {
    return "SMEC Powers Future Civil Leaders";
  }

  return `SMEC Powers Future ${course.title}`;
}

function AnimatedCounter({
  end,
  duration = 1400,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      const frameId = window.requestAnimationFrame(() => {
        setValue(end);
      });
      return () => window.cancelAnimationFrame(frameId);
    }

    if (end === 0) {
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [duration, end, mounted]);

  // Show final value immediately if not mounted yet (SSR/SSG)
  const displayValue = mounted ? value : end;

  return (
    <span className="stat-value" aria-live="polite">
      {prefix}
      {displayValue.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function CourseRoadmapClient({ course }: { course: CourseEntry }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isCertificateRoadmapOpen, setIsCertificateRoadmapOpen] = useState(false);
  const [isTrainerModalOpen, setIsTrainerModalOpen] = useState(false);
  const [isOnlineClassModalOpen, setIsOnlineClassModalOpen] = useState(false);
  const [selectedDemoDate, setSelectedDemoDate] = useState("");
  const [selectedDemoTime, setSelectedDemoTime] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantMobile, setApplicantMobile] = useState("");
  const [communicationVia, setCommunicationVia] = useState<(typeof COMMUNICATION_OPTIONS)[number]>("Zoom");
  const [demoFormError, setDemoFormError] = useState("");
  const futureLeadersHeading = getFutureLeadersHeading(course);
  const minDemoDate = getISTDateInputValue(0) || "";
  const maxDemoDate = getISTDateInputValue(9) || "";
  const minDemoMonth = minDemoDate ? minDemoDate.slice(0, 7) : "";
  const maxDemoMonth = maxDemoDate ? maxDemoDate.slice(0, 7) : "";
  const [displayedMonth, setDisplayedMonth] = useState(minDemoMonth);
  const activeDemoStep = selectedDemoDate ? (selectedDemoTime ? 3 : 2) : 1;
  const isDetailsStep = Boolean(selectedDemoDate && selectedDemoTime);
  const trainerSlots = course.roadmapBlocks.find((block) => block.id === "featured-courses")?.details ?? [];
  const [displayYear, displayMonth] = (displayedMonth || "").split("-").map(Number);
  const monthStartUtc = new Date(Date.UTC(displayYear || 0, (displayMonth || 1) - 1, 1));
  const firstWeekday = monthStartUtc.getUTCDay();
  const daysInDisplayedMonth = new Date(Date.UTC(displayYear || 0, displayMonth || 1, 0)).getUTCDate();
  const monthLabel = formatISTMonthLabel(displayedMonth || "");
  const calendarCells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInDisplayedMonth }, (_, index) => index + 1),
  ];

  while (calendarCells.length % 7 !== 0) {
    calendarCells.push(null);
  }

  useEffect(() => {
    if (!isDemoModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDemoModalOpen(false);
        setIsCertificateRoadmapOpen(false);
        setIsTrainerModalOpen(false);
        setIsOnlineClassModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDemoModalOpen, isCertificateRoadmapOpen, isTrainerModalOpen, isOnlineClassModalOpen]);

  const resetDemoForm = () => {
    setSelectedDemoDate("");
    setSelectedDemoTime("");
    setApplicantName("");
    setApplicantEmail("");
    setApplicantMobile("");
    setCommunicationVia("Zoom");
    setDemoFormError("");
    setDisplayedMonth(minDemoMonth);
  };

  const openDemoModal = () => {
    resetDemoForm();
    setIsDemoModalOpen(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    setDemoFormError("");
  };

  const handleDemoDateChange = (dateValue: string) => {
    if (!dateValue) {
      setSelectedDemoDate("");
      setSelectedDemoTime("");
      return;
    }

    if (dateValue < minDemoDate || dateValue > maxDemoDate) {
      setDemoFormError("Please select a date within the next 10 days.");
      return;
    }

    setDemoFormError("");
    setSelectedDemoDate(dateValue);
    setSelectedDemoTime("");
  };

  const submitDemoRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDemoDate || !selectedDemoTime || !applicantName || !applicantEmail || !applicantMobile) {
      setDemoFormError("Please complete all required fields.");
      return;
    }

    const messageLines = [
      "*Course Demo Request (FREE)*",
      ...getWhatsAppMessageHeader(),
      "",
      `Course: ${course.title}`,
      `Date: ${formatISTDateLabel(selectedDemoDate)}`,
      `Time: ${selectedDemoTime}`,
      `Name: ${applicantName}`,
      `Email: ${applicantEmail}`,
      `Mobile: ${applicantMobile}`,
      `Best Communicate via: ${communicationVia}`,
    ];

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    closeDemoModal();
  };

  return (
    <SmecnewLayout>
      <CourseSchema course={course} />
      {/* Hero Section */}
      <header className="course-detail-hero">
        <div className="course-detail-breadcrumb">
          <Link href="/courses">Courses</Link>
          <span>/</span>
          <span>{course.category}</span>
        </div>
        <h1 className="course-detail-title">{course.title}</h1>
        <p className="course-detail-desc">{course.description}</p>
            
            {/* Course Stats */}
            <div className="course-stats">
              <div className="course-stat-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="stat-label">Students Trained</span>
                <AnimatedCounter end={3.5} decimals={1} suffix="K+" />
                <span className="stat-meta">Across all major domains</span>
              </div>
              <div className="course-stat-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="stat-label">Learner Rating</span>
                <AnimatedCounter end={4.8} decimals={1} suffix="/5" />
                <span className="stat-meta">From verified learners</span>
              </div>
              <div className="course-stat-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
                  <path d="M20 6 9 17l-5-5" />
                  <path d="M20 12v7H4V5h11" />
                </svg>
                <span className="stat-label">Placement Support</span>
                <AnimatedCounter end={100} suffix="%" />
                <span className="stat-meta">Career guidance included</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="course-hero-actions">
              <a href="https://wa.me/918289887322" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Enroll Now
              </a>
              <a href="tel:+919656227714" className="btn-secondary">
                Call Us
              </a>
            </div>
          </header>

          {/* Tab Navigation */}
          <nav className="course-tabs">
            <button
              type="button"
              className={`course-tab ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              type="button"
              className={`course-tab ${activeTab === "curriculum" ? "active" : ""}`}
              onClick={() => setActiveTab("curriculum")}
            >
              Curriculum
            </button>
            <button
              type="button"
              className={`course-tab ${activeTab === "outcomes" ? "active" : ""}`}
              onClick={() => setActiveTab("outcomes")}
            >
              Outcomes
            </button>
          </nav>

          {/* Tab Content */}
          <div className="course-content">
            {activeTab === "overview" && (
              <div className="tab-panel">
                <div className="programs-section-header">
                  <div className="programs-section-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                    Available Programs
                  </div>
                  <h2 className="section-title programs-section-title">Choose Your Learning Path</h2>
                  <p className="programs-section-subtitle">Flexible formats designed to fit your schedule and goals</p>
                </div>
                <div className="programs-list">
                  {course.roadmapBlocks
                    .find((block) => block.id === "featured-courses")
                    ?.details.map((program, index) => {
                      const [programTitle, duration, mode] = program.split("|");
                      return (
                        <div key={program} className="program-item" style={{ "--prog-index": index } as React.CSSProperties}>
                          <div className="program-index-col">
                            <div className="program-number">{String(index + 1).padStart(2, "0")}</div>
                            <div className="program-connector" aria-hidden="true" />
                          </div>
                          <div className="program-card">
                            <div className="program-card-top">
                              <div className="program-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                              </div>
                              <div className="program-info">
                                <div className="program-name">{programTitle ?? program}</div>
                                {(duration || mode) && (
                                  <div className="program-meta">
                                    {duration && (
                                      <span className="program-meta-duration">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                        {duration}
                                      </span>
                                    )}
                                    {mode && (
                                      <span className="program-meta-mode">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="11" height="11" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                                        {mode}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="career-section-header">
                  <div className="career-section-badge">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16" aria-hidden="true"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                    Career Opportunities
                  </div>
                  <h2 className="section-title career-section-title">Where Will You Work?</h2>
                  <p className="career-section-subtitle">Explore the roles our graduates land across top industries</p>
                </div>
                <div className="job-roles-grid">
                  {course.roadmapBlocks
                    .find((block) => block.id === "job-roles")
                    ?.details.map((role, index) => (
                      <div key={role} className="job-role-chip" style={{ "--chip-index": index } as React.CSSProperties}>
                        <span className="job-role-chip-number">{String(index + 1).padStart(2, "0")}</span>
                        <span className="job-role-chip-label">{role}</span>
                        <svg className="job-role-chip-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    ))}
                </div>

                {course.roadmapBlocks.find((block) => block.id === "job-areas") && (
                  <>
                    <h2 className="section-title" style={{ marginTop: "2rem" }}>Job Areas</h2>
                    <div className="job-roles-grid">
                      {course.roadmapBlocks
                        .find((block) => block.id === "job-areas")
                        ?.details.map((area) => (
                          <div key={area} className="job-role-chip">
                            {area}
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {/* Orbit Structure for What We Offer */}
                <div className="orbit-section">
                  <div className="orbit-container">
                    <div className="orbit-center">
                      <div className="orbit-center-text">What We<br/>Offer</div>
                    </div>
                    
                    <div className="orbit-ring"></div>
                    <div className="orbit-ring-dot"></div>
                    
                    <div className="orbit-card orbit-card-1">
                      <button
                        type="button"
                        className="orbit-card-inner orbit-card-inline-btn"
                        onClick={() => setIsOnlineClassModalOpen(true)}
                        aria-label="Open online classes details"
                      >
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#01a99e"}}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                        </div>
                        <h4>Online Courses</h4>
                        <p>Learn Anytime, Anywhere</p>
                      </button>
                    </div>
                    
                    <div className="orbit-card orbit-card-2">
                      <button
                        type="button"
                        className="orbit-card-inner orbit-card-inline-btn"
                        onClick={() => setIsTrainerModalOpen(true)}
                        aria-label="Open expert trainer details"
                      >
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#0c5adb"}}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        </div>
                        <h4>Expert Trainer</h4>
                        <p>Learn from Industry Leaders</p>
                      </button>
                    </div>
                    
                    <div className="orbit-card orbit-card-3">
                      <button
                        type="button"
                        className="orbit-card-inner orbit-card-inline-btn"
                        onClick={() => setIsCertificateRoadmapOpen(true)}
                        aria-label="Open certificate roadmap"
                      >
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#ea580c"}}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                        </div>
                        <h4>Get Certificate</h4>
                        <p>Globally Recognized</p>
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      className="orbit-card orbit-card-4 orbit-card-button"
                      onClick={openDemoModal}
                      aria-label="Open demo class request details"
                    >
                      <div className="orbit-card-inner">
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#7c3aed"}}><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.82v6.36a1 1 0 0 1-1.447.89L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></svg>
                        </div>
                        <h4>Demo Class</h4>
                        <p>Try Before You Enroll</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="tab-panel">
                <h2 className="section-title">What You&apos;ll Learn</h2>
                <div className="curriculum-list">
                  {course.roadmapBlocks.map((block, index) => (
                    <div key={block.id} className="curriculum-item">
                      <div className="curriculum-number">{String(index + 1).padStart(2, "0")}</div>
                      <div className="curriculum-content">
                        <h3 className="curriculum-title">{block.title}</h3>
                        <p className="curriculum-hint">{block.hint}</p>
                        <ul className="curriculum-details">
                          {block.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "outcomes" && (
              <div className="tab-panel">
                <h2 className="section-title">Career Outcomes</h2>
                <p className="section-text">
                  Upon completion, you&apos;ll be equipped with industry-ready skills and placement support.
                </p>
                
                <div className="outcomes-grid">
                  <div className="outcome-card">
                    <div className="outcome-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://api.iconify.design/mdi:briefcase-check.svg?color=%230c5adb&width=28&height=28" alt="" width={28} height={28} aria-hidden="true" />
                    </div>
                    <h3 className="outcome-title">Job Placement</h3>
                    <p className="outcome-desc">Dedicated placement assistance with top companies</p>
                  </div>
                  <div className="outcome-card">
                    <div className="outcome-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://api.iconify.design/mdi:certificate.svg?color=%230d9488&width=28&height=28" alt="" width={28} height={28} aria-hidden="true" />
                    </div>
                    <h3 className="outcome-title">Certification</h3>
                    <p className="outcome-desc">Industry-recognized certificate upon completion</p>
                  </div>
                  <div className="outcome-card">
                    <div className="outcome-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://api.iconify.design/mdi:rocket-launch.svg?color=%23ea580c&width=28&height=28" alt="" width={28} height={28} aria-hidden="true" />
                    </div>
                    <h3 className="outcome-title">Career Growth</h3>
                    <p className="outcome-desc">Skills for long-term career advancement</p>
                  </div>
                  <div className="outcome-card">
                    <div className="outcome-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://api.iconify.design/mdi:handshake.svg?color=%237c3aed&width=28&height=28" alt="" width={28} height={28} aria-hidden="true" />
                    </div>
                    <h3 className="outcome-title">Mentorship</h3>
                    <p className="outcome-desc">Guidance from industry experts</p>
                  </div>
                </div>

                {/* Orbit Structure Section */}
                <h2 className="section-title" style={{ marginTop: "2.5rem" }}>Learning Journey</h2>
                <div className="orbit-section">
                  <div className="orbit-container">
                    <div className="orbit-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <div className="orbit-center-icon"><img src="https://api.iconify.design/mdi:book-open-variant.svg?color=%23ffffff&width=28&height=28" alt="" width={28} height={28} aria-hidden="true" /></div>
                      <div className="orbit-center-text">Course</div>
                    </div>
                    
                    <div className="orbit-ring"></div>
                    <div className="orbit-ring-dot"></div>
                    
                    <div className="orbit-card orbit-card-1">
                      <div className="orbit-card-inner">
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#0c5adb"}}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        </div>
                        <h4>Learn</h4>
                        <p>Industry-focused curriculum</p>
                      </div>
                    </div>
                    
                    <div className="orbit-card orbit-card-2">
                      <div className="orbit-card-inner">
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#01a99e"}}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                        </div>
                        <h4>Practice</h4>
                        <p>Hands-on projects</p>
                      </div>
                    </div>
                    
                    <div className="orbit-card orbit-card-3">
                      <div className="orbit-card-inner">
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#ea580c"}}><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                        </div>
                        <h4>Build</h4>
                        <p>Real-world portfolio</p>
                      </div>
                    </div>
                    
                    <div className="orbit-card orbit-card-4">
                      <div className="orbit-card-inner">
                        <div className="orbit-card-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{color:"#7c3aed"}}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>
                        </div>
                        <h4>Launch</h4>
                        <p>Career placement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <section className="course-impact-section" aria-label="SMEC impact highlights">
            <p className="impact-kicker">Did You Know?</p>
            <h2 className="impact-title">{futureLeadersHeading}</h2>
            <p className="impact-description">
              With decades of excellence in technical and professional education, SMEC has been a catalyst for
              thousands of aspiring professionals, helping them succeed in today&apos;s fast-paced business and
              technology landscape.
            </p>
            <p className="impact-description">
              Our industry-focused, hands-on training, combined with strategic corporate partnerships, has enabled
              over 2,400 students to launch successful careers in business management, tech-driven enterprises, and
              startups across India and globally.
            </p>

            <div className="impact-metrics">
              <article className="impact-metric-card">
                <AnimatedCounter end={3.5} decimals={1} suffix="K+" />
                <h3 className="impact-metric-title">Successful Students</h3>
              </article>
              <article className="impact-metric-card">
                <AnimatedCounter end={800} suffix="+" />
                <h3 className="impact-metric-title">Active Learners &amp; Counting</h3>
              </article>
              <article className="impact-metric-card">
                <AnimatedCounter end={2.4} decimals={1} suffix="K" />
                <h3 className="impact-metric-title">Industry Internships Completed</h3>
              </article>
              <article className="impact-metric-card">
                <AnimatedCounter end={1} suffix=" Lakh+" />
                <h3 className="impact-metric-title">Placements &amp; Counting</h3>
              </article>
            </div>
          </section>

          {isDemoModalOpen && (
            <div className="demo-modal-overlay" role="presentation" onClick={closeDemoModal}>
              <div
                className="demo-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="demo-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="demo-modal-close"
                  onClick={closeDemoModal}
                  aria-label="Close modal"
                >
                  ×
                </button>
                <p className="demo-modal-brand">SMEClabs</p>
                <h3 id="demo-modal-title" className="demo-modal-title">
                  Course Demo Request (FREE)
                </h3>
                <p className="demo-modal-duration">30 min</p>
                <p className="demo-modal-text">
                  Dear Candidate, Please select a convenient date and time for the Course Demo or career counseling.
                </p>

                <div className="demo-steps" aria-label="Demo booking steps">
                  <span className={`demo-step-chip ${activeDemoStep >= 1 ? "is-active" : ""}`}>1. Date</span>
                  <span className={`demo-step-chip ${activeDemoStep >= 2 ? "is-active" : ""}`}>2. Time</span>
                  <span className={`demo-step-chip ${activeDemoStep >= 3 ? "is-active" : ""}`}>3. Details</span>
                </div>

                {!isDetailsStep && (
                  <>
                    <div className="demo-flow-block">
                      <p className="demo-field-label">
                        Select Date (next 10 days)
                      </p>
                      <div className="demo-calendar">
                        <div className="demo-calendar-header">
                          <button
                            type="button"
                            className="demo-calendar-nav"
                            onClick={() => setDisplayedMonth((month) => shiftMonthInput(month, -1))}
                            disabled={displayedMonth <= minDemoMonth}
                            aria-label="Previous month"
                          >
                            ‹
                          </button>
                          <p className="demo-calendar-title">{monthLabel}</p>
                          <button
                            type="button"
                            className="demo-calendar-nav"
                            onClick={() => setDisplayedMonth((month) => shiftMonthInput(month, 1))}
                            disabled={displayedMonth >= maxDemoMonth}
                            aria-label="Next month"
                          >
                            ›
                          </button>
                        </div>

                        <div className="demo-calendar-weekdays">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((label) => (
                            <span key={label}>{label}</span>
                          ))}
                        </div>

                        <div className="demo-calendar-grid">
                          {calendarCells.map((day, index) => {
                            if (!day) {
                              return <span key={`blank-${index}`} className="demo-calendar-empty" aria-hidden="true" />;
                            }

                            const dayInput = `${displayedMonth}-${String(day).padStart(2, "0")}`;
                            const isActiveDate = dayInput >= minDemoDate && dayInput <= maxDemoDate;
                            const isSelectedDate = dayInput === selectedDemoDate;
                            const isTodayIst = dayInput === minDemoDate;

                            return (
                              <button
                                key={dayInput}
                                type="button"
                                className={`demo-calendar-day ${isSelectedDate ? "is-selected" : ""} ${isTodayIst ? "is-today" : ""}`}
                                disabled={!isActiveDate}
                                onClick={() => handleDemoDateChange(dayInput)}
                                aria-pressed={isSelectedDate}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {selectedDemoDate && (
                        <p className="demo-selected-date">Selected: {formatISTDateLabel(selectedDemoDate)}</p>
                      )}
                    </div>

                    {selectedDemoDate && (
                      <div className="demo-flow-block">
                        <label className="demo-field-label" htmlFor="demo-time-slot">
                          Select Time Slot (IST, 9:00 AM - 9:00 PM)
                        </label>
                        <select
                          id="demo-time-slot"
                          className="demo-field-control"
                          value={selectedDemoTime}
                          onChange={(event) => setSelectedDemoTime(event.target.value)}
                          required
                        >
                          <option value="">Select time slot</option>
                          {IST_TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {selectedDemoDate && selectedDemoTime && (
                  <form className="demo-request-form" onSubmit={submitDemoRequest}>
                    <div className="demo-flow-block">
                      <label className="demo-field-label" htmlFor="demo-course-title">
                        Course Title
                      </label>
                      <input
                        id="demo-course-title"
                        className="demo-field-control"
                        value={course.title}
                        readOnly
                      />
                    </div>
                    <button
                      type="button"
                      className="demo-change-slot-btn"
                      onClick={() => setSelectedDemoTime("")}
                    >
                      Change Date & Time
                    </button>

                    <div className="demo-form-grid">
                      <div className="demo-flow-block">
                        <label className="demo-field-label" htmlFor="demo-selected-date">
                          Date
                        </label>
                        <input
                          id="demo-selected-date"
                          className="demo-field-control"
                          value={formatISTDateLabel(selectedDemoDate)}
                          readOnly
                        />
                      </div>
                      <div className="demo-flow-block">
                        <label className="demo-field-label" htmlFor="demo-selected-time">
                          Time
                        </label>
                        <input
                          id="demo-selected-time"
                          className="demo-field-control"
                          value={selectedDemoTime}
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="demo-form-grid">
                      <div className="demo-flow-block">
                        <label className="demo-field-label" htmlFor="demo-name">
                          Name of Applicant
                        </label>
                        <input
                          id="demo-name"
                          className="demo-field-control"
                          value={applicantName}
                          onChange={(event) => setApplicantName(event.target.value)}
                          required
                        />
                      </div>
                      <div className="demo-flow-block">
                        <label className="demo-field-label" htmlFor="demo-email">
                          Email
                        </label>
                        <input
                          id="demo-email"
                          type="email"
                          className="demo-field-control"
                          value={applicantEmail}
                          onChange={(event) => setApplicantEmail(event.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="demo-flow-block">
                      <label className="demo-field-label" htmlFor="demo-mobile">
                        Mobile Number
                      </label>
                      <input
                        id="demo-mobile"
                        type="tel"
                        className="demo-field-control"
                        value={applicantMobile}
                        onChange={(event) => setApplicantMobile(event.target.value)}
                        required
                      />
                    </div>

                    <fieldset className="demo-flow-block demo-radio-group">
                      <legend className="demo-field-label">Best Communicate via</legend>
                      <div className="demo-radio-options">
                        {COMMUNICATION_OPTIONS.map((option) => (
                          <label key={option} className="demo-radio-option">
                            <input
                              type="radio"
                              name="communication-via"
                              value={option}
                              checked={communicationVia === option}
                              onChange={() => setCommunicationVia(option)}
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    {demoFormError && <p className="demo-form-error">{demoFormError}</p>}

                    <button type="submit" className="demo-submit-btn">
                      Submit on WhatsApp
                    </button>
                  </form>
                )}

                {!isDetailsStep && demoFormError && <p className="demo-form-error">{demoFormError}</p>}
              </div>
            </div>
          )}

          {isCertificateRoadmapOpen && (
            <div
              className="certificate-roadmap-overlay"
              role="presentation"
              onClick={() => setIsCertificateRoadmapOpen(false)}
            >
              <div
                className="certificate-roadmap-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="certificate-roadmap-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="certificate-roadmap-close"
                  onClick={() => setIsCertificateRoadmapOpen(false)}
                  aria-label="Close roadmap modal"
                >
                  ×
                </button>
                <p className="certificate-roadmap-kicker">SMEClabs Learning Path</p>
                <h3 id="certificate-roadmap-title" className="certificate-roadmap-title">
                  Certificate & Placement
                </h3>
                <ol className="certificate-roadmap-list">
                  {CERTIFICATE_ROADMAP_STEPS.map((step, index) => (
                    <li key={step} className="certificate-roadmap-step" style={{ animationDelay: `${index * 120}ms` }}>
                      <span className="certificate-roadmap-dot">{String(index + 1).padStart(2, "0")}</span>
                      <span className="certificate-roadmap-text">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {isTrainerModalOpen && (
            <div
              className="trainer-modal-overlay"
              role="presentation"
              onClick={() => setIsTrainerModalOpen(false)}
            >
              <div
                className="trainer-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="trainer-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="trainer-modal-close"
                  onClick={() => setIsTrainerModalOpen(false)}
                  aria-label="Close trainer modal"
                >
                  ×
                </button>
                <p className="trainer-modal-kicker">SMEClabs Faculty</p>
                <h3 id="trainer-modal-title" className="trainer-modal-title">
                  Expert Trainers
                </h3>
                <div className="trainer-photo-grid">
                  {trainerSlots.map((trainerKey, index) => (
                    <div key={trainerKey} className="trainer-photo-card">
                      <div className="trainer-photo-placeholder">Trainer {String(index + 1).padStart(2, "0")}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isOnlineClassModalOpen && (
            <div
              className="online-class-modal-overlay"
              role="presentation"
              onClick={() => setIsOnlineClassModalOpen(false)}
            >
              <div
                className="online-class-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="online-class-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="online-class-modal-close"
                  onClick={() => setIsOnlineClassModalOpen(false)}
                  aria-label="Close online class modal"
                >
                  ×
                </button>
                <p className="online-class-modal-kicker">SMEClabs Online Learning</p>
                <h3 id="online-class-modal-title" className="online-class-modal-title">
                  Learn Online, Build Your Career
                </h3>
                <div className="online-class-points">
                  <p>📡 Learn from Anywhere — Attend classes from home using mobile or laptop.</p>
                  <p>🎥 Live Interactive Sessions — Learn directly from industry experts in real time.</p>
                  <p>▶ Recorded Classes Access — Revise anytime with session recordings.</p>
                  <p>⏰ Flexible Timings — Suitable for students &amp; working professionals.</p>
                  <p>🛠 Practical &amp; Project-Based Learning — Gain real-world hands-on experience.</p>
                  <p>🎓 Industry Certification — Get recognized certificates after completion.</p>
                  <p>💼 Placement Assistance — Career guidance &amp; job support.</p>
                  <p>💬 Doubt Clearing Support — Get one-to-one mentor support.</p>
                  <p>📚 Updated Industry Syllabus — Learn skills that companies demand.</p>
                  <p>💰 Affordable Fees Options
Easy payment &amp; installment plans.</p>
                </div>
                <a
                  className="online-class-enroll-btn"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    [
                      "*Online Class Enquiry*",
                      ...getWhatsAppMessageHeader(),
                      "",
                      `Course: ${course.title}`,
                    ].join("\n"),
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          )}
    </SmecnewLayout>
  );
}
