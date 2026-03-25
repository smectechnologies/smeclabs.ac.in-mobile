'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ThemeMode } from './types';

interface PromotionalBannerProps {
  theme: ThemeMode;
}

export default function PromotionalBanner({ theme }: PromotionalBannerProps) {
  return (
    <div style={{ padding: '0.75rem 0' }}>
      <div className="smecnew-banner" role="banner" style={{ margin: '0 0.25rem' }}>
        {/* Background image */}
        <div className="banner-image">
          <Image
            src="/img/home-banner.webp"
            alt=""
            fill
            className="banner-bg-img"
            priority
            aria-hidden="true"
          />
        </div>
        
        {/* Banner content */}
        <div className="banner-content">
          <h1 className="banner-title">Launch Your Career with SMEClabs</h1>
          <p className="banner-subtitle">Gain industry-ready skills through hands-on training in marine, automation, fintech, oil, gas, and engineering</p>
          <Link href="/courses" className="banner-cta" aria-label="Explore all available courses">
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
}