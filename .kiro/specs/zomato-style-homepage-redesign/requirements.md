# Requirements Document

## Introduction

This document specifies the requirements for redesigning the SMEClabs homepage with a Zomato mobile app-inspired interface. The redesign focuses on creating a modern, mobile-first user experience that maintains the existing color theme while incorporating Zomato's design patterns for improved navigation, content discovery, and user engagement.

## Glossary

- **Homepage**: The landing page at src/app/page.tsx and HomeClient.tsx component
- **Mobile_Shell**: The responsive container component that displays the homepage content
- **Search_Bar**: The search input component for discovering courses and skills
- **Category_Grid**: The grid layout displaying course categories with icons
- **Featured_Courses**: Horizontal scrollable list of popular courses
- **Stats_Container**: Component displaying key metrics (placements, years, courses)
- **Location_Header**: Header component showing location and profile information
- **Banner_Card**: Promotional card with call-to-action for course exploration
- **Footer_Menu**: Bottom navigation bar with primary navigation items
- **Theme_System**: The existing color scheme and dark mode support
- **Zomato_Style**: Design patterns inspired by Zomato's mobile app interface

## Requirements

### Requirement 1: Mobile-First Responsive Layout

**User Story:** As a mobile user, I want the homepage to be optimized for mobile devices, so that I can easily browse courses and information on my phone.

#### Acceptance Criteria

1. THE Mobile_Shell SHALL have a maximum width of 390px on desktop viewports
2. THE Mobile_Shell SHALL occupy 100% width on mobile viewports below 390px
3. THE Homepage SHALL use a vertical scrolling layout with fixed header and footer
4. THE Location_Header SHALL remain sticky at the top during scroll
5. THE Footer_Menu SHALL remain fixed at the bottom with safe-area-inset support

### Requirement 2: Location and Profile Header

**User Story:** As a user, I want to see my location and access my profile quickly, so that I can personalize my experience.

#### Acceptance Criteria

1. THE Location_Header SHALL display a location icon with "Kochi, Kerala" text
2. THE Location_Header SHALL show a profile avatar image in the top-right corner
3. THE Location_Header SHALL have a white background with subtle shadow
4. WHEN the user scrolls, THE Location_Header SHALL remain visible at the top
5. WHERE dark mode is enabled, THE Location_Header SHALL use dark theme colors

### Requirement 3: Search Functionality

**User Story:** As a user, I want to search for courses and skills, so that I can quickly find relevant training programs.

#### Acceptance Criteria

