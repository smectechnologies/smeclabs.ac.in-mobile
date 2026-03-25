"use client";

import "./contact.css";
import Link from "next/link";
import { useState } from "react";
import SmecnewLayout from "../components/smecnew/SmecnewLayout";
import { WHATSAPP_NUMBER, getWhatsAppMessageHeader } from "../whatsappMeta";

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageLines = [
      "*New Contact Form Submission*",
      ...getWhatsAppMessageHeader(),
      "",
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Phone:* ${formData.phone}`,
      `*Message:* ${formData.message}`,
    ];

    const whatsappMessage = encodeURIComponent(messageLines.join("\n"));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, "_blank", "noopener,noreferrer");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SmecnewLayout>
      <header className="contact-hero">
        <p className="contact-eyebrow">Let&apos;s Connect</p>
        <h1 className="contact-title">Get In Touch</h1>
        <p className="contact-desc">
          Have questions? We&apos;re here to help you start your career journey
        </p>
      </header>

          <div className="contact-content">
            {/* Contact Information Cards */}
            <div className="contact-info-grid">
              <a href="tel:+919656227714" className="contact-info-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">Call Us</h3>
                  <p className="contact-info-value">+91 9656227714</p>
                </div>
              </a>

              <a href="mailto:training@smeclabs.org" className="contact-info-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">Email Us</h3>
                  <p className="contact-info-value">training@smeclabs.org</p>
                </div>
              </a>

              <div className="contact-info-card location-card">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">Visit Us</h3>
                  <p className="contact-info-value">
                    2nd Floor, Kaloor Complex<br />
                    Kochi, Kerala, India - 682017
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <section className="contact-section">
              <h2 className="section-heading">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                    rows={4}
                    required
                  />
                </div>

                <button type="submit" className="form-submit">
                  <span>Send Message</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="submit-icon">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </section>

            {/* Google Map */}
            <section className="contact-section">
              <h2 className="section-heading">Find Us on Map</h2>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.272536362797!2d76.28959777602837!3d9.994331773130176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d403a0ee5b7%3A0xbb919585c97332e9!2sSMEClabs!5e0!3m2!1sen!2sin!4v1772016431441!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SMEClabs Location"
                  className="map-iframe"
                />
              </div>
            </section>
          </div>
    </SmecnewLayout>
  );
}
