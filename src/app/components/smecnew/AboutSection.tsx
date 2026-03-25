'use client';

import Link from 'next/link';
import { ThemeMode } from './types';

interface AboutSectionProps {
  theme: ThemeMode;
}

const sectors = [
  {
    icon: 'https://api.iconify.design/mdi:school.svg?color=%230c5adb&width=26&height=26',
    name: 'Education',
    description: 'Quality training programs',
    bg: '#eff6ff',
    accent: '#0c5adb',
  },
  {
    icon: 'https://api.iconify.design/mdi:factory.svg?color=%23ea580c&width=26&height=26',
    name: 'Industry',
    description: 'Real-world applications',
    bg: '#fff7ed',
    accent: '#ea580c',
  },
  {
    icon: 'https://api.iconify.design/mdi:anchor.svg?color=%230d9488&width=26&height=26',
    name: 'Marine',
    description: 'Maritime operations',
    bg: '#f0fdfa',
    accent: '#0d9488',
  },
  {
    icon: 'https://api.iconify.design/mdi:oil-pump.svg?color=%237c3aed&width=26&height=26',
    name: 'Offshore',
    description: 'Offshore services',
    bg: '#f5f3ff',
    accent: '#7c3aed',
  },
  {
    icon: 'https://api.iconify.design/mdi:laptop.svg?color=%2316a34a&width=26&height=26',
    name: 'IT',
    description: 'Technology solutions',
    bg: '#f0fdf4',
    accent: '#16a34a',
  },
  {
    icon: 'https://api.iconify.design/mdi:tools.svg?color=%23ca8a04&width=26&height=26',
    name: 'Training',
    description: 'Hands-on learning',
    bg: '#fefce8',
    accent: '#ca8a04',
  },
];

export default function AboutSection({ theme }: AboutSectionProps) {
  return (
    <section className="smecnew-section about-section">
      {/* Top label + heading */}
      <div className="about-header">
        <p className="about-eyebrow">Who We Are</p>
        <h2 className="about-title">About SMEClabs</h2>
      </div>

      {/* Brand card */}
      <div className="about-brand-card">
        <div className="about-brand-logo-row">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://api.iconify.design/mdi:domain.svg?color=%230c5adb&width=36&height=36"
            alt=""
            width={36}
            height={36}
            aria-hidden="true"
          />
          <span className="about-brand-name">SMEC Group</span>
        </div>
        <p className="about-desc">
          SMEC is a multifaceted organization spanning education, industry, marine, offshore, IT, and training — committed to innovation and building industry-ready professionals since 1998.
        </p>
        <div className="about-stats-row">
          <div className="about-stat">
            <span className="about-stat-val">25+</span>
            <span className="about-stat-lbl">Years</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="about-stat-val">1L+</span>
            <span className="about-stat-lbl">Placed</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="about-stat-val">50+</span>
            <span className="about-stat-lbl">Courses</span>
          </div>
        </div>
      </div>

      {/* Sectors grid */}
      <p className="about-sectors-label">Our Sectors</p>
      <div className="about-sectors-grid">
        {sectors.map((s, i) => (
          <div
            key={i}
            className="about-sector-card"
            style={{ '--s-accent': s.accent, '--s-bg': s.bg } as React.CSSProperties}
          >
            <div className="about-sector-icon">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.icon} alt="" width={26} height={26} aria-hidden="true" />
            </div>
            <span className="about-sector-name">{s.name}</span>
            <span className="about-sector-desc">{s.description}</span>
          </div>
        ))}
      </div>

      <Link href="/contact-us" className="about-cta">
        Get in Touch →
      </Link>
    </section>
  );
}
