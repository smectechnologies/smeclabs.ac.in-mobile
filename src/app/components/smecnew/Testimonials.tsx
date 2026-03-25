'use client';

import { ThemeMode } from './types';

interface TestimonialsProps {
  theme: ThemeMode;
}

export default function Testimonials({ theme }: TestimonialsProps) {
  const testimonials = [
    {
      name: "Rahul Kumar",
      course: "Industrial Automation",
      company: "Tech Solutions Ltd",
      text: "SMEClabs transformed my career. The hands-on training and placement support helped me land my dream job.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      course: "Data Science",
      company: "Analytics Corp",
      text: "Excellent training program with industry experts. Highly recommend for anyone looking to upskill.",
      rating: 5
    },
    {
      name: "Arun Menon",
      course: "Full Stack Development",
      company: "Digital Innovations",
      text: "The practical approach and real-world projects prepared me perfectly for the industry.",
      rating: 5
    }
  ];

  return (
    <div className="smecnew-section">
      <h2 className="section-heading">What Our Students Say</h2>
      <div 
        style={{
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          paddingBottom: '0.5rem',
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 280px',
              background: theme === 'light' ? '#fff' : '#374151',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              scrollSnapAlign: 'start',
            }}
          >
            <div style={{ marginBottom: '0.75rem' }}>
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} style={{ color: '#fbbf24', fontSize: '1rem' }}>⭐</span>
              ))}
            </div>
            <p 
              style={{
                fontSize: '0.85rem',
                color: theme === 'light' ? '#4b5563' : '#d1d5db',
                lineHeight: '1.5',
                marginBottom: '1rem',
                fontStyle: 'italic',
              }}
            >
              "{testimonial.text}"
            </p>
            <div>
              <p 
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: theme === 'light' ? '#1f2937' : '#f9fafb',
                  marginBottom: '0.25rem',
                }}
              >
                {testimonial.name}
              </p>
              <p 
                style={{
                  fontSize: '0.75rem',
                  color: theme === 'light' ? '#6b7280' : '#9ca3af',
                  margin: 0,
                }}
              >
                {testimonial.course} • {testimonial.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
