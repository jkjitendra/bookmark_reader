# **Bookmark Reader Dashboard**

## Description
A modern, responsive web application for managing and reading bookmarked articles — built with Next.js 16, React 19, and Tailwind CSS, using a modular component architecture powered by Radix UI primitives and class-variance-authority (CVA).


## Features

- Dashboard View – Browse, search, sort, and filter saved bookmarks
-  Reader Mode – View full articles in a distraction-free interface
- Modular UI System – Built using reusable, accessible Radix components
- Notification Popup – Get article reminders and reading suggestions
- Summary Editor – Quickly generate or edit content summaries
- Collaboration Panel – Interact or share reading sessions with others
- Settings Page – Manage appearance (dark mode, layout preferences, etc.)
- Responsive Design – Optimized for mobile, tablet, and desktop

## Installation

Step 1 : Clone the repository

```bash 
git clone https://github.com/yourusername/bookmark-reader.git

cd bookmark-reader/web
```

Step 2: Install dependencies

Make sure you have Node.js 20+ and npm installed.

```bash
npm install
```

Step 3: Start the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Project Structure

```
web/
├── app/
│   ├── layout.tsx           # Root layout (global fonts, styles, metadata)
│   └── page.tsx             # Entry page that loads the Dashboard
│
├── components/
│   ├── Dashboard.tsx        # Main application container managing state & layout
│   ├── MainContent.tsx      # Displays bookmarks, search, sorting, pagination
│   ├── BookmarkCard.tsx     # Individual bookmark card with actions
│   ├── Sidebar.tsx          # Filter & navigation sidebar
│   ├── TopNavigation.tsx    # Header with dark mode toggle & settings
│   ├── CollaborationPanel.tsx # Realtime collaboration section
│   ├── SummaryEditor.tsx    # Modal for creating/editing summaries
│   ├── NotificationPopup.tsx # In-app notifications and reminders
│   ├── SettingsPage.tsx     # User settings panel
│   └── ui/                  # Shared UI primitives (Radix-based)
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── alert-dialog.tsx
│       ├── aspect-ratio.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── select.tsx
│       ├── sidebar.tsx
│       ├── utils.ts
│       └── use-mobile.ts
│
├── styles/
│   └── globals.css          # Tailwind and global CSS imports
│
├── public/                  # Static assets (icons, images)
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies & scripts
```

## Design & Architecture

### Component Architecture

- Atomic Design: Built using reusable atoms (Button, Badge), molecules (BookmarkCard), and organisms (Dashboard, MainContent).
- Composable UI: Each UI element can be reused independently.
- State Management: Managed via React hooks at component level for simplicity.

### Framework & Tools

- Next.js 16 (App Router) – File-based routing and modern server rendering.
- React 19 – Hooks-based functional components.
- Tailwind CSS – Utility-first styling.
- Radix UI Primitives – Accessible, unstyled components.
- class-variance-authority (CVA) – Manage component style variants cleanly.

### Theming & Responsiveness

- Supports both light and dark themes.
- Uses useIsMobile hook for responsive UI transitions.


## Collaboration Guidelines
### Branch Naming Convention

```
feat/feature-name
fix/bug-description
refactor/component-name
docs/update-readme
```

### Commit Messages

```
feat(ui): add new BookmarkCard component
fix(dashboard): resolve layout overflow on mobile
```

### Pull Requests

- Keep PRs small and focused.
- Include screenshots or screen recordings for UI updates.
- Ensure linting and formatting pass (npm run lint).

### Code Style

- Use Prettier and ESLint.
- Avoid inline styles; prefer utility classes.
- Prefer functional components and hooks.


## License

This project is licensed under the MIT License.
See the [LICENSE](../LICENSE) file for details.