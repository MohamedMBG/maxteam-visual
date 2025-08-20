# MaxTeam Visual - Professional Video Production Studio

A modern, full-stack web application for a professional video production studio, featuring an interactive portfolio, client portal, admin dashboard, and gamification elements.

## 🎬 Project Overview

MaxTeam Visual is a comprehensive digital platform for a video production studio that showcases their work, manages client relationships, and provides administrative tools for project management. The application features a modern, responsive design with interactive elements, animations, and a sophisticated user experience.

## ✨ Key Features

### 🏠 Public Website
- **Interactive Homepage** with animated counters and scroll-triggered animations
- **Portfolio Showcase** with project grid and detailed project pages
- **Services Overview** highlighting video production capabilities
- **About Us** section with team information and company story
- **Contact Form** with integrated contact information
- **Responsive Design** optimized for all devices

### 👥 Client Portal
- **Project Tracking** with real-time status updates
- **File Management** for project assets and deliverables
- **Communication Hub** for client-studio interactions
- **Progress Monitoring** with visual progress indicators
- **Review System** for project feedback and approvals

### 🔧 Admin Dashboard
- **Project Management** with CRUD operations
- **Media Library** for asset organization
- **Analytics Dashboard** for business insights
- **Approval Workflow** for project reviews
- **User Management** for team coordination
- **Content Management** for website updates

### 🎮 Gamification System
- **Achievement Badges** for team milestones and accomplishments
- **Progress Tracking** with visual progress bars
- **Easter Eggs** for interactive user engagement
- **Team Fun Facts** and engagement features

### 🎨 Design System
- **Modern UI Components** built with Radix UI and shadcn/ui
- **Dark/Light Theme** support with seamless switching
- **Custom Animations** using Framer Motion
- **Responsive Layouts** with mobile-first approach
- **Accessibility** compliant components

## 🏗️ Project Structure

```
maxteam-visual/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with animations
│   ├── layout.tsx                # Root layout with fonts and navigation
│   ├── globals.css               # Global styles and Tailwind CSS
│   ├── about/                    # About page
│   ├── contact/                  # Contact page with form
│   ├── services/                 # Services overview
│   ├── work/                     # Portfolio and project showcase
│   │   └── [slug]/               # Dynamic project pages
│   ├── client-portal/            # Client dashboard
│   │   └── page.tsx              # Client portal main page
│   └── admin/                    # Admin dashboard
│       ├── page.tsx              # Admin main dashboard
│       ├── layout.tsx            # Admin layout with sidebar
│       ├── login/                # Admin authentication
│       ├── projects/             # Project management
│       ├── media/                # Media library
│       ├── analytics/            # Analytics dashboard
│       └── approvals/            # Approval workflow
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx            # Button component
│   │   ├── card.tsx              # Card component
│   │   ├── dialog.tsx            # Modal dialogs
│   │   ├── form.tsx              # Form components
│   │   ├── input.tsx             # Input fields
│   │   ├── navigation-menu.tsx   # Navigation components
│   │   ├── sidebar.tsx           # Admin sidebar
│   │   ├── table.tsx             # Data tables
│   │   ├── toast.tsx             # Notifications
│   │   └── ...                   # 40+ UI components
│   ├── gamification/             # Gamification features
│   │   ├── AchievementBadges.tsx # Achievement system
│   │   └── EasterEgg.tsx         # Interactive easter eggs
│   ├── navigation.tsx            # Main navigation
│   ├── project-grid.tsx          # Portfolio grid
│   ├── media-upload-modal.tsx    # File upload modal
│   ├── admin-auth-guard.tsx      # Admin authentication guard
│   └── theme-provider.tsx        # Theme management
├── lib/                          # Utility functions
│   └── utils.ts                  # Common utilities (clsx, tailwind-merge)
├── hooks/                        # Custom React hooks
├── data/                         # Static data and content
│   └── badges.ts                 # Achievement badges data
├── styles/                       # Additional styles
├── public/                       # Static assets
├── __tests__/                    # Test files
│   └── gamification.spec.tsx     # Gamification tests
├── package.json                  # Dependencies and scripts
├── next.config.mjs               # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration
├── components.json               # shadcn/ui configuration
└── README.md                     # This file
```

## 🛠️ Technologies Used

