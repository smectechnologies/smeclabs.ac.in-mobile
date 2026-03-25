# Implementation Plan: Zomato-Style Homepage Redesign

## Overview

This implementation plan transforms the existing SMEClabs homepage into a Zomato mobile app-inspired interface. The redesign maintains the existing brand colors while implementing a modern, mobile-first layout with sticky header, horizontal scrolling courses, category grid, and fixed bottom navigation. All components will be built with TypeScript, Next.js 14, and CSS Modules, ensuring accessibility and performance optimization.

## Tasks

- [x] 1. Set up component structure and shared types
  - Create `src/app/components/zomato/` directory for new components
  - Define TypeScript interfaces for Course, Category, NavigationItem, Location, and PlatformStats models
  - Create shared types file at `src/app/components/zomato/types.ts`
  - Set up theme detection utilities using `useSyncExternalStore`
  - _Requirements: 8.1, 14.1, 14.2_

- [-] 2. Implement LocationHeader component
  - [x] 2.1 Create LocationHeader component with sticky positioning
    - Build `src/app/components/zomato/LocationHeader.tsx` with TypeScript
    - Implement sticky positioning at top with z-index 10
    - Display location icon with "Kochi, Kerala" text
    - Add profile avatar image in top-right corner
    - Apply theme-aware background colors and shadow
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 1.4_

  - [ ]* 2.2 Write property test for LocationHeader sticky positioning
    - **Property 2: Header Sticky Positioning**
    - **Validates: Requirements 1.4, 2.4**
    - Test that header remains visible at any scroll position

  - [ ]* 2.3 Write unit tests for LocationHeader
    - Test location text display "Kochi, Kerala"
    - Test profile avatar rendering
    - Test theme color application (light/dark)
    - Test sticky positioning CSS
    - _Requirements: 2.1, 2.2, 2.5_

- [x] 3. Implement SearchBar component
  - [x] 3.1 Create SearchBar component with focus states
    - Build `src/app/components/zomato/SearchBar.tsx` with TypeScript
    - Add search icon and placeholder "Search for courses, skills..."
    - Implement focus state with border highlight using brand color
    - Apply 12px border-radius and theme-aware backgrounds
    - Add smooth 0.3s transition for focus state
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 3.2 Write unit tests for SearchBar
    - Test placeholder text display
    - Test focus state visual changes
    - Test keyboard accessibility
    - Test theme background colors
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

- [x] 4. Implement PromotionalBanner component
  - [x] 4.1 Create PromotionalBanner with video background
    - Build `src/app/components/zomato/PromotionalBanner.tsx` with TypeScript
    - Add gradient background from brand-primary to brand-secondary
    - Implement background video with 20% opacity and preload="auto"
    - Display title "Start Your Tech Journey" and subtitle "1 Lakh+ Successful Placements"
    - Add CTA button linking to /courses with hover scale effect (1.05)
    - Set minimum height of 180px
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ]* 4.2 Write unit tests for PromotionalBanner
    - Test title and subtitle rendering
    - Test CTA button link and text
    - Test video element with preload attribute
    - Test hover scale animation
    - _Requirements: 4.1, 4.2, 4.3, 4.7_

- [x] 5. Implement CategoryGrid component
  - [x] 5.1 Create CategoryGrid with 4-column layout
    - Build `src/app/components/zomato/CategoryGrid.tsx` with TypeScript
    - Create 4-column grid layout for 8 categories
    - Display icon and name for each category with gradient backgrounds
    - Implement hover animation (translateY -4px) with cubic-bezier easing
    - Add click navigation to category pages
    - Include categories: Automation, Data Science, Web Dev, Networking, Oil & Gas, Fintech, BMS, Civil
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 5.2 Write property test for CategoryGrid card structure
    - **Property 6: Category Card Content Structure**
    - **Validates: Requirements 5.2, 5.3**
    - Test that all category cards display icon and name with gradient background

  - [ ]* 5.3 Write property test for card hover animation
    - **Property 7: Card Hover Animation**
    - **Validates: Requirements 5.4, 6.5, 11.4, 11.5**
    - Test that all cards translate upward by 4px on hover

  - [ ]* 5.4 Write unit tests for CategoryGrid
    - Test 8 categories render correctly
    - Test grid layout (4 columns)
    - Test navigation on click
    - Test hover animation timing
    - _Requirements: 5.1, 5.5, 5.6_

