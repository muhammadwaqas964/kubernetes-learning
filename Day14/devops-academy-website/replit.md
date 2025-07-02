# DevOps Academy - Learning Platform

## Overview

This is a full-stack learning platform for DevOps and Cloud Computing education. The application provides structured learning paths, interactive topics, and progress tracking for students learning DevOps concepts from beginner to advanced levels.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot module replacement with Vite integration

### Database Schema
- **Users**: Authentication and user management
- **Learning Paths**: Structured curriculum organization (Beginner, Intermediate, Advanced)
- **Topics**: Individual learning modules with content and metadata
- **User Progress**: Tracking completion and progress percentages
- **Code Snippets**: Executable code examples tied to topics

## Key Components

### Learning Management System
- **Learning Paths**: Three-tier system (Beginner, Intermediate, Advanced)
- **Topics**: Individual lessons with markdown content, objectives, and prerequisites
- **Progress Tracking**: Per-user completion status and percentage tracking
- **Search Functionality**: Real-time topic search with debouncing

### Content Management
- **Markdown Rendering**: Custom markdown processor for educational content
- **Code Block System**: Syntax-highlighted code examples with copy functionality
- **Interactive Elements**: Progress bars, badges, and completion indicators
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Authentication & Sessions
- **User Management**: Registration, login, and profile management
- **Session Storage**: PostgreSQL-backed session persistence
- **Progress Persistence**: User-specific learning progress tracking

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with error handling and logging
5. **State Updates**: TanStack Query updates component state automatically

### API Endpoints
- `GET /api/learning-paths` - Retrieve all learning paths
- `GET /api/learning-paths/:id` - Get specific path with topics and progress
- `GET /api/topics` - List all available topics
- `GET /api/topics/search` - Search topics by query string
- `GET /api/topics/:slug` - Get topic content with user progress
- Progress tracking endpoints for user advancement

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **State Management**: TanStack React Query
- **Styling**: Tailwind CSS, Class Variance Authority
- **Development**: Vite, TypeScript, ESLint

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database**: Drizzle ORM, Neon Database driver
- **Session Management**: Express-session, connect-pg-simple
- **Validation**: Zod schema validation
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Development Tools
- **Build System**: Vite with React plugin and runtime error overlay
- **Database Migrations**: Drizzle Kit for schema management
- **Code Quality**: TypeScript strict mode, path aliases
- **Replit Integration**: Cartographer plugin for development environment

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express API proxy
- **Hot Reloading**: Full-stack hot module replacement
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **Asset Serving**: Vite handles client assets, Express serves API

### Production Build
- **Client Build**: Vite builds optimized React bundle to `dist/public`
- **Server Build**: esbuild bundles Express server to `dist/index.js`
- **Static Serving**: Express serves built client assets in production
- **Database**: PostgreSQL migrations via Drizzle Kit push command

### Environment Configuration
- **Development**: NODE_ENV=development with tsx execution
- **Production**: NODE_ENV=production with compiled JavaScript
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Session Storage**: PostgreSQL table for session persistence

## Changelog
```
Changelog:
- July 01, 2025. Initial setup
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```