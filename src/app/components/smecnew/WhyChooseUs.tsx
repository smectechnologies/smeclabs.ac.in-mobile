'use client';

import { ThemeMode } from './types';

interface WhyChooseUsProps {
  theme: ThemeMode;
}

const features = [
  {
    icon: 'https://api.iconify.design/mdi:bullseye-arrow.svg?color=%230c5adb&width=28&height=28',
    title: 'Industry-Ready Skills',
    description: 'Hands-on training designed to meet current industry demands',
    accent: '#0c5adb',
    bg: '#eff6ff',
  },
  {
    icon: 'https://api.iconify.design/mdi:account-tie.svg?color=%2316a34a&width=28&height=28',
    title: 'Expert Trainers',
    description: 'Learn from professionals with real-world experience',
    accent: '#16a34a',
    bg: '#f0fdf4',
  },
  {
    icon: 'https://api.iconify.design/mdi:briefcase-check.svg?color=%23ea580c&width=28&height=28',
    title: '1L+ Placements',
    description: 'Over 1 lakh successful placements and counting',
    accent: '#ea580c',
    bg: '#fff7ed',
  },
  {
    icon: 'https://api.iconify.design/mdi:handshake.svg?color=%237c3aed&width=28&height=28',
    title: 'Industry Partnerships',
    description: 'Strong connections with leading companies worldwide',
    accent: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    icon: 'https://api.iconify.design/mdi:certificate.svg?color=%230d9488&width=28&height=28',
    title: 'Recognized Certificates',
    description: 'Industry-recognized certifications upon completion',
    accent: '#0d9488',
    bg: '#f0fdfa',
  },
  {
    icon: 'https://api.iconify.design/mdi:trophy.svg?color=%23ca8a04&width=28&height=28',
    title: '25+ Years Experience',
    description: 'Trusted name in skill development for over two decades',
    accent: '#ca8a04',
    bg: '#fefce8',
  },
];

export default function WhyChooseUs({ theme }: WhyChooseUsProps) {
  return (
    <section className="smecnew-section wcu-section">
      <div className="wcu-header">
        <p className="wcu-eyebrow">Our Strengths</p>
        <h2 className="wcu-title">Why Choose SMEClabs?</h2>
        <p className="wcu-subtitle">Trusted by 1 lakh+ students across India</p>
      </div>

      <div className="wcu-grid">
        {features.map((f, i) => (
          <div
            key={i}
            className="wcu-card"
            style={{ '--accent': f.accent, '--bg': f.bg } as React.CSSProperties}
          >
            <div className="wcu-icon-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.icon} alt="" width={28} height={28} aria-hidden="true" />
            </div>
            <div className="wcu-text">
              <h3 className="wcu-card-title">{f.title}</h3>
              <p className="wcu-card-desc">{f.description}</p>
            </div>
            <div className="wcu-card-arrow">›</div>
          </div>
        ))}
      </div>
    </section>
  );
}
