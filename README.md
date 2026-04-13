<div align="center">
  <h1>🚀 MySaaS</h1>
  <p>The ultimate modern SaaS boilerplate built with Next.js 15, Tailwind CSS 4, and cutting-edge web technologies.</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#folder-structure">Folder Structure</a>
  </p>
</div>

---

## ✨ Features

- **⚡️ Next.js 15** - React 19, Server Components, App Router
- **🎨 Styling** - Tailwind CSS v4, Framer Motion & GSAP for highly fluid animations
- **🔐 Authentication** - Clerk & Supabase Auth integrations
- **💳 Payments** - Stripe integration for subscriptions and one-off payments
- **🗄️ Database** - Supabase (PostgreSQL) setup ready to go
- **📁 File Uploads** - Seamless file uploads with UploadThing
- **📝 Documentation/Blog** - Contentlayer2 powered MDX
- **📧 Emails** - React Email templates ready for production
- **🌍 Internationalization** - `next-intl` & `i18next` configured
- **🤖 AI Ready** - OpenAI SDK integrated for AI features
- **💎 UI Components** - Radix UI + shadcn/ui inspired primitives
- **🛡️ Type Safe** - TypeScript, Zod, and strict ESLint rules

## 🛠 Tech Stack

| Category | Technologies |
| --- | --- |
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| **Styling & UI** | [Tailwind CSS 4](https://tailwindcss.com/), Radix UI, Lucide Icons |
| **Animations** | [Framer Motion](https://motion.dev/), [GSAP](https://gsap.com/) |
| **Database & ORM**| [Supabase](https://supabase.com/) |
| **Auth** | [Clerk](https://clerk.com/) / Supabase Auth |
| **Data Fetching** | [TanStack Query v5](https://tanstack.com/query/latest) |
| **Forms & Validation**| React Hook Form, Zod |
| **Payments** | [Stripe](https://stripe.com/) |

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:
- Node.js (v20.x recommended)
- npm, yarn, or pnpm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mysaas.git
cd mysaas
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory (you can copy `.env.local.example` if it exists) and fill in the required environment variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# OpenAI
OPENAI_API_KEY=

# ...add other required keys
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Folder Structure

```
.
├── locales/          # Internationalization files
├── public/           # Static assets
├── src/              # Source code
│   ├── app/          # Next.js App Router
│   ├── components/   # Reusable UI components
│   ├── lib/          # Utilities and libraries
│   └── ...
├── .env.local        # Local environment variables
├── next.config.ts    # Next.js configuration
├── tailwind.config.ts# Tailwind configuration
└── package.json      # Dependencies and scripts
```

## 📜 Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production.
- `npm run start` - Runs the built app in production mode.
- `npm run lint` - Runs ESLint to catch errors.
- `npm run format` - Formats code using Prettier.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
Feel free to check [issues page](https://github.com/yourusername/mysaas/issues).

---
<div align="center">
  Built with ❤️ for rapid SaaS development.
</div>
