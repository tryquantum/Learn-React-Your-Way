# Growtiva - AI Marketing Team for Solopreneurs

![Growtiva](./public/images/logo.svg)

**Growtiva** is an AI-powered marketing platform designed specifically for solopreneurs. It provides professional content creation, social media automation, and email marketing tools—helping you grow like a team of 5 without the payroll.

## 🌟 Features

- **AI-Powered Content Creation**: Generate professional copy for social media, emails, and landing pages in seconds
- **Multi-Platform Publishing**: Schedule and post to Instagram, Facebook, LinkedIn, TikTok, and X from one dashboard
- **Email Marketing Automation**: Pre-built sequences for welcomes, launches, and follow-ups
- **35+ Industry Templates**: Ready-to-use content blueprints for various industries
- **Analytics Dashboard**: Track engagement, conversions, and performance metrics
- **Dark Mode Support**: Seamless light/dark theme switching
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **SEO Optimized**: Comprehensive metadata, sitemap, and robots.txt configuration
- **Error Handling**: Custom error boundaries, 404, and loading states
- **Google Analytics Integration**: Track user behavior and conversions

## 🛠 Tech Stack

### Core
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design system
- **Fonts**: [Geist Sans & Geist Mono](https://vercel.com/font)

### UI Components
- **Component Library**: 60+ custom components built with [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Remix Icon](https://remixicon.com/) & [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

### Development
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind plugin
- **Type Safety**: TypeScript with strict mode

## 📁 Project Structure

```
growtiva/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/
│   │   ├── signup/
│   │   └── verify-email/
│   ├── dashboard/                # Dashboard pages
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading state
│   ├── not-found.tsx             # 404 page
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                  # Homepage
│   ├── sitemap.ts                # Dynamic sitemap
│   ├── robots.ts                 # Robots.txt config
│   ├── opengraph-image.tsx       # OG image generation
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── sections/                 # Page sections
│   │   ├── PainPointsSection.tsx
│   │   ├── ValuePropsSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── ...
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   └── ... (60+ components)
│   ├── error-boundary.tsx        # Error boundary component
│   ├── GoogleAnalytics.tsx       # Analytics component
│   └── Footer.tsx                # Site footer
├── data/                         # Static data
│   └── landing-content.ts        # Landing page content
├── hooks/                        # Custom React hooks
│   ├── use-local-storage.ts
│   └── use-notification.ts
├── utils/                        # Utility functions
│   ├── analytics.ts              # Google Analytics utilities
│   ├── form-validation.ts        # Form validation helpers
│   ├── cn.ts                     # Class name utility
│   └── tv.ts                     # Tailwind variants
├── public/                       # Static assets
│   └── images/
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- pnpm (recommended), npm, or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/growtiva.git
cd growtiva
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# API Configuration (if using backend)
NEXT_PUBLIC_API_BASE_URL=https://api.growtiva.com
NEXT_PUBLIC_XANO_BASE_URL=your-xano-url

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Development Workflow

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format:write     # Format code with Prettier
```

### Code Style

- **Components**: Use functional components with TypeScript
- **Styling**: Use Tailwind CSS classes and custom design tokens
- **File Naming**: 
  - Components: PascalCase (e.g., `Button.tsx`)
  - Utilities: kebab-case (e.g., `form-validation.ts`)
  - Pages: lowercase (e.g., `page.tsx`)

### Adding New Content

To modify landing page content:

1. Edit [`data/landing-content.ts`](./data/landing-content.ts)
2. Content is automatically reflected in the corresponding section components

## 🎨 Design System

The project uses a comprehensive design system with:

- **Typography**: Title, Label, Paragraph, and Subheading scales
- **Colors**: Semantic color tokens (primary, success, error, warning, etc.)
- **Spacing**: Consistent spacing scale
- **Shadows**: Custom shadow utilities
- **Border Radius**: Predefined radius values

Design tokens are defined in [`tailwind.config.ts`](./tailwind.config.ts).

## 📊 Analytics

Google Analytics is integrated for tracking:

- Page views
- User interactions (button clicks, form submissions)
- Conversions (signups, logins)
- Custom events

Track custom events using the analytics utility:

```typescript
import { trackButtonClick, trackCTAClick } from '@/utils/analytics';

// Track button click
trackButtonClick('Start Free Trial');

// Track CTA click
trackCTAClick('Sign Up', 'Hero Section');
```

## 🧪 Testing

Currently, the project doesn't have automated tests. Recommended additions:

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright or Cypress
- **Type Checking**: `tsc --noEmit`

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The project is a standard Next.js application and can be deployed to:

- **Netlify**: Use the [Netlify Next.js plugin](https://github.com/netlify/next-runtime)
- **AWS Amplify**: Follow the [AWS deployment guide](https://docs.amplify.aws/nextjs)
- **Docker**: Create a Dockerfile using the [official example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For questions or support:

- **Email**: support@growtiva.com
- **Documentation**: [growtiva.com/docs](https://growtiva.com/docs)
- **Community**: Join our [Discord](https://discord.gg/growtiva)

## 🙏 Acknowledgments

- Built on [AlignUI Design System](https://alignui.com)
- Powered by [Next.js](https://nextjs.org/)
- UI Components from [Radix UI](https://www.radix-ui.com/)

---

Made with ❤️ for solopreneurs everywhere.

