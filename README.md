# React + Vite

A React + Vite single-page application for authentication and todo management.

## Features

- Authentication flow with protected dashboard routes
- Dashboard home with user welcome message
- Todo list, add, edit, and dashboard navigation
- SPA-friendly deployment setup for Vercel

## Tech Stack

- React 19
- Vite
- React Router
- Ant Design
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is configured for Vercel as a single-page application. The root [vercel.json](vercel.json) file rewrites all routes to [index.html](index.html), so refreshing on routes like `/dashboard` or `/dashboard/todos` will not show a 404.

## Notes

- The app uses local storage for user and todo data in the current implementation.
- The default Vite starter text has been replaced with project-specific documentation.
