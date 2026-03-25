'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeMode, getThemeColors } from './types';
import { courses } from '../../courses/courseData';

interface LocationHeaderProps {
  theme: ThemeMode;
  onSearch?: (query: string) => void;
}

export default function LocationHeader({ theme, onSearch }: LocationHeaderProps) {
  const themeColors = getThemeColors(theme);
  const logoSrc = theme === "dark" ? "/img/logo-dark.png" : "/img/logo-new.webp";
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = searchQuery.trim().length > 0
    ? courses.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleSelect = () => {
    setSearchQuery('');
    onSearch?.('');
    inputRef.current?.blur();
    setIsFocused(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showDropdown = isFocused && filtered.length > 0;

  return (
    <header
      className={`smecnew-header ${theme}`}
      role="banner"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: themeColors.surface,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        padding: '0.75rem 0.75rem',
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0, 180px)',
        gap: '0.5rem',
        alignItems: 'center',
        borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`
      }}
    >
      {/* Logo */}
      <div className="smecnew-logo" style={{ flexShrink: 0 }}>
        <Image
          src={logoSrc}
          alt="SMEClabs - Leading Skill Development and Training Provider"
          width={120}
          height={33}
          priority
          className="header-logo"
          style={{ height: 'auto' }}
        />
      </div>

      {/* Search Bar + Dropdown */}
      <div style={{ position: 'relative', minWidth: 0 }}>
        <div className={`smecnew-search-bar ${isFocused ? 'focused' : ''}`} style={{ margin: 0, minWidth: 0 }}>
          <div className="search-icon" style={{ flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            placeholder="Search courses..."
            className="search-input"
            aria-label="Search for courses"
            role="searchbox"
            style={{ fontSize: '0.8rem', minWidth: 0 }}
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); onSearch?.(''); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 0.25rem', color: '#9ca3af', flexShrink: 0, fontSize: '0.8rem' }}
              aria-label="Clear search"
            >✕</button>
          )}
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: 'calc(100% + 4px)',
              left: 0,
              right: 0,
              background: themeColors.surface,
              border: `1px solid ${theme === 'light' ? '#e5e7eb' : '#374151'}`,
              borderRadius: '0.75rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              zIndex: 50,
              overflow: 'hidden',
            }}
          >
            {filtered.map((course, i) => (
              <Link
                key={course.slug}
                href={`/${course.slug}`}
                onClick={handleSelect}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  textDecoration: 'none',
                  borderBottom: i < filtered.length - 1 ? `1px solid ${theme === 'light' ? '#f3f4f6' : '#374151'}` : 'none',
                  color: themeColors.foreground,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, opacity: 0.4 }}>
                  <path d="M21 21L16.514 16.506M19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{course.title}</div>
                  <div style={{ fontSize: '0.68rem', opacity: 0.5 }}>{course.category}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
