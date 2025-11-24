# Professional Portfolio Website

## Overview

This is a modern, professional portfolio website built as a single-page application showcasing a developer's skills, experience, and contact information. The project features a clean, responsive design with smooth animations and interactive components. The portfolio includes sections for hero introduction, technical skills, professional timeline, and contact information with social media links.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Libraries**
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** (React Query) for server state management and data fetching

**UI Component System**
- **shadcn/ui** components built on Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Class Variance Authority (CVA)** for managing component variants
- Component library follows the "new-york" style variant with custom neutral base color

**Design System**
- Custom CSS variables for theming (light/dark mode support)
- Consistent spacing using Tailwind's spacing scale (4, 6, 8, 12, 16, 20, 24)
- Typography scale using Google Fonts (Inter/Poppins for headings, Fira Code for code)
- Custom animation classes for scroll-triggered effects and transitions

**Key UI Patterns**
- Single-page application with smooth scroll navigation between sections
- Intersection Observer API for scroll-triggered animations
- Mobile-first responsive design with hamburger menu for smaller screens
- Fixed navbar with backdrop blur effect on scroll
- Gradient text effects and floating animations for visual appeal

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the Node.js backend
- Development and production build configurations separated (`index-dev.ts` vs `index-prod.ts`)
- Custom logging middleware for API request tracking

**Development Setup**
- **tsx** for running TypeScript directly in development mode
- **Vite middleware** integration in development for HMR
- **esbuild** for production bundling of server code
- Development server includes Replit-specific plugins (cartographer, dev-banner, runtime-error-modal)

**File Serving Strategy**
- Development: Vite serves client files with HMR support and on-the-fly template injection
- Production: Express serves static files from `dist/public` directory
- Fallback to `index.html` for client-side routing support

**API Structure**
- RESTful API endpoints under `/api` prefix
- Endpoints implemented:
  - `GET /api/cv/download` for serving CV PDF file
  - `POST /api/messages` for submitting contact form messages
  - `GET /api/messages` (authenticated only) for retrieving stored messages
  - `POST /api/auth/login` for admin authentication with password
  - `POST /api/auth/logout` for ending admin session
  - `GET /api/auth/check` for checking authentication status
- Request body parsing with JSON verification support
- Session-based authentication using express-session

### Data Storage Solutions

**Current Implementation**
- **Hybrid Storage with Failover**:
  - Primary: **MongoDB** via Mongoose ODM for persistent message storage
  - Fallback: **In-Memory Storage** (`MemStorage` class) if MongoDB unavailable
  - Automatic detection and graceful degradation with console logging
- Message data stored with timestamps and metadata

**Message Storage Architecture**
- MongoDB connection via `MONGODB_URL` environment variable
- Mongoose schema with auto-timestamping for messages
- In-memory Map structure for fallback storage
- Messages sorted by creation date (newest first)

**Authentication System**
- Session-based authentication using express-session
- Admin password stored as `ADMIN_PASSWORD` environment variable
- Session cookies with 24-hour expiration
- Secure cookie settings (httpOnly, secure in production)
- Protected routes: `/api/messages` requires authentication

**Data Models**
- `Message`: Contact form submissions with name, email, subject, message, createdAt
- `MessageInsert`: Zod schema for message validation (excluding id and createdAt)
- `Login`: Zod schema for password validation
- Additional models in schema: Skill, TimelineEvent, SocialLink, Project, Hackathon, Hobby

**Design Decision**: Messages are persisted to MongoDB with in-memory fallback for reliability. If MongoDB_URL is not set or connection fails, the system gracefully falls back to in-memory storage. Admin access to messages requires password authentication via session-based login. Portfolio data remains hardcoded for simplicity.

## Admin Access & Message Management

### Features
- **Contact Form** (`/`): Submit name, email, subject, and message - automatically stored to database/memory
- **Admin Login** (`/login`): Secure password-based authentication using express-session
- **Messages Inbox** (`/messages`): View all submitted messages (admin-only, requires login)
- **Session Management**: 24-hour authenticated sessions with secure httpOnly cookies
- **Logout**: End session and return to portfolio homepage

### Environment Requirements
- `ADMIN_PASSWORD`: Set as a secret for admin authentication
- `MONGODB_URL`: Optional MongoDB connection string for persistent storage (falls back to in-memory if not available)

### Authentication Flow
1. User clicks "Messages (Admin)" icon in navbar
2. Redirected to login page (`/login`)
3. Enter admin password
4. Session created, redirected to messages inbox
5. All submitted messages displayed in reverse chronological order
6. Click "Logout" to end session

### External Dependencies

**UI Component Libraries**
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (accordion, dialog, dropdown, popover, tabs, toast, tooltip, etc.)
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icons (specifically `react-icons/si` for social media logos)
- **Embla Carousel**: Touch-friendly carousel component
- **cmdk**: Command palette component
- **vaul**: Drawer component for mobile interfaces

**Form & Validation**
- **React Hook Form**: Form state management
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries
- **Zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod

**Database & ORM**
- **Drizzle ORM**: Type-safe ORM for SQL databases
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-kit**: CLI tool for schema migrations

**Development Tools**
- **@replit/vite-plugin-runtime-error-modal**: Error overlay for development
- **@replit/vite-plugin-cartographer**: Code navigation tool
- **@replit/vite-plugin-dev-banner**: Development environment indicator

**Styling Utilities**
- **clsx**: Utility for constructing className strings
- **tailwind-merge**: Utility for merging Tailwind CSS classes
- **tailwindcss**: Utility-first CSS framework
- **autoprefixer**: PostCSS plugin for vendor prefixes

**Date Utilities**
- **date-fns**: Modern date utility library

**Session Management**
- **connect-pg-simple**: PostgreSQL session store for Express (configured but not actively used in current implementation)

**Build Tools**
- **TypeScript**: Type-safe JavaScript
- **Vite**: Next-generation frontend build tool
- **esbuild**: Fast JavaScript bundler
- **PostCSS**: CSS transformation tool