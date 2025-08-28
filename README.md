Stay - Project Documentation
Overview
Stay is a web application built with Astro, TypeScript, React, and Prisma, designed to manage user authentication and task completion tracking. The application supports user registration, login, task uploads, and theme switching, with a responsive UI and MongoDB as the backend database.
Directory Structure
stay/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── components/
│   │   ├── Buttons/
│   │   │   ├── ScrollTop.tsx
│   │   │   └── ThemeSwitcher.tsx
│   │   ├── Cards/
│   │   │   └── Task/
│   │   │       └── UploadTaskButton.tsx
│   │   ├── Common/
│   │   │   ├── AuthGuard.tsx
│   │   │   ├── HambuguerMenu.tsx
│   │   │   └── Modal.tsx
│   │   ├── Forms/
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   ├── constants/
│   │   └── nav.ts
│   ├── hooks/
│   │   └── useAuth.tsx
│   ├── i18n/
│   │   └── ui.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── pages/
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login.ts
│   │       │   └── register.ts
│   │       ├── tasks/
│   │       │   └── completed.ts
│   │       └── users/
│   │           └── me.ts
│   ├── schemas/
│   │   ├── auth/
│   │   │   ├── login.ts
│   │   │   └── register.ts
│   │   ├── task.ts
│   │   └── user.ts
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── getFirstZodErrorMessage.ts
│   │   ├── requireAuth.ts
│   │   ├── sendResponse.ts
│   │   └── validateToken.ts
│   └── content.config.ts
└── eslint.config.js

Key Components
Prisma Schema (prisma/schema.prisma)
Defines the MongoDB data models for the application:

User: Stores user information including username, email, password, points, tasks done, and avatar.
TaskCompleted: Tracks completed tasks with user ID, points, name, description, and image.

Components
Buttons

ScrollTop.tsx: A button that appears after scrolling 100 pixels, allowing users to smoothly scroll back to the top.
ThemeSwitcher.tsx: Toggles between light and dark modes, storing the preference in localStorage.

Cards/Task

UploadTaskButton.tsx: Allows users to upload a file for a task, with randomized button colors and a modal for success messages.

Common

AuthGuard.tsx: Ensures users are authenticated, redirecting to the login page if not.
HambuguerMenu.tsx: A responsive hamburger menu for mobile navigation.
Modal.tsx: A reusable modal component for displaying messages with animations.

Forms

Login.tsx: A form for user login with email and password validation.
Register.tsx: A form for user registration, requiring email, password, and password confirmation.

Constants

nav.ts: Defines navigation links for the application.

Hooks

useAuth.tsx: Custom hook for fetching and managing authenticated user data.

Internationalization

ui.ts: Configures supported languages (English and Spanish) and translation strings.

Lib

prisma.ts: Initializes the Prisma client for MongoDB interactions.

API Routes

auth/login.ts: Handles user login with JWT authentication.
auth/register.ts: Manages user registration, enforcing Gmail email addresses and unique usernames.
tasks/completed.ts: Records completed tasks and updates user points.
users/me.ts: Retrieves authenticated user data.

Schemas

auth/login.ts: Zod schema for login data validation.
auth/register.ts: Zod schema for registration data validation.
task.ts: Zod schemas for tasks and completed task data.
user.ts: Zod schema for user data, excluding sensitive fields like password.

Styles

globals.css: Global Tailwind CSS styles with custom scrollbar and animation definitions.

Utils

cn.ts: Merges class names using clsx and tailwind-merge.
getFirstZodErrorMessage.ts: Extracts the first error message from Zod validation.
requireAuth.ts: Middleware to enforce authentication for protected routes.
sendResponse.ts: Standardizes API responses.
validateToken.ts: Validates JWT tokens.

Content Configuration

content.config.ts: Defines the Astro content collection for tasks, using a JSON file and Zod schema.

ESLint Configuration

eslint.config.js: Configures ESLint with TypeScript, React, Astro, and Prettier rules for consistent code quality.

Dependencies

Prisma: ORM for MongoDB.
React: UI library for components.
Astro: Framework for building the application.
Zod: Schema validation.
Axios: HTTP client for API requests.
bcryptjs: Password hashing.
jsonwebtoken: JWT handling.
Tailwind CSS: Styling framework.
Framer Motion: Animations for modals.
React Icons: Icon library.

Setup Instructions

Install Dependencies:
npm install


Configure Environment:Create a .env file with:
DATABASE_URL="mongodb://<your-mongodb-uri>"
JWT_SECRET="your-secret-key"


Run Prisma Migrations:
npx prisma generate


Start the Application:
npm run dev



Usage

Authentication: Users can register and log in using the forms at /auth/register and /auth/login.
Task Management: Authenticated users can upload task completions via the UploadTaskButton component.
Navigation: The hamburger menu provides mobile-friendly navigation.
Theme Switching: Toggle between light and dark modes using the ThemeSwitcher.

Notes

The application enforces Gmail-only email addresses for registration.
JWT tokens are stored as HTTP-only cookies with a 7-day expiration.
The UI supports English and Spanish, with translations defined in i18n/ui.ts.
The application uses Tailwind CSS for styling and includes custom animations for a dynamic user experience.
