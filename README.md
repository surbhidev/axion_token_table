## Axiom Token Table
Real-Time Token Analytics Dashboard (Next.js + Tailwind CSS)

A fully responsive, animated, and modern token-analytics dashboard that replicates the Axiom token table UI with pixel-perfect precision.
This project includes real-time updates, rich micro-interactions, popovers, modals, shimmer loaders, and mobile-first responsive design down to 320px width.

## Features
-Beautiful Modern UI
-Hover lift animation
-Ripple click effect
-Smooth popover bounce animation
-Sparkline micro-graph
-Flash animation on price changes
-Modal zoom & blur
-Shimmer skeleton loaders

## Real-Time Data Simulation

-Mock WebSocket-style live updates
-Smooth color transitions
-Animated sparkline based on token direction

## Reusable Components
-Popover
-Tooltip
-Modal
-TokenRow
-Skeleton
-ErrorBoundary (client-safe)
-TokenColumn
-TokenDetails

## Fully Responsive UI

The layout is fully responsive for:

Device	Width
Mobile	320px – 480px
Tablet	768px
Laptop	1024px
Desktop / Ultra-wide	1440px+

All breakpoints are manually tuned for best UX.

## Tech Stack
-Next.js 14 (App Router)
-React 18
-TypeScript
-Tailwind CSS
-Lucide Icons
-Custom real-time mock update engine

##Project Structure
axiom-token-table/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Popover.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Tooltip.tsx
│   │   │
│   │   ├── molecules/
│   │   │   ├── Modal.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   └── TokenRow.tsx
│   │   │
│   │   ├── organisms/
│   │   │   ├── Header.tsx
│   │   │   ├── TokenColumn.tsx
│   │   │   └── TokenDetails.tsx
│   │   │
│   │   └── ErrorBoundary.tsx
│   │
│   ├── hooks/
│   │   └── useTokenData.ts
│   │
│   ├── lib/
│   │   ├── constants.ts
│   │   └── utils.ts
│   │
│   └── types/
│       └── index.ts
│
├── public/
│   └── token icons…
│
├── README.md
├── tailwind.config.js
├── package.json
└── tsconfig.json

### how to run
1️⃣ Install Dependencies
npm install

2️⃣ Run Development Server
npm run dev


## App will run at:
- http://localhost:3000

## Build for Production
npm run build
npm start


## Error Handling

ErrorBoundary.tsx is a client component that wraps your entire UI.
If something breaks, a user-friendly fallback UI appears.