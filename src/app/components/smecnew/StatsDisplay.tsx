'use client';

import React from 'react';
import { ThemeMode, PlatformStats } from './types';

interface StatsDisplayProps {
  stats: PlatformStats;
  theme: ThemeMode;
}

export default function StatsDisplay({ stats, theme }: StatsDisplayProps) {
  return (
    <section className="smecnew-section" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
      <div className={`stats-container ${theme === 'dark' ? 'dark' : ''}`} role="group" aria-label="Key platform metrics">
        <div className="stat-item">
          <div className="stat-number" aria-label={`${stats.placements.displayValue} ${stats.placements.label}`}>
            {stats.placements.displayValue}
          </div>
          <div className="stat-label" aria-hidden="true">{stats.placements.label}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" aria-label={`${stats.experience.displayValue} ${stats.experience.label}`}>
            {stats.experience.displayValue}
          </div>
          <div className="stat-label" aria-hidden="true">{stats.experience.label}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" aria-label={`${stats.courses.displayValue} ${stats.courses.label}`}>
            {stats.courses.displayValue}
          </div>
          <div className="stat-label" aria-hidden="true">{stats.courses.label}</div>
        </div>
      </div>
    </section>
  );
}
