# AI Meal Planner - Backend API

Production-ready backend for the AI Meal Planner application built with Node.js, Express, and PostgreSQL (via Prisma).

## Architecture

- **Clean Architecture & SOLID**: The codebase is strictly structured to separate routing, middleware, controllers, and services.
- **ES Modules**: Utilizes `"type": "module"` for modern JavaScript module resolution.

## Folder Structure

\`\`\`
src/
├── config/        # Environment and 3rd party config (e.g., CORS, Winston)
├── constants/     # Global constants and enums
├── controllers/   # Route handlers (thin logic)
├── middleware/    # Express middlewares (Error handling, validation, etc.)
├── repositories/  # Database access layer (Prisma calls)
├── routes/        # API routing
├── services/      # Business logic
├── utils/         # Reusable helpers (ApiError, ApiResponse, Logger, etc.)
├── validators/    # Request payload validation schemas
├── app.js         # Express app initialization
└── server.js      # Server entry point
\`\`\`

## Getting Started

1. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment Configuration**:
   Copy `.env.example` to `.env` and fill in the values.

3. **Run Development Server**:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

- \`GET /api/health\` - Server health check.
