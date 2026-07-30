# Changelog

All notable changes to this project will be documented in this file.

---

# v2.0.0 - Authentication & Authorization

Release Date: 2026-07-30

## ✨ Added

### Authentication
- User Registration
- User Login
- JWT Access Token Authentication
- Refresh Token Rotation
- Secure Logout
- Get Current User (`/api/auth/me`)

### Password Management
- Change Password
- Forgot Password
- Reset Password

### Authorization
- Role-Based Access Control (RBAC)
- Authentication Middleware
- Authorization Middleware

### Security
- Password hashing with bcrypt
- Secure JWT implementation
- Refresh token revocation
- Input validation using express-validator
- Centralized error handling
- Generic authentication error responses
- OWASP-aligned authentication practices

### Testing
- Unit Tests
- Integration Tests
- Authentication Security Audit
- API validation tests

### Developer Experience
- Clean Architecture (Controller → Service → Repository)
- Prisma ORM integration
- Environment-based configuration
- Reusable JWT utilities
- Reusable password utilities

---

# v1.7.0 - Database & Seed Data

## Added

- Prisma schema
- Initial migration
- PostgreSQL integration
- Seed data
- Demo users
- Demo meals
- Grocery data

---

# v1.6.0 - Backend Foundation

## Added

- Express.js server
- Folder architecture
- Middleware
- API response helpers
- Error handling
- Logger
- Environment configuration

---

# v1.0.0 - Frontend MVP

## Added

- React frontend
- Dashboard
- Meal Generator
- Grocery List
- User Profile
- Responsive UI