1. THE Search_Bar SHALL display a search icon and placeholder text "Search for courses, skills..."
2. WHEN the Search_Bar receives focus, THE Search_Bar SHALL display a visual focus state with border highlight
3. THE Search_Bar SHALL have rounded corners with 12px border-radius
4. THE Search_Bar SHALL use a light gray background (#f3f4f6) in light mode
5. WHERE dark mode is enabled, THE Search_Bar SHALL use dark theme background (#374151)

### Requirement 4: Promotional Banner

**User Story:** As a visitor, I want to see key value propositions prominently, so that I understand the platform's benefits immediately.

#### Acceptance Criteria

1. THE Banner_Card SHALL display a title "Start Your Tech Journey"
2. THE Banner_Card SHALL show the subtitle "1 Lakh+ Successful Placements"
3. THE Banner_Card SHALL include a call-to-action button linking to /courses
4. THE Banner_Card SHALL use a gradient background from brand-primary (#0c5adb) to brand-secondary
5. THE Banner_Card SHALL display a background video with 20% opacity
6. THE Banner_Card SHALL have a minimum height of 180px
7. WHEN the user hovers over the CTA button, THE button SHALL scale to 1.05

### Requirement 5: Category Grid Display

**User Story:** As a user, I want to browse courses by category, so that I can explore training options in my field of interest.

#### Acceptance Criteria

1. THE Category_Grid SHALL display 8 learning domains in a 4-column grid layout
2. THE Category_Grid SHALL show an icon and name for each category
3. THE Category_Grid SHALL use gradient backgrounds for each category card
4. WHEN a user hovers over a category card, THE card SHALL translate upward by 4px
5. WHEN a user clicks a category card, THE system SHALL navigate to the category page
6. THE Category_Grid SHALL include these categories: Automation, Data Science, Web Dev, Networking, Oil & Gas, Fintech, BMS, Civil

### Requirement 6: Featured Courses Section

**User Story:** As a user, I want to see popular courses highlighted, so that I can discover trending training programs.

#### Acceptance Criteria

1. THE Featured_Courses SHALL display a "Popular Courses" heading with "See all" link
2. THE Featured_Courses SHALL show 3 course cards in a horizontal scrollable layout
3. THE Featured_Courses SHALL display course name, duration, rating, and student count for each card
4. THE Featured_Courses SHALL use scroll-snap for smooth horizontal scrolling
5. WHEN a user hovers over a course card, THE card SHALL translate upward by 4px
6. THE Featured_Courses SHALL hide scrollbar while maintaining scroll functionality
7. WHEN a user clicks a course card, THE system SHALL navigate to the course detail page

### Requirement 7: Statistics Display

**User Story:** As a visitor, I want to see key statistics about the platform, so that I can assess its credibility and reach.

#### Acceptance Criteria

1. THE Stats_Container SHALL display three metrics in a 3-column grid
2. THE Stats_Container SHALL show "1L+ Placements", "25+ Years", and "50+ Courses"
3. THE Stats_Container SHALL use large font size (2rem) for numbers
4. THE Stats_Container SHALL use brand-primary color for metric numbers
5. THE Stats_Container SHALL have white background with rounded corners and shadow

### Requirement 8: Theme Preservation

**User Story:** As a user with dark mode preferences, I want the redesigned homepage to respect my theme choice, so that I have a consistent visual experience.

#### Acceptance Criteria

1. THE Theme_System SHALL detect system color scheme preference using prefers-color-scheme
2. WHEN dark mode is active, THE Homepage SHALL use dark background colors (#1f2937, #111827)
3. WHEN dark mode is active, THE text colors SHALL use light colors (#f9fafb)
4. WHEN dark mode is active, THE brand-primary color SHALL use #01a99e (teal)
5. THE Theme_System SHALL apply theme changes to all Zomato_Style components

### Requirement 9: Bottom Navigation

**User Story:** As a mobile user, I want easy access to main navigation, so that I can quickly switch between sections.

#### Acceptance Criteria

1. THE Footer_Menu SHALL display 4 navigation items: Home, Courses, Career, Contact
2. THE Footer_Menu SHALL highlight the active page with brand-primary color
3. THE Footer_Menu SHALL show an indicator dot below the active item
4. THE Footer_Menu SHALL remain fixed at the bottom with backdrop blur effect
5. THE Footer_Menu SHALL include safe-area-inset-bottom for notched devices
6. WHEN a user clicks a menu item, THE system SHALL navigate to the corresponding page

### Requirement 10: Floating Action Buttons

**User Story:** As a user, I want quick access to contact options, so that I can reach out for inquiries easily.

#### Acceptance Criteria

1. THE Homepage SHALL display two floating action buttons for Call and WhatsApp
2. THE floating buttons SHALL be positioned in the bottom-right corner above the footer
3. THE Call button SHALL link to tel:+919000000000
4. THE WhatsApp button SHALL link to https://wa.me/919000000000
5. THE floating buttons SHALL use circular shape with icon-only display
6. THE floating buttons SHALL have distinct colors (Call: primary, WhatsApp: green)

### Requirement 11: Smooth Animations and Transitions

**User Story:** As a user, I want smooth visual feedback on interactions, so that the interface feels responsive and polished.

#### Acceptance Criteria

1. THE Homepage SHALL use 0.3s ease transitions for hover effects
2. WHEN a card is hovered, THE card SHALL animate with cubic-bezier(0.34, 1.56, 0.64, 1) easing
3. THE Search_Bar focus state SHALL transition smoothly over 0.3s
4. THE Category_Grid cards SHALL use transform for hover animations
5. THE Featured_Courses cards SHALL use transform for hover animations

### Requirement 12: Accessibility Compliance

**User Story:** As a user with accessibility needs, I want the homepage to be keyboard navigable and screen reader friendly, so that I can access all features.

#### Acceptance Criteria

1. THE Homepage SHALL include proper ARIA labels for navigation elements
2. THE Search_Bar SHALL be keyboard accessible with focus indicators
3. THE Footer_Menu SHALL include aria-label="Primary menu"
4. THE floating action buttons SHALL include sr-only text for screen readers
5. THE Homepage SHALL maintain proper heading hierarchy (h1, h2, h3)
6. THE interactive elements SHALL have visible focus states for keyboard navigation

### Requirement 13: Performance Optimization

**User Story:** As a mobile user on slower connections, I want the homepage to load quickly, so that I can access information without delays.

#### Acceptance Criteria

1. THE Banner_Card video SHALL use preload="auto" for faster playback
2. THE Banner_Card video SHALL include webm format for better compression
3. THE Featured_Courses SHALL use lazy loading for images
4. THE Homepage SHALL use Next.js Image component for optimized image delivery
5. THE Homepage SHALL minimize layout shifts during content loading

### Requirement 14: Color Scheme Consistency

**User Story:** As a returning user, I want the redesign to maintain familiar brand colors, so that I recognize the platform.

#### Acceptance Criteria

1. THE Homepage SHALL use brand-primary (#0c5adb in light mode, #01a99e in dark mode) as the primary accent color
2. THE Homepage SHALL use existing brand colors from globals.css
3. THE Category_Grid SHALL use gradient backgrounds matching existing theme
4. THE Homepage SHALL use brand-secondary and brand-accent colors for visual variety
5. THE Homepage SHALL preserve all CSS custom properties from :root

### Requirement 15: Section Spacing and Layout

**User Story:** As a user, I want clear visual separation between sections, so that I can easily scan different content areas.

#### Acceptance Criteria

1. THE Homepage SHALL use 1.5rem padding for each zomato-section
2. THE section-heading SHALL use 1.2rem font-size with 800 font-weight
3. THE Homepage SHALL include 1rem margin between major sections
4. THE Homepage SHALL use consistent border-radius of 16px for cards
5. THE Homepage SHALL maintain 5rem bottom padding for footer clearance
