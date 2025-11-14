# Elite Estates - Premium Real Estate Platform

## Overview

Elite Estates is a full-stack real estate CRM platform built with React, Express, and PostgreSQL. The application provides two distinct experiences: an admin dashboard for property management and a client-facing interface for browsing and interacting with property listings. The platform emphasizes visual appeal with a premium design system inspired by modern real estate platforms like Airbnb and Zillow, featuring property galleries, real-time chat functionality, and an intuitive user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server with HMR support
- **Wouter** for lightweight client-side routing
- **TanStack Query** (React Query) for server state management and caching

**Component Library**
- **shadcn/ui** component system based on Radix UI primitives
- Custom design tokens using CSS variables for theming
- Tailwind CSS for utility-first styling with custom configuration
- Support for light/dark mode theming

**Design System**
- Typography: Inter (UI elements) and Lora (property descriptions) from Google Fonts
- Color system using HSL values with CSS custom properties
- Spacing based on Tailwind's scale (2, 4, 6, 8, 12, 16, 24)
- Responsive grid layouts optimized for property card displays

**State Management**
- React Query for server state with custom query client configuration
- Session-based authentication state synchronized with backend
- Form state managed by React Hook Form with Zod schema validation

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for the REST API
- Session-based authentication using `express-session`
- JSON request/response handling with built-in logging middleware

**API Design**
- RESTful endpoints under `/api` namespace
- Authentication routes: `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`
- Property management endpoints (create, read, update, delete)
- Property interaction endpoints (likes, views tracking)

**Session Management**
- Cookie-based sessions with configurable secret
- 7-day session expiration
- HTTP-only cookies in production for security
- User ID stored in session data for authentication state

### Data Storage

**Database**
- **PostgreSQL** via Neon serverless platform
- **Drizzle ORM** for type-safe database operations
- WebSocket connection support for serverless environments

**Schema Design**
- **Users table**: Stores user credentials, role (admin/client), and profile information
- **Properties table**: Property listings with images array, location, pricing, and view tracking
- **Property Likes table**: Many-to-many relationship tracking user favorites

**Data Validation**
- Drizzle-Zod integration for automatic schema-to-validation conversion
- Type-safe insert schemas exported for frontend consumption
- UUID primary keys with database-generated defaults

**In-Memory Storage Fallback**
- `MemStorage` class implements `IStorage` interface for development/testing
- Pre-populated with sample admin user and property data
- Provides same interface as database storage for seamless switching

### Authentication & Authorization

**Authentication Flow**
- Email/password based authentication (production should use hashed passwords)
- Session creation on successful login with user ID storage
- Role-based access control (admin vs. client roles)
- Protected route components that redirect based on authentication state

**Authorization Strategy**
- Client users: Access to property browsing, likes, and chat features
- Admin users: Full CRUD operations on properties, analytics dashboard
- Frontend route guards using `ProtectedRoute` component with role checking

### External Dependencies

**Database**
- **Neon Database**: Serverless PostgreSQL platform
- Connection via `@neondatabase/serverless` package
- WebSocket support using `ws` package for serverless compatibility

**UI Framework**
- **Radix UI**: Comprehensive collection of unstyled, accessible UI primitives
  - Dialog, Dropdown, Popover, Toast, and 20+ other components
  - Full keyboard navigation and ARIA compliance
  - Customizable through Tailwind CSS

**Development Tools**
- **Replit-specific plugins**: Runtime error overlay, cartographer, dev banner
- **ESBuild**: Production bundling for server code
- **TSX**: TypeScript execution for development server

**Form Handling**
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between React Hook Form and Zod

**Asset Management**
- Static image assets stored in `attached_assets/generated_images/`
- Vite alias configuration for `@assets` imports
- Property images stored as string arrays (URLs/paths)

**Styling**
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Autoprefixer**: Automatic vendor prefixing via PostCSS
- **class-variance-authority**: Type-safe component variant API
- **clsx** and **tailwind-merge**: Conditional class composition

**Type Safety**
- Shared TypeScript types between client and server via `@shared` path alias
- Drizzle ORM provides database schema types
- Zod schemas ensure runtime type validation matches TypeScript types