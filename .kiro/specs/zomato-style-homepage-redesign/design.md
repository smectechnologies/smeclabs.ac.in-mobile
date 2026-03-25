# Design Document: Zomato-Style Homepage Redesign

## Overview

This design document outlines the technical architecture and implementation strategy for redesigning the SMEClabs homepage with a Zomato mobile app-inspired interface. The redesign transforms the existing homepage into a modern, mobile-first experience while maintaining the established brand identity and color scheme.

### Design Goals

- Create a mobile-first responsive layout optimized for 390px viewport
- Implement Zomato-inspired UI patterns for improved navigation and content discovery
- Maintain existing brand colors (#0c5adb for light mode, #01a99e for dark mode)
- Ensure smooth animations and transitions for polished user experience
- Preserve accessibility standards with keyboard navigation and screen reader support
- Optimize performance with lazy loading and Next.js Image optimization

### Key Design Principles

1. **Mobile-First**: Design starts with mobile viewport and scales up
2. **Brand Consistency**: Preserve existing color scheme from globals.css
3. **Progressive Enhancement**: Core functionality works without JavaScript
4. **Accessibility**: WCAG-compliant with proper ARIA labels and keyboard navigation
5. **Performance**: Optimized assets and minimal layout shifts

## Architecture

### High-Level Architecture

The homepage follows a component-based architecture using Next.js 14 with React Server Components where possible, and Client Components for interactive elements.

```
┌─────────────────────────────────────┐
│         page.tsx (RSC)              │
│  - Metadata configuration           │
│  - SEO optimization                 │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│      HomeClient.tsx (Client)        │
│  - Theme detection                  │
│  - Route management                 │
│  - State coordination               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│         Component Layer             │
├─────────────────────────────────────┤
│  - LocationHeader                   │
│  - SearchBar                        │
│  - PromotionalBanner                │
│  - CategoryGrid                     │
│  - FeaturedCourses                  │
│  - StatsDisplay                     │
│  - FooterNavigation                 │
│  - FloatingActionButtons            │
└─────────────────────────────────────┘
```

### Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS Modules with Tailwind CSS utilities
- **State Management**: React hooks (useState, useEffect, useSyncExternalStore)
- **Image Optimization**: Next.js Image component
- **Routing**: Next.js Link component with prefetching

### File Structure

```
src/
├── app/
│   ├── page.tsx                    # Server component with metadata
│   ├── HomeClient.tsx              # Main client component
│   ├── globals.css                 # Global styles and theme variables
│   └── components/
│       ├── LocationHeader.tsx      # Sticky header with location
│       ├── SearchBar.tsx           # Search input component
│       ├── PromotionalBanner.tsx   # Hero banner with CTA
│       ├── CategoryGrid.tsx        # Course category grid
│       ├── FeaturedCourses.tsx     # Horizontal scrollable courses
│       ├── StatsDisplay.tsx        # Key metrics display
│       ├── FooterNavigation.tsx    # Bottom navigation bar
│       └── FloatingActions.tsx     # Call/WhatsApp buttons
```

## Components and Interfaces

### 1. LocationHeader Component

**Purpose**: Display user location and profile access with sticky positioning

**Props Interface**:
```typescript
interface LocationHeaderProps {
  location: {
    city: string;
    state: string;
  };
  profileImage: string;
  theme: 'light' | 'dark';
}
```

**Behavior**:
- Remains sticky at top during scroll
- Shows location icon with city/state text
- Displays profile avatar in top-right
- Applies theme-specific background colors
- Uses box-shadow for depth perception

**Accessibility**:
- Semantic HTML with `<header>` tag
- ARIA label for profile button
- Keyboard accessible profile interaction

### 2. SearchBar Component

**Purpose**: Enable course and skill search with visual feedback

**Props Interface**:
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  theme: 'light' | 'dark';
}
```

**State**:
```typescript
interface SearchBarState {
  isFocused: boolean;
  searchQuery: string;
}
```

**Behavior**:
- Shows search icon and placeholder text
- Highlights border on focus with brand color
- Smooth transition for focus state (0.3s)
- Theme-aware background colors
- Debounced search input handling

**Accessibility**:
- Proper label association
- Keyboard navigable
- Clear focus indicators
- Screen reader announcements

### 3. PromotionalBanner Component

**Purpose**: Showcase key value proposition with video background

**Props Interface**:
```typescript
interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  videoSrc: string;
  theme: 'light' | 'dark';
}
```

**Behavior**:
- Gradient background using brand colors
- Background video at 20% opacity
- Minimum height of 180px
- CTA button scales to 1.05 on hover
- Responsive text sizing
- Video preload for faster playback

**Accessibility**:
- Semantic heading hierarchy
- Descriptive link text
- Video muted by default
- Keyboard accessible CTA

### 4. CategoryGrid Component

**Purpose**: Display course categories in responsive grid layout

**Props Interface**:
```typescript
interface Category {
  name: string;
  slug: string;
  icon: string;
  color: string;
}

