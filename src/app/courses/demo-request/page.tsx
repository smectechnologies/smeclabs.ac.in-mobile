"use client";

import { Suspense, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import "./popup.css";
import { WHATSAPP_NUMBER, getWhatsAppMessageHeader } from "../../whatsappMeta";

const COMMUNICATION_OPTIONS = ["Zoom", "Google Meet", "Phone call", "Campus Visit"] as const;

function DemoRequestForm() {
  const searchParams = useSearchParams();
  const courseTitle = searchParams.get("course") ?? "";
  const demoDate = searchParams.get("date") ?? "";
  const demoTime = searchParams.get("time") ?? "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [communicationVia, setCommunicationVia] = useState<(typeof COMMUNICATION_OPTIONS)[number]>("Zoom");
  const [error, setError] = useState("");

  const isContextValid = useMemo(() => Boolean(courseTitle && demoDate && demoTime), [courseTitle, demoDate, demoTime]);

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isContextValid) {
      setError("Missing course/date/time details. Please reopen this form from the demo modal.");
      return;
    }
    if (!name || !email || !mobile) {
      setError("Please complete all required fields.");
      return;
    }

    const messageLines = [
      "*Course Demo Request (FREE)*",
      ...getWhatsAppMessageHeader(),
      "",
      `Course: ${courseTitle}`,
      `Date: ${demoDate}`,
      `Time: ${demoTime}`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Mobile: ${mobile}`,
      `Best Communicate via: ${communicationVia}`,
    ];

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join("\n"))}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    window.close();
  };

  return (
    <section className="demo-popup-card">
      <p className="demo-popup-brand">SMEClabs</p>
      <h1 className="demo-popup-title">Course Demo Request (FREE)</h1>
      <p className="demo-popup-subtitle">30 min</p>
      <p className="demo-popup-copy">
        Dear Candidate, Please fill the details below to schedule your Course Demo or career counseling.
      </p>

      {!isContextValid && (
        <p className="demo-popup-error">
          Missing course/date/time context. Please open this form from the course demo modal.
        </p>
      )}

      <form className="demo-popup-form" onSubmit={submitRequest}>
        <label className="demo-popup-label" htmlFor="popup-course">
          Course Title
        </label>
        <input id="popup-course" className="demo-popup-input" value={courseTitle} readOnly />

        <div className="demo-popup-grid">
          <div>
            <label className="demo-popup-label" htmlFor="popup-date">
              Date
            </label>
            <input id="popup-date" className="demo-popup-input" value={demoDate} readOnly />
          </div>
          <div>
            <label className="demo-popup-label" htmlFor="popup-time">
              Time
            </label>
            <input id="popup-time" className="demo-popup-input" value={demoTime} readOnly />
          </div>
        </div>

        <label className="demo-popup-label" htmlFor="popup-name">
          Name of Applicant
        </label>
        <input
          id="popup-name"
          className="demo-popup-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <div className="demo-popup-grid">
          <div>
            <label className="demo-popup-label" htmlFor="popup-email">
              Email
            </label>
            <input
              id="popup-email"
              type="email"
              className="demo-popup-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <label className="demo-popup-label" htmlFor="popup-mobile">
              Mobile Number
            </label>
            <input
              id="popup-mobile"
              type="tel"
              className="demo-popup-input"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              required
            />
          </div>
        </div>

        <fieldset className="demo-popup-fieldset">
          <legend className="demo-popup-label">Best Communicate via</legend>
          <div className="demo-popup-radio-grid">
            {COMMUNICATION_OPTIONS.map((option) => (
              <label key={option} className="demo-popup-radio">
                <input
                  type="radio"
                  name="popup-communication-via"
                  value={option}
                  checked={communicationVia === option}
                  onChange={() => setCommunicationVia(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {error && <p className="demo-popup-error">{error}</p>}

        <button type="submit" className="demo-popup-submit" disabled={!isContextValid}>
          Submit on WhatsApp
        </button>
      </form>
    </section>
  );
}

export default function DemoRequestPage() {
  return (
    <main className="demo-popup-shell">
      <Suspense fallback={
        <section className="demo-popup-card">
          <p className="demo-popup-brand">SMEClabs</p>
          <h1 className="demo-popup-title">Loading...</h1>
        </section>
      }>
        <DemoRequestForm />
      </Suspense>
    </main>
  );
}