### Core Framework & Runtime
- **[Next.js 15.2.4](https://nextjs.org/)** - React framework with App Router for server-side rendering and static site generation
- **[React 19](https://react.dev/)** - JavaScript library for building user interfaces with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript with advanced type checking

### Package Management
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager with monorepo support

### Styling & CSS Framework
- **[Tailwind CSS 4.1.9](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[PostCSS 8.5](https://postcss.org/)** - CSS transformation tool for processing
- **[Autoprefixer 10.4.20](https://autoprefixer.github.io/)** - CSS vendor prefixing for cross-browser compatibility
- **[Tailwind CSS Animate 1.0.7](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities for Tailwind
- **CSS Variables** - For dynamic theming and color management

### UI Component Libraries
- **[Radix UI](https://www.radix-ui.com/)** - Comprehensive set of accessible UI primitives:
  - **Accordion** - Collapsible content sections
  - **Alert Dialog** - Modal confirmation dialogs
  - **Avatar** - User profile images
  - **Checkbox** - Form input controls
  - **Collapsible** - Expandable content
  - **Context Menu** - Right-click menus
  - **Dialog** - Modal overlays
  - **Dropdown Menu** - Navigation menus
  - **Hover Card** - Tooltip-like components
  - **Navigation Menu** - Site navigation
  - **Popover** - Floating content
  - **Progress** - Progress indicators
  - **Radio Group** - Form selection
  - **Scroll Area** - Custom scrollbars
  - **Select** - Dropdown selections
  - **Separator** - Visual dividers
  - **Slider** - Range inputs
  - **Switch** - Toggle controls
  - **Tabs** - Tabbed interfaces
  - **Toast** - Notifications
  - **Toggle** - Button toggles
  - **Tooltip** - Hover information

- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library built on Radix UI with consistent design
- **[Lucide React 0.454.0](https://lucide.dev/)** - Beautiful, customizable icon library

### Form Handling & Validation
- **[React Hook Form 7.60.0](https://react-hook-form.com/)** - Performant forms with minimal re-renders
- **[Zod 3.25.67](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers 3.10.0](https://github.com/react-hook-form/resolvers)** - Form validation resolvers

### Animation & Motion
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library for React
- **[Embla Carousel React 8.5.1](https://www.embla-carousel.com/)** - Lightweight carousel/slider component

### Date & Time Management
- **[date-fns 4.1.0](https://date-fns.org/)** - Modern JavaScript date utility library
- **[React Day Picker 9.8.0](https://react-day-picker.js.org/)** - Flexible date picker component

### Data Visualization
- **[Recharts](https://recharts.org/)** - Composable charting library for React

### UI Enhancement Libraries
- **[Class Variance Authority 0.7.1](https://cva.style/docs)** - Component variant management
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge 2.5.5](https://github.com/dcastil/tailwind-merge)** - Tailwind class merging utility
- **[cmdk 1.4.1](https://cmdk.paco.me/)** - Command palette component
- **[input-otp 1.4.1](https://ui.shadcn.com/docs/components/input-otp)** - OTP input component
- **[react-resizable-panels 2.1.7](https://react-resizable-panels.vercel.app/)** - Resizable panel layouts
- **[vaul 0.9.9](https://vaul.emilkowal.ski/)** - Drawer component
- **[sonner 1.7.4](https://sonner.emilkowal.ski/)** - Toast notifications

### Theming & Design
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Theme switching for Next.js
- **[Geist 1.3.1](https://vercel.com/font)** - Modern font family

### Testing Framework
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)** - React testing utilities
- **[@testing-library/dom](https://testing-library.com/docs/dom-testing-library/intro/)** - DOM testing utilities

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and quality assurance
- **[Node.js](https://nodejs.org/)** - JavaScript runtime environment

### Fonts & Typography
- **[Google Fonts](https://fonts.google.com/)** - Montserrat and Open Sans via Next.js font optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd maxteam-visual
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎯 Key Features in Detail

### Interactive Homepage
- Animated counters for statistics (projects, awards, clients, experience)
- Scroll-triggered animations using Intersection Observer
- Smooth transitions and micro-interactions
- Responsive hero section with call-to-action

### Portfolio System
- Dynamic project pages with detailed information
- Image galleries and video showcases
- Project categorization and filtering
- Client testimonials and project outcomes

### Client Portal
- Real-time project status tracking
- File upload and download capabilities
- Communication tools for client feedback
- Progress visualization with charts

### Admin Dashboard
- Comprehensive project management interface
- Media library with organization tools
- Analytics and reporting features
- User management and permissions

### Gamification
- Achievement badges for team milestones
- Progress tracking with visual indicators
- Interactive easter eggs for engagement
- Team fun facts and engagement features

## 🎨 Design System

The project uses a comprehensive design system built on:
- **shadcn/ui** components for consistency
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **CSS Variables** for theming

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized images and assets

## ♿ Accessibility

Built with accessibility in mind:
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## 🧪 Testing

The project includes:
- Unit tests for components
- Integration tests for features
- Accessibility testing
- Performance testing

## 📦 Deployment

The application can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

MaxTeam Visual - Professional Video Production Studio

---

**Built with ❤️ using Next.js, React, TypeScript, and modern web technologies**