- [-] 6. Checkpoint - Verify header, search, banner, and categories
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement FeaturedCourses component
  - [x] 7.1 Create FeaturedCourses with horizontal scroll
    - Build `src/app/components/zomato/FeaturedCourses.tsx` with TypeScript
    - Add "Popular Courses" heading with "See all" link
    - Create horizontal scrollable layout with scroll-snap
    - Display 3 course cards showing name, duration, rating, student count
    - Hide scrollbar while maintaining scroll functionality
    - Implement hover animation (translateY -4px)
    - Add click navigation to course detail pages
    - Use Next.js Image component with lazy loading
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 13.3, 13.4_

  - [ ]* 7.2 Write property test for course card completeness
    - **Property 9: Course Card Content Completeness**
    - **Validates: Requirements 6.3**
    - Test that all course cards display name, duration, rating, and student count

  - [ ]* 7.3 Write property test for image lazy loading
    - **Property 17: Image Lazy Loading**
    - **Validates: Requirements 13.3**
    - Test that all featured course images use lazy loading

  - [ ]* 7.4 Write property test for Next.js Image usage
    - **Property 18: Next.js Image Component Usage**
    - **Validates: Requirements 13.4**
    - Test that all images use Next.js Image component

  - [ ]* 7.5 Write unit tests for FeaturedCourses
    - Test heading and "See all" link
    - Test horizontal scroll behavior
    - Test scroll-snap functionality
    - Test navigation on card click
    - _Requirements: 6.1, 6.4, 6.6, 6.7_

- [x] 8. Implement StatsDisplay component
  - [x] 8.1 Create StatsDisplay with 3-column grid
    - Build `src/app/components/zomato/StatsDisplay.tsx` with TypeScript
    - Create 3-column grid layout for metrics
    - Display "1L+ Placements", "25+ Years", "50+ Courses"
    - Use 2rem font-size for numbers with brand-primary color
    - Apply white/dark background with rounded corners and shadow
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 8.2 Write unit tests for StatsDisplay
    - Test three metrics render correctly
    - Test font size and color for numbers
    - Test background and shadow styling
    - Test theme color application
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 9. Implement FooterNavigation component
  - [x] 9.1 Create FooterNavigation with fixed bottom positioning
    - Build `src/app/components/zomato/FooterNavigation.tsx` with TypeScript
    - Create fixed bottom navigation with 4 items: Home, Courses, Career, Contact
    - Highlight active page with brand-primary color
    - Add indicator dot below active item
    - Apply backdrop blur effect
    - Include safe-area-inset-bottom for notched devices
    - Add click navigation to corresponding pages
    - Include aria-label="Primary menu"
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 12.3_

  - [ ]* 9.2 Write property test for footer fixed positioning
    - **Property 3: Footer Fixed Positioning with Safe Area**
    - **Validates: Requirements 1.5, 9.5**
    - Test that footer remains fixed at bottom with safe-area-inset-bottom

  - [ ]* 9.3 Write property test for active menu highlighting
    - **Property 10: Active Menu Item Highlighting**
    - **Validates: Requirements 9.2, 9.3**
    - Test that active item shows brand-primary color and indicator dot

  - [ ]* 9.4 Write property test for navigation ARIA labels
    - **Property 14: Navigation ARIA Labels**
    - **Validates: Requirements 12.1**
    - Test that all navigation elements include proper ARIA labels

  - [ ]* 9.5 Write unit tests for FooterNavigation
    - Test 4 navigation items render
    - Test active state highlighting
    - Test navigation on click
    - Test safe-area-inset-bottom CSS
    - _Requirements: 9.1, 9.5, 9.6_

