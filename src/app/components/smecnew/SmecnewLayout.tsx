'use client';

import { useEffect, useSyncExternalStore, ReactNode } from 'react';
import LocationHeader from './LocationHeader';
import FooterNavigation from './FooterNavigation';
import FloatingActions from './FloatingActions';

type ThemeMode = "light" | "dark";

function subscribeTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getThemeSnapshot(): ThemeMode {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getThemeServerSnapshot(): ThemeMode {
  return "light";
}

interface SmecnewLayoutProps {
  children: ReactNode;
  onSearch?: (query: string) => void;
}

export default function SmecnewLayout({ children, onSearch }: SmecnewLayoutProps) {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <main className="home-shell" role="main">
      <div className="mobile-shell">
        {/* Sticky Header with Logo and Search */}
        <LocationHeader theme={theme} onSearch={onSearch} />

        {/* Scrollable Content Area */}
        <div className="smecnew-panel">
          {children}
        </div>

        {/* Footer Navigation - fixed inside shell */}
        <FooterNavigation theme={theme} />

        {/* Floating Action Buttons */}
        <FloatingActions />
      </div>
    </main>
  );
}
