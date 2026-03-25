/**
 * Shared TypeScript interfaces for smecnew-style homepage components
 * Feature: smecnew-style-homepage-redesign
 */

// Theme types
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background: string;
  foreground: string;
  surface: string;
  surfaceSoft: string;
  brandPrimary: string;
  brandSecondary: string;
  brandAccent: string;
  lineColor: string;
}

// Course data model
export interface Course {
  id: string;
  name: string;
  slug: string;
  description: string;
  duration: string;
  rating: number;
  studentCount: number;
  thumbnail?: string;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Category data model
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  courseCount: number;
  order: number;
}

// Navigation item model
export interface NavigationItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: string;
  order: number;
  external: boolean;
}

// Location model
export interface Location {
  city: string;
  state: string;
  country: string;
  displayText: string;
}

// Platform statistics model
export interface PlatformStats {
  placements: {
    value: number;
    displayValue: string;
    label: string;
  };
  experience: {
    value: number;
    displayValue: string;
    label: string;
  };
  courses: {
    value: number;
    displayValue: string;
    label: string;
  };
}

// Theme configuration constants
export const lightTheme: ThemeColors = {
  background: '#f5f9ff',
  foreground: '#0f1e35',
  surface: '#ffffff',
  surfaceSoft: '#e8f1ff',
  brandPrimary: '#0c5adb',
  brandSecondary: '#1da1f2',
  brandAccent: '#ff7f2a',
  lineColor: 'color-mix(in oklab, #0c5adb, white 62%)',
};

export const darkTheme: ThemeColors = {
  background: '#0a1929',
  foreground: '#e3f2fd',
  surface: '#132f4c',
  surfaceSoft: '#1a3a52',
  brandPrimary: '#01a99e',
  brandSecondary: '#00d4c4',
  brandAccent: '#ffab61',
  lineColor: 'color-mix(in oklab, #01a99e, black 52%)',
};

// Theme detection utilities using useSyncExternalStore
export function subscribeTheme(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

export function getThemeSnapshot(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }
  
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch (error) {
    console.warn('Theme detection failed, defaulting to light mode', error);
    return 'light';
  }
}

export function getThemeServerSnapshot(): ThemeMode {
  return 'light'; // Default to light theme on server
}

export function getThemeColors(theme: ThemeMode): ThemeColors {
  return theme === 'dark' ? darkTheme : lightTheme;
}