- [x] 10. Implement FloatingActionButtons component
  - [x] 10.1 Create FloatingActionButtons for Call and WhatsApp
    - Build `src/app/components/zomato/FloatingActions.tsx` with TypeScript
    - Position buttons in bottom-right corner above footer
    - Create circular buttons with icon-only display
    - Link Call button to tel:+919000000000
    - Link WhatsApp button to https://wa.me/919000000000
    - Use primary color for Call, green (#25d366) for WhatsApp
    - Add sr-only text for screen readers
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 12.4_

  - [ ]* 10.2 Write property test for floating button screen reader text
    - **Property 15: Floating Button Screen Reader Text**
    - **Validates: Requirements 12.4**
    - Test that all floating buttons include sr-only text

  - [ ]* 10.3 Write unit tests for FloatingActionButtons
    - Test button positioning
    - Test Call button link
    - Test WhatsApp button link
    - Test button colors
    - _Requirements: 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 11. Checkpoint - Verify all components render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [-] 12. Update HomeClient.tsx with new layout
  - [x] 12.1 Integrate all Zomato components into HomeClient
    - Import all new components from `src/app/components/zomato/`
    - Implement theme detection using useSyncExternalStore
    - Create mobile-shell container with max-width 390px
    - Arrange components in vertical layout: LocationHeader, SearchBar, PromotionalBanner, CategoryGrid, FeaturedCourses, StatsDisplay
    - Add FooterNavigation and FloatingActionButtons
    - Apply 5rem bottom padding for footer clearance
    - _Requirements: 1.1, 1.2, 1.3, 8.1, 15.5_

  - [ ]* 12.2 Write property test for mobile shell responsive width
    - **Property 1: Mobile Shell Responsive Width**
    - **Validates: Requirements 1.1, 1.2**
    - Test that shell has max-width 390px on desktop and 100% on mobile

  - [ ]* 12.3 Write property test for theme detection
    - **Property 4: Theme Detection and Application**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**
    - Test that theme system detects and applies correct color palette

  - [ ]* 12.4 Write integration tests for HomeClient
    - Test all components render together
    - Test theme switching between light and dark
    - Test scroll behavior with sticky header
    - Test responsive layout at different viewports
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 8.1_

- [-] 13. Implement CSS styling for Zomato design
  - [x] 13.1 Create zomato-styles.css with all component styles
    - Create `src/app/zomato-styles.css` file
    - Define mobile-shell styles with responsive width
    - Add zomato-header styles with sticky positioning and shadow
    - Create search-bar-zomato styles with focus states and transitions
    - Define zomato-banner styles with gradient and video overlay
    - Add category-grid styles with 4-column layout and hover effects
    - Create featured-courses styles with horizontal scroll and scroll-snap
    - Define stats-container styles with 3-column grid
    - Add footer-menu styles with fixed positioning and backdrop blur
    - Create floating-actions styles with circular buttons
    - Apply consistent 16px border-radius to all cards
    - Use 1.5rem padding for all zomato-section elements
    - Add 1rem margin between major sections
    - _Requirements: 3.3, 4.6, 5.4, 6.4, 6.6, 11.1, 11.2, 15.1, 15.3, 15.4_

  - [ ]* 13.2 Write property test for smooth transitions
    - **Property 11: Smooth Transitions**
    - **Validates: Requirements 11.1, 11.3**
    - Test that all interactive elements use 0.3s transitions

  - [ ]* 13.3 Write property test for card animation easing
    - **Property 12: Card Animation Easing**
    - **Validates: Requirements 11.2**
    - Test that card hover animations use cubic-bezier(0.34, 1.56, 0.64, 1)

  - [ ]* 13.4 Write property test for section padding
    - **Property 21: Section Padding Consistency**
    - **Validates: Requirements 15.1**
    - Test that all zomato-section elements have 1.5rem padding

  - [ ]* 13.5 Write property test for section spacing
    - **Property 23: Section Spacing**
    - **Validates: Requirements 15.3**
    - Test that major sections have 1rem margin between them

  - [ ]* 13.6 Write property test for card border radius
    - **Property 24: Card Border Radius Consistency**
    - **Validates: Requirements 15.4**
    - Test that all cards use 16px border-radius

- [x] 14. Implement theme system and color consistency
  - [x] 14.1 Update globals.css with theme variables
    - Verify existing CSS custom properties in :root are preserved
    - Ensure brand-primary uses #0c5adb in light mode
    - Ensure brand-primary uses #01a99e in dark mode
    - Add dark mode color overrides for backgrounds and text
    - Verify gradient backgrounds use existing brand colors
    - _Requirements: 8.2, 8.3, 8.4, 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 14.2 Write property test for dark mode color consistency
    - **Property 5: Dark Mode Color Consistency**
    - **Validates: Requirements 2.5, 3.5, 8.2, 8.3, 8.4**
    - Test that all components use correct dark theme colors

  - [ ]* 14.3 Write property test for brand color consistency
    - **Property 19: Brand Color Consistency**
    - **Validates: Requirements 14.1, 14.2**
    - Test that correct brand-primary color is used in each theme mode

  - [ ]* 14.4 Write property test for CSS custom properties preservation
    - **Property 20: CSS Custom Properties Preservation**
    - **Validates: Requirements 14.5**
    - Test that all CSS custom properties from :root are preserved

- [x] 15. Implement accessibility features
  - [x] 15.1 Add ARIA labels and semantic HTML
    - Add proper ARIA labels to all navigation elements
    - Ensure proper heading hierarchy (h1, h2, h3) throughout page
    - Add aria-label to search input
    - Include sr-only text for icon-only buttons
    - Add descriptive alt text for all images
    - _Requirements: 12.1, 12.4, 12.5_

  - [ ]* 15.2 Write property test for keyboard accessibility
    - **Property 13: Keyboard Accessibility**
    - **Validates: Requirements 12.2, 12.6**
    - Test that all interactive elements are keyboard accessible with focus indicators

  - [ ]* 15.3 Write property test for heading hierarchy
    - **Property 16: Heading Hierarchy**
    - **Validates: Requirements 12.5**
    - Test that headings follow proper semantic hierarchy without skipping levels

  - [ ]* 15.4 Write unit tests for accessibility
    - Test ARIA labels on navigation
    - Test keyboard navigation through all interactive elements
    - Test focus indicators visibility
    - Test screen reader text for floating buttons
    - _Requirements: 12.1, 12.2, 12.4, 12.6_

- [x] 16. Add performance optimizations
  - [x] 16.1 Optimize video and image loading
    - Add preload="auto" to banner video
    - Include webm format for video compression
    - Implement lazy loading for featured course images
    - Use Next.js Image component for all images with proper sizing
    - Add loading="lazy" attribute where appropriate
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

  - [ ]* 16.2 Write unit tests for performance features
    - Test video preload attribute
    - Test image lazy loading
    - Test Next.js Image component usage
    - _Requirements: 13.1, 13.3, 13.4_

- [x] 17. Implement section typography and spacing
  - [x] 17.1 Apply consistent typography to section headings
    - Add section-heading class with 1.2rem font-size and 800 font-weight
    - Apply to "Popular Courses" and other section headings
    - Ensure consistent spacing between sections
    - _Requirements: 15.2, 15.3_

  - [ ]* 17.2 Write property test for section heading typography
    - **Property 22: Section Heading Typography**
    - **Validates: Requirements 15.2**
    - Test that all section-heading elements use correct font-size and font-weight

- [x] 18. Implement navigation behavior
  - [x] 18.1 Add click handlers for all navigation elements
    - Implement navigation for category cards to category pages
    - Add navigation for course cards to course detail pages
    - Wire up footer menu items to corresponding pages
    - Use Next.js Link component with prefetching
    - _Requirements: 5.5, 6.7, 9.6_

  - [ ]* 18.2 Write property test for navigation on click
    - **Property 8: Navigation on Click**
    - **Validates: Requirements 5.5, 6.7, 9.6**
    - Test that all clickable elements navigate to correct pages

- [x] 19. Final integration and testing
  - [x] 19.1 Wire all components together in page.tsx
    - Import HomeClient in page.tsx
    - Verify metadata configuration is preserved
    - Test full page render with all components
    - Verify no layout shifts during loading
    - _Requirements: 13.5_

  - [ ]* 19.2 Run full integration test suite
    - Test complete user flow from homepage to navigation
    - Test theme switching across all components
    - Test responsive behavior at multiple viewports
    - Test keyboard navigation through entire page
    - Test screen reader compatibility
    - _Requirements: 1.1, 1.2, 8.1, 12.2, 12.6_

- [ ] 20. Final checkpoint - Comprehensive testing
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and error conditions
- All components use TypeScript for type safety
- CSS Modules or Tailwind utilities can be used based on existing patterns
- Maintain existing brand colors from globals.css throughout implementation
- Focus on mobile-first design with 390px viewport as primary target
- Ensure all interactive elements are keyboard accessible with visible focus states
