'use client';

import './about-us.css';
import Link from 'next/link';
import Image from 'next/image';
import SmecnewLayout from '../components/smecnew/SmecnewLayout';

const whyPoints = [
  'Affiliated to NACTET (nactetindia.org)',
  'Training by highly experienced and certified professionals',
  'ISO 9001:2015 Certified Institution',
  'No slideshow (PPT) training — fully Hands-on',
  'Interactive sessions with interview Q&As',
  'Real-time project scenarios & Certification Help',
  '100% Placement Assistance',
  'Located near City Center Kaloor, Kochi',
  'Easy access from any part of Kochi',
  'Most competitive & affordable course fees',
];

const services = [
  { icon: 'https://api.iconify.design/mdi:school.svg?color=%230d9488&width=28&height=28',           title: 'Students',                desc: 'Expert-led, research-driven training with accredited programs to bridge skill gaps and ensure career success.' },
  { icon: 'https://api.iconify.design/mdi:domain.svg?color=%230d9488&width=28&height=28',           title: 'Corporates & Professionals', desc: 'Workforce skills like innovation, problem-solving, and bold thinking to achieve outstanding results.' },
  { icon: 'https://api.iconify.design/mdi:account-group.svg?color=%230d9488&width=28&height=28',    title: 'Staffing',                desc: 'Connecting companies with trained professionals and tailored upskilling programs for workforce growth.' },
  { icon: 'https://api.iconify.design/mdi:flask.svg?color=%230d9488&width=28&height=28',            title: 'Research & Development',  desc: 'Advanced labs and skilled professionals driving technological advancements and impactful R&D.' },
  { icon: 'https://api.iconify.design/mdi:university.svg?color=%230d9488&width=28&height=28',       title: 'Campus Connect',           desc: 'Campus seminars, workshops, placement drives and internships for college students.' },
  { icon: 'https://api.iconify.design/mdi:lightbulb-on.svg?color=%230d9488&width=28&height=28',     title: 'Consultants',              desc: '20+ years of excellence delivering practical, cost-effective solutions for critical decisions.' },
  { icon: 'https://api.iconify.design/mdi:wrench-clock.svg?color=%230d9488&width=28&height=28',     title: 'On-Going Project Support', desc: 'Expert consulting with objective insights to help organizations execute key projects successfully.' },
  { icon: 'https://api.iconify.design/mdi:monitor-dashboard.svg?color=%230d9488&width=28&height=28',title: 'IT Solutions',             desc: 'Software development, cybersecurity, cloud computing, and automation — scalable and cost-effective.' },
];

const stats = [
  { value: '1,328+', label: 'Google Reviews' },
  { value: '50+',    label: 'Courses' },
  { value: '1L+',    label: 'Placements' },
  { value: '1,000+', label: 'Companies' },
];