interface CategoryGridProps {
  categories: Category[];
  theme: 'light' | 'dark';
}
```

**Behavior**:
- 4-column grid on mobile (390px)
- Each card shows icon and name
- Gradient backgrounds per category
- Translates upward 4px on hover
- Navigates to category page on click
- Smooth transitions with cubic-bezier easing

**Accessibility**:
- Semantic links with descriptive text
- Keyboard navigable grid
- Focus indicators on cards
- ARIA labels for icons

### 5. FeaturedCourses Component

**Purpose**: Horizontal scrollable list of popular courses

**Props Interface**:
```typescript
interface Course {
  name: string;
  slug: string;
  duration: string;
  rating: string;
  students: string;
  thumbnail?: string;
}

interface FeaturedCoursesProps {
  courses: Course[];
  theme: 'light' | 'dark';
}
```

**Behavior**:
- Horizontal scroll with scroll-snap
- 3 course cards visible
- Each card shows name, duration, rating, students
- Hides scrollbar while maintaining scroll
- Translates upward 4px on hover
- Navigates to course detail on click

**Accessibility**:
- Semantic navigation structure
- Keyboard scrollable
- Screen reader announces course count
- Focus management for cards

### 6. StatsDisplay Component

**Purpose**: Show key platform metrics in grid layout

**Props Interface**:
```typescript
interface Stat {
  value: string;
  label: string;
}

interface StatsDisplayProps {
  stats: Stat[];
  theme: 'light' | 'dark';
}
```

**Behavior**:
- 3-column grid layout
- Large font (2rem) for numbers
- Brand-primary color for values
- White/dark background with shadow
- Rounded corners (16px)

**Accessibility**:
- Semantic markup with proper hierarchy
- Screen reader friendly number formatting
- Clear visual hierarchy

### 7. FooterNavigation Component

**Purpose**: Fixed bottom navigation with 4 primary menu items

**Props Interface**:
```typescript
interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

interface FooterNavigationProps {
  items: NavItem[];
  currentPath: string;
  theme: 'light' | 'dark';
}
```

**Behavior**:
- Fixed at bottom with safe-area-inset
- 4 equal-width navigation items
- Active item highlighted with brand color
- Indicator dot below active item
- Backdrop blur effect
- Smooth transitions on interaction

**Accessibility**:
- ARIA label "Primary menu"
- Keyboard navigable
- Active state announced
- Focus indicators

### 8. FloatingActionButtons Component

**Purpose**: Quick access to call and WhatsApp contact

**Props Interface**:
```typescript
interface FloatingActionsProps {
  phoneNumber: string;
  whatsappNumber: string;
}
```

**Behavior**:
- Positioned bottom-right above footer
- Circular buttons with icons
- Call button uses primary color
- WhatsApp button uses green (#25d366)
- Links to tel: and wa.me protocols
- Shadow for depth perception

**Accessibility**:
- Screen reader text with sr-only class
- Descriptive ARIA labels
- Keyboard accessible links
- Clear focus indicators

## Data Models

### Theme Configuration

```typescript
type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  background: string;
  foreground: string;
  surface: string;
  surfaceSoft: string;
  brandPrimary: string;
  brandSecondary: string;
  brandAccent: string;
  lineColor: string;
}

const lightTheme: ThemeColors = {
  background: '#f5f9ff',
  foreground: '#0f1e35',
  surface: '#ffffff',
  surfaceSoft: '#e8f1ff',
  brandPrimary: '#0c5adb',
  brandSecondary: '#1da1f2',
  brandAccent: '#ff7f2a',
  lineColor: 'color-mix(in oklab, #0c5adb, white 62%)',
};

