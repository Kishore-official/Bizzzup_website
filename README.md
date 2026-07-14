<div align="center">

# 🏢 Bizzzup AI Labs — Marketing Website

### A premium, calm marketing site with an integrated AI chat assistant

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[![Gemini AI](https://img.shields.io/badge/Gemini-AI_Chat-8E75B2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-BB4B96?style=flat-square)](https://www.framer.com/motion/)

</div>

The marketing website for **Bizzzup AI Labs**, built around a deliberate design system — warm neutrals over stark white, restrained accent colors, and hierarchy through surface shifts instead of loud color blocks — rather than a generic SaaS-template look.

## ✨ Features

- 🤖 **AI chat assistant** — powered by Google's Gemini API (`/api/chat`) for visitor Q&A
- 📬 **Contact form** — server-side handling via `/api/contact`
- 🎨 **Custom design system** — documented token system (`design-system-reference.md`) covering surfaces, text hierarchy, and interaction states
- 🎬 **Motion throughout** — Framer Motion for section transitions and micro-interactions
- 🗂️ **Sectioned marketing layout** — Hero, Features, Feature Cards, Testimonials, Team, Blog, Contact, CTA
- 🐳 **Containerized** — ships with a `Dockerfile` and Cloud Run deploy script

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| AI | Google Generative AI (Gemini) |
| Deployment | Docker, Google Cloud Run |

## 🎨 Design Principles

> Full reference: [`design-system-reference.md`](./design-system-reference.md)

- **Premium and calm** — refined, not loud; avoid startup-generic aesthetics
- **Warm neutrals over pure white** — off-whites and warm grays instead of `#FFFFFF` backgrounds
- **No generic SaaS blue** — a restrained, desaturated, intentional accent palette
- **Hierarchy through surface, not color** — subtle background shifts between sections
- **Quiet confidence** — responsive interactions that never feel flashy

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev

# Build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it locally. Requires a `GOOGLE_GENERATIVE_AI_API_KEY` environment variable for the AI chat feature.

## 🐳 Docker

```bash
docker build -t bizzzup-website .
docker run -p 3000:3000 bizzzup-website
```

## 📬 Contact

- **Email:** arunkishore757@gmail.com
- **GitHub:** [@Kishore-official](https://github.com/Kishore-official)