export default function AboutUsClient() {
  return (
    <SmecnewLayout>
      {/* Hero */}
      <header className="about-us-hero">
        <p className="about-us-eyebrow">Who We Are</p>
        <h1 className="about-us-title">About Us</h1>
        <p className="about-us-desc">
          25 years of excellence in skill development, industry training, and career transformation
        </p>
      </header>

      <div className="about-us-content">

        {/* Who We Are — images + text */}
        <section className="about-us-section">
          <h2 className="section-heading">Who We Are</h2>

          {/* Scrollable image strip */}
          <div className="who-we-are-images">
            <div className="who-img-wrap">
              <Image src="/about-us/office.webp" alt="SMEClabs office" fill style={{ objectFit: 'cover' }} sizes="320px" />
            </div>
            <div className="who-img-wrap">
              <Image src="/about-us/Certified-Quality-Safety-Engineer.webp" alt="Certified Quality Safety Engineer course" fill style={{ objectFit: 'cover' }} sizes="320px" />
            </div>
            <div className="who-img-wrap">
              <Image src="/about-us/Professional-Diploma-in-Corporate-Accounting-Management.webp" alt="Professional Diploma in Corporate Accounting Management" fill style={{ objectFit: 'cover' }} sizes="320px" />
            </div>
          </div>

          <span className="iso-badge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://api.iconify.design/mdi:shield-check.svg?color=%2300a99e&width=16&height=16" alt="" width={16} height={16} aria-hidden="true" />
            ISO 9001:2015 Certified Training Center
          </span>

          <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: 'color-mix(in oklab, var(--foreground), transparent 25%)', margin: '0 0 0.75rem' }}>
            SMEClabs, founded in early 2001 as the R&D and training division of <strong>SMEC Automation Pvt. Ltd.</strong>, is based in Kochi, Kerala. Recognised by <strong>Microsoft, Schneider Electric,</strong> and <strong>Certiport</strong>, and accredited by <strong>NSDC</strong> and <strong>India International Skill Centre (IISC)</strong>.
          </p>
        </section>

        {/* Why SMEClabs */}
        <section className="about-us-section">
          <h2 className="section-heading">Why SMEClabs</h2>
          <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'rgba(1,169,158,1)', margin: '0 0 0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            25 Years of Excellence
          </p>
          <ul className="why-list">
            {whyPoints.map((pt, i) => (
              <li key={i}>
                <span className="why-check">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://api.iconify.design/mdi:check.svg?color=%23ffffff&width=12&height=12" alt="" width={12} height={12} aria-hidden="true" />
                </span>
                {pt}
              </li>
            ))}
          </ul>
          <Link href="/courses" style={{ display: 'inline-block', marginTop: '1.25rem', padding: '0.75rem 1.75rem', background: 'linear-gradient(135deg, rgba(1,169,158,1), rgba(1,169,158,0.8))', color: '#fff', borderRadius: 999, fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none', boxShadow: '0 8px 20px rgba(1,169,158,0.35)' }}>
            Become a Student →
          </Link>
        </section>

        {/* MD Message */}
        <section className="about-us-section">
          <h2 className="section-heading">Message from the Managing Director</h2>
          <div className="md-card">
            <span className="md-quote-mark">"</span>
            <p className="md-text" style={{ paddingTop: '1.5rem' }}>
              It is with great pride that I reflect on the extraordinary journey of SMEClabs as we stand on the threshold of our <strong>25th year</strong>. For the past 24 years, we've been dedicated to shaping talent and empowering individuals to thrive in an ever-changing industry. We've trained lakhs of people and achieved <strong>1 lakh+ placements</strong>, guiding countless individuals toward rewarding careers in technology.
            </p>
            <p className="md-text">
              Excellence, dedication, and integrity are more than just words to us. When the right guidance meets the right ambition, success isn't just a goal — it's a guarantee. As we celebrate 25 incredible years, the best is yet to come!
            </p>
            <div className="md-profile">
              <div className="md-avatar">
                <Image src="/about-us/Saiju-Mohammed-Managing-Director-SMEC-Automation.jpg" alt="Saiju Mohamed, Managing Director" width={52} height={52} style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <p className="md-name">Saiju Mohamed</p>
                <p className="md-role">Managing Director, SMEClabs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="about-us-section">
          <h2 className="section-heading">Our Services</h2>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.icon} alt="" width={28} height={28} aria-hidden="true" className="service-icon" />
                <p className="service-title">{s.title}</p>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="about-us-section">
          <h2 className="section-heading">Why Should You Prefer Us</h2>
          <p style={{ fontSize: '0.82rem', color: 'color-mix(in oklab, var(--foreground), transparent 35%)', margin: '0 0 1rem' }}>
            Enhance Your Skills to Accelerate Your Career Growth
          </p>
          <div className="about-stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="about-stat-card">
                <p className="about-stat-number">{s.value}</p>
                <p className="about-stat-label">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Referral CTA */}
        <div className="about-referral-cta">
          <p className="referral-eyebrow">Are you a SMEClabs student?</p>
          <h3 className="referral-heading">Refer Your Friend & Earn Up To ₹1500</h3>
          <p className="referral-sub">Special Referral Program</p>
          <Link href="/courses" className="referral-btn">Become a Student</Link>
        </div>

      </div>
    </SmecnewLayout>
  );
}