const darkTheme: ThemeColors = {
  background: '#0a1929',
  foreground: '#e3f2fd',
  surface: '#132f4c',
  surfaceSoft: '#1a3a52',
  brandPrimary: '#01a99e',
  brandSecondary: '#00d4c4',
  brandAccent: '#ffab61',
  lineColor: 'color-mix(in oklab, #01a99e, black 52%)',
};
```

### Course Data Model

```typescript
interface Course {
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
```

### Category Data Model

```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  courseCount: number;
  order: number;
}
```

### Navigation Item Model

```typescript
interface NavigationItem {
  id: string;
  label: string;
  shortLabel: string;
  href: string;
  icon: string;
  order: number;
  external: boolean;
}
```

### Statistics Model

```typescript
interface PlatformStats {
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
```

### Location Model

```typescript
interface Location {
  city: string;
  state: string;
  country: string;
  displayText: string;
}
```

## UI/UX Design Patterns

### Mobile-First Responsive Design

The design uses a mobile-first approach with breakpoints:

- **Mobile**: 0-389px (100% width)
- **Mobile Shell**: 390px (fixed width on desktop)
- **Desktop**: 1024px+ (centered shell with max-width)

```css
/* Mobile base styles */
.mobile-shell {
  width: min(100%, 390px);
  height: 100dvh;
}

/* Desktop enhancement */
@media (min-width: 1024px) {
  .mobile-shell {
    width: 390px;
    height: clamp(760px, 86vh, 860px);
    border-radius: 1.5rem;
    box-shadow: 0 20px 60px rgba(1, 169, 158, 0.2);
  }
}
```

### Sticky Header Pattern

The location header uses position sticky for persistent visibility:

```css
.zomato-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
```

### Horizontal Scroll Pattern

Featured courses use scroll-snap for smooth scrolling:

```css
.featured-courses {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.course-card-zomato {
  flex: 0 0 280px;
  scroll-snap-align: start;
}
```

### Card Hover Effects

Interactive cards use transform for performance:

```css
.category-card {
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}
```

### Theme Switching

Theme detection uses prefers-color-scheme media query:

```typescript
function subscribeTheme(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}
```

### Safe Area Insets

Footer navigation respects device safe areas:

```css
.footer-menu {
  padding: 0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom));
}
```

## Technical Implementation Details

### Component Composition Strategy

The homepage uses a composition pattern where HomeClient orchestrates child components:

```typescript
export default function HomeClient() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );
  
  return (
    <main className="home-shell">
      <div className="mobile-shell">
        <LocationHeader theme={theme} />
        <SearchBar theme={theme} />
        <PromotionalBanner theme={theme} />
        <CategoryGrid theme={theme} />
        <FeaturedCourses theme={theme} />
        <StatsDisplay theme={theme} />
        <FooterNavigation theme={theme} />
        <FloatingActionButtons />
      </div>
    </main>
  );
}
```

### State Management Approach

- **Theme State**: Managed via useSyncExternalStore for SSR compatibility
- **Search State**: Local useState in SearchBar component
- **Navigation State**: Derived from usePathname hook
- **Focus State**: Local useState for visual feedback

### Performance Optimizations

1. **Image Optimization**: Use Next.js Image component with proper sizing
2. **Video Preloading**: Set preload="auto" for banner video
3. **Lazy Loading**: Implement for featured course images
4. **Code Splitting**: Separate components for better bundle size
5. **CSS Optimization**: Use CSS custom properties for theme values

### Animation Strategy

All animations use CSS transforms for GPU acceleration:

```css
/* Hover animations */
.category-card:hover {
  transform: translateY(-4px);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* CTA button scale */
.banner-cta:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}
```

### Scroll Behavior

Implement smooth scrolling with scroll-snap:

```css
.featured-courses {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.course-card-zomato {
  scroll-snap-align: start;
}
```

### Focus Management

Ensure keyboard navigation works seamlessly:

```typescript
// Focus trap for modal interactions
useEffect(() => {
  if (isSearchFocused) {
    searchInputRef.current?.focus();
  }
}, [isSearchFocused]);
```

### Error Handling

Implement graceful fallbacks for missing data:

```typescript
// Fallback for missing course images
const courseThumbnail = course.thumbnail || '/img/course-placeholder.webp';

// Fallback for theme detection
function getThemeServerSnapshot(): ThemeMode {
  return 'light'; // Default to light theme on server
}
```

### SEO Optimization

Maintain existing metadata configuration:

```typescript
export const metadata: Metadata = {
  title: "SMEClabs Kochi – Leading Skill Development & Internship Provider",
  description: "Industry-aligned training with 1 lakh+ placements...",
  openGraph: {
    title: "SMEClabs Kochi | Industry-Aligned Training",
    images: [{ url: "/img/logo-new.webp" }],
  },
};
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I identified several areas of redundancy:

1. **Sticky/Fixed Positioning**: Requirements 1.4 and 2.4 both test that the header remains at the top during scroll - these can be combined into one property
2. **Hover Animations**: Requirements 5.4, 6.5, 11.4, and 11.5 all test translateY(-4px) on hover - can be combined into one property for all cards
3. **Theme Color Application**: Requirements 8.2, 8.3, 8.4 test different aspects of dark mode colors - can be combined into one comprehensive theme property
4. **Navigation Behavior**: Requirements 5.5, 6.7, and 9.6 all test navigation on click - can be combined into one property
5. **Transition Timing**: Requirements 11.1 and 11.3 both test 0.3s transitions - can be combined
6. **Accessibility Focus**: Requirements 12.2 and 12.6 both test focus indicators - can be combined

After reflection, the following properties provide unique validation value without redundancy:

### Property 1: Mobile Shell Responsive Width

*For any* viewport width, the mobile shell should have a maximum width of 390px on viewports >= 390px, and 100% width on viewports < 390px

**Validates: Requirements 1.1, 1.2**

### Property 2: Header Sticky Positioning

*For any* scroll position, the location header should remain visible at the top of the viewport

**Validates: Requirements 1.4, 2.4**

### Property 3: Footer Fixed Positioning with Safe Area

*For any* device, the footer menu should remain fixed at the bottom and include safe-area-inset-bottom in its padding

**Validates: Requirements 1.5, 9.5**

### Property 4: Theme Detection and Application

*For any* system color scheme preference (light or dark), the theme system should detect it and apply the corresponding color palette to all components

**Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

### Property 5: Dark Mode Color Consistency

*For any* component in dark mode, it should use the dark theme colors (#01a99e for brand-primary, #1f2937/#111827 for backgrounds, #f9fafb for text)

**Validates: Requirements 2.5, 3.5, 8.2, 8.3, 8.4**

### Property 6: Category Card Content Structure

*For any* category card, it should display both an icon and a name with a gradient background

**Validates: Requirements 5.2, 5.3**

### Property 7: Card Hover Animation

*For any* interactive card (category or course), hovering should translate it upward by 4px using transform

**Validates: Requirements 5.4, 6.5, 11.4, 11.5**

### Property 8: Navigation on Click

*For any* clickable navigation element (category card, course card, menu item), clicking should navigate to the corresponding page

**Validates: Requirements 5.5, 6.7, 9.6**

### Property 9: Course Card Content Completeness

*For any* course card, it should display all four required pieces of information: name, duration, rating, and student count

**Validates: Requirements 6.3**

### Property 10: Active Menu Item Highlighting

*For any* active navigation menu item, it should be highlighted with brand-primary color and show an indicator dot below

**Validates: Requirements 9.2, 9.3**

### Property 11: Smooth Transitions

*For any* interactive element with hover effects, transitions should use 0.3s duration with appropriate easing

**Validates: Requirements 11.1, 11.3**

### Property 12: Card Animation Easing

*For any* card hover animation, it should use cubic-bezier(0.34, 1.56, 0.64, 1) easing function

**Validates: Requirements 11.2**

### Property 13: Keyboard Accessibility

*For any* interactive element, it should be keyboard accessible with visible focus indicators

**Validates: Requirements 12.2, 12.6**

### Property 14: Navigation ARIA Labels

*For any* navigation element, it should include proper ARIA labels for screen reader accessibility

**Validates: Requirements 12.1**

### Property 15: Floating Button Screen Reader Text

*For any* floating action button, it should include sr-only text for screen readers

**Validates: Requirements 12.4**

### Property 16: Heading Hierarchy

*For any* page render, headings should follow proper semantic hierarchy (h1, h2, h3) without skipping levels

**Validates: Requirements 12.5**

### Property 17: Image Lazy Loading

*For any* image in the featured courses section, it should use lazy loading

**Validates: Requirements 13.3**

### Property 18: Next.js Image Component Usage

*For any* image on the homepage, it should use the Next.js Image component for optimization

**Validates: Requirements 13.4**

### Property 19: Brand Color Consistency

*For any* theme mode, the homepage should use the correct brand-primary color (#0c5adb in light mode, #01a99e in dark mode)

**Validates: Requirements 14.1, 14.2**

### Property 20: CSS Custom Properties Preservation

*For any* CSS custom property defined in :root of globals.css, it should be preserved and available for use

**Validates: Requirements 14.5**

### Property 21: Section Padding Consistency

*For any* zomato-section element, it should have 1.5rem padding

**Validates: Requirements 15.1**

### Property 22: Section Heading Typography

*For any* section-heading element, it should use 1.2rem font-size with 800 font-weight

**Validates: Requirements 15.2**

### Property 23: Section Spacing

*For any* major section, it should have 1rem margin separating it from adjacent sections

**Validates: Requirements 15.3**

### Property 24: Card Border Radius Consistency

*For any* card element, it should use a consistent border-radius of 16px

**Validates: Requirements 15.4**

## Error Handling

### Client-Side Error Handling

**Theme Detection Failures**:
- Fallback to light theme if prefers-color-scheme is not supported
- Graceful degradation for older browsers

```typescript
function getThemeSnapshot(): ThemeMode {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  } catch (error) {
    console.warn("Theme detection failed, defaulting to light mode", error);
    return "light";
  }
}
```

**Image Loading Failures**:
- Provide fallback images for missing course thumbnails
- Use Next.js Image component error handling

```typescript
<Image
  src={course.thumbnail || '/img/course-placeholder.webp'}
  alt={course.name}
  onError={(e) => {
    e.currentTarget.src = '/img/course-placeholder.webp';
  }}
/>
```

**Video Loading Failures**:
- Banner should remain functional without video
- Graceful fallback to gradient background only

```typescript
<video
  onError={(e) => {
    console.warn("Banner video failed to load");
    e.currentTarget.style.display = 'none';
  }}
>
  <source src="/hero-video.webm" type="video/webm" />
</video>
```

**Navigation Failures**:
- Handle invalid routes with Next.js error boundaries
- Provide user feedback for navigation errors

```typescript
try {
  router.push(href);
} catch (error) {
  console.error("Navigation failed", error);
  // Show toast notification to user
}
```

### Data Validation

**Course Data Validation**:
```typescript
interface CourseValidation {
  validateCourse(course: unknown): course is Course;
  validateCourseArray(courses: unknown[]): Course[];
}

function validateCourse(course: unknown): course is Course {
  return (
    typeof course === 'object' &&
    course !== null &&
    'name' in course &&
    'slug' in course &&
    'duration' in course &&
    'rating' in course &&
    'students' in course
  );
}
```

**Category Data Validation**:
```typescript
function validateCategory(category: unknown): category is Category {
  return (
    typeof category === 'object' &&
    category !== null &&
    'name' in category &&
    'slug' in category &&
    'icon' in category &&
    'color' in category
  );
}
```

### Accessibility Error Prevention

**Focus Management**:
- Ensure focus is never lost during interactions
- Trap focus in modals when opened
- Return focus to trigger element when modal closes

**Keyboard Navigation**:
- Prevent keyboard traps
- Ensure all interactive elements are reachable via Tab
- Provide skip links for main content

**Screen Reader Support**:
- Announce dynamic content changes
- Provide meaningful error messages
- Use ARIA live regions for status updates

### Performance Error Handling

**Scroll Performance**:
- Debounce scroll event listeners
- Use passive event listeners where possible
- Implement virtual scrolling for long lists (future enhancement)

**Animation Performance**:
- Use will-change sparingly
- Prefer transform and opacity for animations
- Disable animations on low-end devices

```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Disable or reduce animations
  document.documentElement.classList.add('reduce-motion');
}
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs
- Together they provide comprehensive coverage where unit tests catch concrete bugs and property tests verify general correctness

### Unit Testing

**Framework**: Jest with React Testing Library

**Test Categories**:

1. **Component Rendering Tests**
   - Verify each component renders without errors
   - Check for specific content (titles, labels, placeholders)
   - Validate initial state

2. **Interaction Tests**
   - Test hover effects on cards
   - Verify focus states on search bar
   - Check click handlers for navigation
   - Test keyboard navigation

3. **Theme Tests**
   - Verify light mode colors
   - Verify dark mode colors
   - Test theme switching

4. **Responsive Tests**
   - Test mobile viewport (< 390px)
   - Test desktop viewport (>= 390px)
   - Verify sticky/fixed positioning

5. **Accessibility Tests**
   - Check ARIA labels
   - Verify keyboard navigation
   - Test screen reader text
   - Validate heading hierarchy

**Example Unit Tests**:

```typescript
describe('LocationHeader', () => {
  it('should display location text "Kochi, Kerala"', () => {
    render(<LocationHeader theme="light" />);
    expect(screen.getByText('Kochi, Kerala')).toBeInTheDocument();
  });

  it('should show profile avatar in top-right', () => {
    render(<LocationHeader theme="light" />);
    const avatar = screen.getByAltText('Profile');
    expect(avatar).toBeInTheDocument();
  });

  it('should have sticky positioning', () => {
    render(<LocationHeader theme="light" />);
    const header = screen.getByRole('banner');
    expect(header).toHaveStyle({ position: 'sticky' });
  });
});

describe('SearchBar', () => {
  it('should display placeholder text', () => {
    render(<SearchBar theme="light" />);
    expect(screen.getByPlaceholderText('Search for courses, skills...')).toBeInTheDocument();
  });

  it('should show focus state when focused', () => {
    render(<SearchBar theme="light" />);
    const input = screen.getByRole('searchbox');
    fireEvent.focus(input);
    expect(input.parentElement).toHaveClass('focused');
  });
});

describe('CategoryGrid', () => {
  it('should display all 8 categories', () => {
    render(<CategoryGrid theme="light" />);
    expect(screen.getAllByRole('link')).toHaveLength(8);
  });

  it('should show icon and name for each category', () => {
    render(<CategoryGrid theme="light" />);
    expect(screen.getByText('Automation')).toBeInTheDocument();
    expect(screen.getByText('⚙️')).toBeInTheDocument();
  });
});
```

### Property-Based Testing

**Framework**: fast-check (JavaScript property-based testing library)

**Configuration**: Minimum 100 iterations per property test

**Property Test Categories**:

1. **Responsive Layout Properties**
   - Mobile shell width constraints
   - Sticky/fixed positioning behavior

2. **Theme Properties**
   - Color consistency across themes
   - Theme detection and application

3. **Interaction Properties**
   - Hover animations on all cards
   - Navigation behavior on clicks
   - Focus indicators on all interactive elements

4. **Content Structure Properties**
   - Required fields in course/category cards
   - Heading hierarchy
   - ARIA label presence

5. **Styling Consistency Properties**
   - Border radius on all cards
   - Padding on all sections
   - Transition timing on all interactive elements

**Example Property Tests**:

```typescript
import fc from 'fast-check';

describe('Property Tests', () => {
  /**
   * Feature: zomato-style-homepage-redesign
   * Property 1: Mobile Shell Responsive Width
   */
  it('should constrain mobile shell width based on viewport', () => {
    fc.assert(
      fc.property(fc.integer({ min: 200, max: 2000 }), (viewportWidth) => {
        // Set viewport width
        window.innerWidth = viewportWidth;
        render(<HomeClient />);
        
        const shell = screen.getByTestId('mobile-shell');
        const computedWidth = parseInt(getComputedStyle(shell).width);
        
        if (viewportWidth >= 390) {
          // Desktop: max-width 390px
          expect(computedWidth).toBeLessThanOrEqual(390);
        } else {
          // Mobile: 100% width
          expect(computedWidth).toBe(viewportWidth);
        }
      }),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: zomato-style-homepage-redesign
   * Property 7: Card Hover Animation
   */
  it('should translate all cards upward by 4px on hover', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('category-card', 'course-card-zomato'),
        (cardClass) => {
          render(<HomeClient />);
          const cards = screen.getAllByTestId(cardClass);
          
          cards.forEach(card => {
            fireEvent.mouseEnter(card);
            const transform = getComputedStyle(card).transform;
            expect(transform).toContain('translateY(-4px)');
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: zomato-style-homepage-redesign
   * Property 9: Course Card Content Completeness
   */
  it('should display all required fields for any course card', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1 }),
          slug: fc.string({ minLength: 1 }),
          duration: fc.string({ minLength: 1 }),
          rating: fc.float({ min: 0, max: 5 }).map(n => n.toFixed(1)),
          students: fc.string({ minLength: 1 }),
        }),
        (course) => {
          render(<CourseCard course={course} />);
          
          expect(screen.getByText(course.name)).toBeInTheDocument();
          expect(screen.getByText(course.duration)).toBeInTheDocument();
          expect(screen.getByText(course.rating)).toBeInTheDocument();
          expect(screen.getByText(course.students)).toBeInTheDocument();
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: zomato-style-homepage-redesign
   * Property 13: Keyboard Accessibility
   */
  it('should make all interactive elements keyboard accessible with focus indicators', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'a', 'input'),
        (elementType) => {
          render(<HomeClient />);
          const elements = screen.getAllByRole(
            elementType === 'a' ? 'link' : elementType === 'input' ? 'searchbox' : 'button'
          );
          
          elements.forEach(element => {
            element.focus();
            expect(element).toHaveFocus();
            
            const styles = getComputedStyle(element);
            // Should have visible focus indicator
            expect(
              styles.outline !== 'none' || 
              styles.boxShadow !== 'none' ||
              styles.borderColor !== 'transparent'
            ).toBe(true);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: zomato-style-homepage-redesign
   * Property 19: Brand Color Consistency
   */
  it('should use correct brand-primary color for any theme mode', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark'),
        (theme) => {
          // Mock prefers-color-scheme
          window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: theme === 'dark',
            media: query,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
          }));
          
          render(<HomeClient />);
          
          const root = document.documentElement;
          const brandPrimary = getComputedStyle(root).getPropertyValue('--brand-primary');
          
          if (theme === 'light') {
            expect(brandPrimary).toBe('#0c5adb');
          } else {
            expect(brandPrimary).toBe('#01a99e');
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Feature: zomato-style-homepage-redesign
   * Property 24: Card Border Radius Consistency
   */
  it('should use 16px border-radius for all card elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'category-card',
          'course-card-zomato',
          'stats-container',
          'zomato-banner'
        ),
        (cardClass) => {
          render(<HomeClient />);
          const cards = screen.getAllByTestId(cardClass);
          
          cards.forEach(card => {
            const borderRadius = getComputedStyle(card).borderRadius;
            expect(borderRadius).toBe('16px');
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Integration Testing

**Test Scenarios**:

1. **Full Page Render**
   - Verify all components render together
   - Check for layout issues
   - Test scroll behavior

2. **Theme Switching**
   - Toggle between light and dark mode
   - Verify all components update
   - Check color consistency

3. **Navigation Flow**
   - Click through all navigation items
   - Verify correct page loads
   - Test back button behavior

4. **Responsive Behavior**
   - Test at multiple viewport sizes
   - Verify layout adapts correctly
   - Check touch interactions on mobile

### Visual Regression Testing

**Tool**: Percy or Chromatic

**Test Cases**:
- Homepage in light mode (desktop)
- Homepage in dark mode (desktop)
- Homepage in light mode (mobile)
- Homepage in dark mode (mobile)
- Hover states for all interactive elements
- Focus states for keyboard navigation

### Performance Testing

**Metrics to Monitor**:
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1

**Tools**:
- Lighthouse CI for automated performance testing
- WebPageTest for detailed performance analysis
- Chrome DevTools Performance panel

### Accessibility Testing

**Automated Tools**:
- axe-core for automated accessibility testing
- jest-axe for unit test integration
- Lighthouse accessibility audit

**Manual Testing**:
- Keyboard navigation through all interactive elements
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Color contrast verification
- Focus management validation

### Test Coverage Goals

- **Unit Test Coverage**: > 80% line coverage
- **Property Test Coverage**: All 24 properties tested
- **Integration Test Coverage**: All user flows covered
- **Accessibility Test Coverage**: 100% of interactive elements

### Continuous Integration

**CI Pipeline**:
1. Run unit tests on every commit
2. Run property tests on every PR
3. Run integration tests before merge
4. Run visual regression tests on staging
5. Run performance tests on production builds

**Quality Gates**:
- All tests must pass
- Coverage must meet thresholds
- No accessibility violations
- Performance budgets met
