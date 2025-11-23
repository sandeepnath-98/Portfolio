# Professional Portfolio Website - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from modern portfolio sites like those of award-winning developers and creative agencies (Awwwards winners, Codrops showcases). Focus on visual storytelling, smooth animations, and professional polish that demonstrates technical skill through the design itself.

## Core Design Elements

### Typography
- **Primary Font**: Inter or Poppins via Google Fonts for headings (weights: 600, 700)
- **Body Font**: Same family, regular weight (400) for descriptions
- **Accent Font**: Fira Code or JetBrains Mono for any code snippets or technical labels
- **Scale**: Hero name (text-5xl to text-7xl), section headings (text-3xl to text-4xl), body text (text-base to text-lg)

### Layout System
**Spacing Primitives**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 to py-32 desktop, py-12 to py-16 mobile
- Component spacing: gap-8 to gap-12 between major elements
- Container: max-w-7xl with px-6 to px-8

## Section-by-Section Design

### Navbar
- Fixed position with backdrop blur (backdrop-blur-md with semi-transparent background)
- Logo on top-left (circular or square icon, 40-48px) + "My Portfolio" text
- Navigation links aligned right with smooth scroll behavior
- Icons for theme toggle, menu (mobile)
- Height: h-16 to h-20, subtle shadow on scroll

### Hero Section (Split Layout)
**Left Side (60% width)**:
- Large, bold name with gradient text effect
- Professional title/role with typing animation effect
- 2-3 line compelling description highlighting expertise
- Secondary CTA buttons (View Work, Contact Me)

**Right Side (40% width)**:
- Developer photo in circular frame (300-400px diameter)
- Circle border with gradient or glow effect
- Pop-out effect: scale transform on load with spring animation
- Continuous floating animation (translateY: -20px to 20px, 3-4s duration)
- Entry animation: translateY(100px) to 0 with fade-in on page load
- Download CV button positioned 24-32px below photo, full-width relative to photo
- Subtle shadow and backdrop for visual separation

### Skills Section
- Grid layout: 3-4 columns desktop, 2 columns tablet, 1 column mobile
- Each skill card: icon/logo, skill name, proficiency indicator (progress bar or percentage)
- Stagger animation on scroll (each card animates 100ms after previous)
- Hover effects: lift (translateY: -8px), glow, scale(1.05)
- Group skills by category with subtle dividers

### Timeline Section
**Horizontal Curved Timeline**:
- Curved SVG line running horizontally across section (use bezier curves)
- Events alternate above and below the line (zigzag pattern)
- Each event: circular marker on line, connecting vertical line, content card
- Cards above: positioned top with arrow pointing down
- Cards below: positioned bottom with arrow pointing up
- Card content: date badge, title, description, tech tags
- Scroll-triggered reveal: fade and slide in from sides
- Line draws progressively on scroll (stroke-dasharray animation)

### Projects/Work Section
- Masonry or grid layout showcasing 4-6 key projects
- Each project card: large image, title overlay, tech stack tags
- Hover: image zoom, overlay darkens, "View Details" CTA appears
- Click opens detailed modal or navigates to case study

### Contact Section
- Centered layout with heading "Let's Connect"
- Social media icons in row: Instagram, LinkedIn, GitHub (64-80px each)
- Icons with hover animations: scale, rotation, color change
- Icon containers with circular backgrounds and glow effects on hover
- Optional: Contact form or email CTA above social links
- Footer with copyright and subtle back-to-top button

## Animation Strategy

**Page Load Sequence**:
1. Navbar fades in (0.3s)
2. Hero text stagger in (0.5s)
3. Photo slides from bottom with fade (0.8s)
4. CV button appears (1s)

**Scroll Animations**:
- Skills cards: stagger from bottom with fade (intersection observer)
- Timeline: progressive line draw + event cards alternate slide-in
- Project cards: fade and scale on viewport entry
- Contact icons: bounce on viewport entry

**Continuous Animations**:
- Hero photo: gentle float (translateY, 3s ease-in-out infinite alternate)
- Gradient backgrounds: subtle shift (background-position animation)

**Interaction Animations**:
- All buttons: scale(0.95) on press, lift on hover
- Cards: shadow increase, translateY(-4px to -8px)
- Links: underline slide-in, color transition

## Component Library

**Buttons**: Rounded (rounded-lg to rounded-xl), solid primary with gradient, outlined secondary, shadow on hover, 48px height minimum

**Cards**: Rounded corners (rounded-2xl), subtle shadow, backdrop blur for glassmorphism effect, padding p-6 to p-8, border with low opacity

**Icons**: Use Heroicons via CDN, 20-24px standard, 32-48px for social media, consistent stroke-width

**Badges/Tags**: Small rounded pills for tech stack, low-opacity backgrounds, uppercase text-xs

## Images

**Developer Photo**: Professional headshot, well-lit, neutral or branded background, cropped to square (minimum 600x600px), positioned in circular frame on hero section right side

**Project Images**: High-quality screenshots or mockups, 16:9 or 4:3 aspect ratio, minimum 1200px width, with subtle overlays for text readability

No large hero background image - design emphasizes clean layout with focused photo presentation.

## Accessibility
- Reduced motion media queries for users who prefer less animation
- Proper focus states on all interactive elements
- Semantic HTML with ARIA labels for navigation and timeline
- Sufficient color contrast ratios (WCAG AA minimum)