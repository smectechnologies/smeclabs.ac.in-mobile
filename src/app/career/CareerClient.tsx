"use client";

import "./career.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import SmecnewLayout from "../components/smecnew/SmecnewLayout";

type RouteItem = {
  id: string;
  shortLabel: string;
  href: string;
};

const placementPosters = [
  { id: 1, title: "Placement 1", image: "/placements/placement01.webp" },
  { id: 2, title: "Placement 2", image: "/placements/placement02.webp" },
  { id: 3, title: "Placement 3", image: "/placements/placement03.webp" },
  { id: 4, title: "Placement 4", image: "/placements/placement04.webp" },
  { id: 5, title: "Placement 5", image: "/placements/placement05.webp" },
  { id: 6, title: "Placement 6", image: "/placements/placement06.jpg" },
  { id: 7, title: "Placement 7", image: "/placements/placement07.webp" },
  { id: 8, title: "Placement 8", image: "/placements/placement08.webp" },
];

const youtubeVideos = [
  { id: "VwKKxAsB4Qc", title: "Student Testimonial - Software Engineer" },
  { id: "XNnDWChcHI8", title: "Placement Success Story - Automation" },
  { id: "2rhm9KLzEi4", title: "Career Journey - Data Science" },
  { id: "QiMe3iofxH4", title: "Industry Expert Talk" },
];

export default function CareerClient() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [activePosterId, setActivePosterId] = useState(1);
  
  const activePoster = placementPosters.find(p => p.id === activePosterId) || placementPosters[0];

  useEffect(() => {
    const container = document.querySelector('.gallery-thumbnails');
    if (!container) return;

    const handleScroll = () => {
      const thumbs = container.querySelectorAll('.gallery-thumb');
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestThumb: HTMLElement | null = null;
      let closestDistance = Infinity;

      thumbs.forEach((thumb) => {
        if (!(thumb instanceof HTMLElement)) return;
        
        const thumbRect = thumb.getBoundingClientRect();
        const thumbCenter = thumbRect.left + thumbRect.width / 2;
        const distance = Math.abs(containerCenter - thumbCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestThumb = thumb;
        }
      });

      if (closestThumb) {
        const thumbId = parseInt((closestThumb as HTMLElement).getAttribute('data-id') || '1');
        setActivePosterId(thumbId);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <SmecnewLayout>
      <header className="career-hero">
        <p className="career-eyebrow">Success Stories & Achievements</p>
        <h1 className="career-title">Career & Placements</h1>
        <p className="career-desc">
          Discover how our students transform their careers with industry-focused training and placement support
        </p>
      </header>

          <div className="career-content">
            {/* Placement Posters Gallery */}
            <section className="career-section">
              <h2 className="section-heading">Placement Gallery</h2>
              <div className="placement-gallery">
                {/* Large Active Image */}
                <div className="gallery-main">
                  <div className="gallery-main-image">
                    <img 
                      src={activePoster.image} 
                      alt={activePoster.title}
                      className="gallery-main-img"
                    />
                  </div>
                </div>
                
                {/* Scrollable Thumbnails */}
                <div className="gallery-thumbnails">
                  {placementPosters.map((poster) => (
                    <button
                      key={poster.id}
                      data-id={poster.id}
                      className={`gallery-thumb ${poster.id === activePosterId ? 'active' : ''}`}
                      onClick={() => setActivePosterId(poster.id)}
                      type="button"
                    >
                      <div className="gallery-thumb-image">
                        <img 
                          src={poster.image} 
                          alt={poster.title}
                          className="gallery-thumb-img"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Instagram Feed */}
            <section className="career-section">
              <h2 className="section-heading">Follow Our Journey</h2>
              <div className="instagram-reels-grid">
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-permalink="https://www.instagram.com/reel/DVLlj8hky79/?utm_source=ig_embed&utm_campaign=loading" 
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: '3px',
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                    margin: '1px',
                    maxWidth: '540px',
                    minWidth: '326px',
                    padding: 0,
                    width: 'calc(100% - 2px)'
                  }}
                />
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-permalink="https://www.instagram.com/reel/DVGeJftE5WZ/?utm_source=ig_embed&utm_campaign=loading" 
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: '3px',
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                    margin: '1px',
                    maxWidth: '540px',
                    minWidth: '326px',
                    padding: 0,
                    width: 'calc(100% - 2px)'
                  }}
                />
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-permalink="https://www.instagram.com/reel/DVI-gYdk5Ee/?utm_source=ig_embed&utm_campaign=loading" 
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: '3px',
                    boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                    margin: '1px',
                    maxWidth: '540px',
                    minWidth: '326px',
                    padding: 0,
                    width: 'calc(100% - 2px)'
                  }}
                />
              </div>
              <div className="instagram-cta">
                <a
                  href="https://www.instagram.com/smeclabs_official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-link"
                >
                  Follow @smeclabs_official on Instagram
                </a>
              </div>
            </section>

            {/* YouTube Videos */}
            <section className="career-section">
              <h2 className="section-heading">Student Testimonials</h2>
              <div className="video-grid">
                {youtubeVideos.map((video, index) => (
                  <button
                    key={index}
                    className="video-card"
                    onClick={() => setSelectedVideo(video.id)}
                    type="button"
                  >
                    <div className="video-thumbnail">
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="video-thumbnail-image"
                        onError={(e) => {
                          // Fallback to standard quality if maxres not available
                          e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="video-overlay">
                        <svg viewBox="0 0 24 24" className="play-icon">
                          <path
                            fill="currentColor"
                            d="M8 5.14v14l11-7-11-7z"
                          />
                        </svg>
                      </div>
                      <span className="video-title">{video.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Careers at SMEClabs */}
            <section className="career-section careers-join-section">
              <div className="careers-join-hero">
                <h2 className="careers-join-title">Shape Your Professional Journey with a Team That Values Innovation</h2>
                <p className="careers-join-desc">
                  At SMEClabs, we prioritize our people and cultivate a culture of innovation, collaboration, and continuous growth. Whether you&apos;re launching your career or are a seasoned professional, we provide opportunities to enhance your skills and drive meaningful impact. Our dynamic work environment encourages creativity and problem-solving, empowering individuals to excel in their roles. With access to cutting-edge technology, industry-relevant training, and mentorship from experts, SMEClabs ensures that every team member thrives professionally. Join us to be part of a forward-thinking organization that values talent, fosters development, and helps shape the future of technology and innovation.
                </p>
              </div>

              {/* Why Work With Us */}
              <div className="careers-why-section">
                <h3 className="careers-sub-heading">Why Work With Us</h3>
                <div className="careers-benefits-grid">
                  <div className="careers-benefit-card">
                    <span className="careers-benefit-icon">⚖️</span>
                    <h4>Work-Life Balance</h4>
                    <p>Flexible working hours and remote work options to help you maintain a healthy work-life balance.</p>
                  </div>
                  <div className="careers-benefit-card">
                    <span className="careers-benefit-icon">📈</span>
                    <h4>Growth Opportunities</h4>
                    <p>Continuous learning and development programs to help you grow professionally.</p>
                  </div>
                  <div className="careers-benefit-card">
                    <span className="careers-benefit-icon">🏥</span>
                    <h4>Health &amp; Wellness</h4>
                    <p>Comprehensive health insurance and wellness programs for you and your family.</p>
                  </div>
                  <div className="careers-benefit-card">
                    <span className="careers-benefit-icon">🤝</span>
                    <h4>Inclusive Culture</h4>
                    <p>A diverse and inclusive workplace where everyone feels welcome and valued.</p>
                  </div>
                </div>
              </div>

              {/* Current Openings */}
              <div className="careers-openings-section">
                <h3 className="careers-sub-heading">Current Openings</h3>
                <div className="careers-job-card">
                  <div className="careers-job-header">
                    <h4 className="careers-job-title">Junior Python Engineer</h4>
                    <span className="careers-job-badge">Open</span>
                  </div>
                  <p className="careers-job-summary">
                    We are looking for a motivated Junior Python Engineer to join our development team. This role involves collaborating with senior engineers to build and maintain software solutions, troubleshoot code, and enhance application performance. You&apos;ll work on developing clean, efficient, and scalable code in Python to support various applications.
                  </p>
                  <div className="careers-job-details">
                    <div>
                      <strong>Responsibilities:</strong>
                      <ul>
                        <li>Write, test, and debug Python code.</li>
                        <li>Collaborate with team members on software development projects.</li>
                        <li>Assist in maintaining and optimizing existing codebases.</li>
                        <li>Document code and processes effectively.</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Qualifications:</strong>
                      <ul>
                        <li>Bachelor&apos;s degree in Computer Science, Software Engineering, or a related field.</li>
                        <li>Proficiency in Python programming.</li>
                        <li>Basic understanding of version control (Git) and software development principles.</li>
                      </ul>
                    </div>
                  </div>
                  <a href="mailto:careers@smeclabs.ac.in" className="careers-apply-btn">Apply Now</a>
                </div>

                <div className="careers-job-card careers-job-card--coming-soon">
                  <h4 className="careers-job-title">Network Engineer</h4>
                  <span className="careers-job-badge careers-job-badge--soon">Coming Soon</span>
                </div>
                <div className="careers-job-card careers-job-card--coming-soon">
                  <h4 className="careers-job-title">Data Science Engineer</h4>
                  <span className="careers-job-badge careers-job-badge--soon">Coming Soon</span>
                </div>
              </div>

              {/* Stats */}
              <div className="careers-stats-row">
                <div className="careers-stat"><span className="careers-stat-num">1,328+</span><span className="careers-stat-label">Google Reviews</span></div>
                <div className="careers-stat"><span className="careers-stat-num">50+</span><span className="careers-stat-label">Courses</span></div>
                <div className="careers-stat"><span className="careers-stat-num">100,000+</span><span className="careers-stat-label">Placements</span></div>
                <div className="careers-stat"><span className="careers-stat-num">1,000+</span><span className="careers-stat-label">Companies</span></div>
              </div>

              {/* Referral Program */}
              <div className="careers-referral-banner">
                <div className="careers-referral-content">
                  <p className="careers-referral-eyebrow">ARE YOU A SMEClabs STUDENT?</p>
                  <h3 className="careers-referral-title">Refer Your Friend &amp; Earn Up To ₹1500</h3>
                  <p className="careers-referral-sub">Special Referral Program</p>
                  <Link href="/contact-us" className="careers-referral-btn">Become a Student</Link>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="career-cta">
              <h2 className="cta-heading">Ready to Start Your Career Journey?</h2>
              <p className="cta-text">Join thousands of successful students who transformed their careers with SMEClabs</p>
              <div className="cta-buttons">
                <Link href="/courses" className="cta-button primary">
                  Explore Courses
                </Link>
                <button type="button" className="cta-button secondary">
                  Contact Us
                </button>
              </div>
            </section>
          </div>

      {selectedVideo && (
        <div className="video-modal-backdrop" onClick={() => setSelectedVideo(null)} role="presentation">
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="video-modal-close"
              onClick={() => setSelectedVideo(null)}
              aria-label="Close video"
            >
              ×
            </button>
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </SmecnewLayout>
  );
}
