# 👨‍💻 Mohammad Nadeem - Professional Portfolio

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
</div>

<br />

Welcome to the repository of my professional portfolio website! This project is a highly interactive, modern web application designed to showcase my skills, projects, and professional experience as a Full-Stack Developer & Cybersecurity Enthusiast.

## ✨ Key Features

- 🖥️ **Interactive Terminal Overlay (`NADEEM_OS`)**: A fully functional web-based terminal that allows users to navigate the site, run commands (e.g., `whoami`, `ls projects/`, `skills --verbose`), and trigger easter eggs like the Matrix rain effect.
- 🎨 **Immersive UI/UX**: Built with a sleek dark theme featuring modern glassmorphism, dynamic custom cursors, and a responsive layout tailored for all devices.
- 🪄 **Advanced Animations**: Powered by **Framer Motion** and **GSAP** for smooth scroll effects, hover states, and complex choreographed page transitions.
- 🌌 **Particle Backgrounds**: Custom HTML5 canvas-based particle engines that create an engaging "stellar" background aesthetic.
- 🚀 **Next-Gen Tech Stack**: Leverages the power of **Next.js 15 (App Router)** and **React 19** combined with the utility-first styling of **Tailwind CSS v4**.
- ✉️ **Integrated Contact System**: Secure and serverless form handling utilizing **React Hook Form**, **Zod** validation, and **Resend** for seamless email delivery.

## 🛠️ Technology Stack

| Category               | Technologies Used                                                                 |
| ---------------------- | --------------------------------------------------------------------------------- |
| **Framework & Core**   | Next.js 15, React 19, TypeScript                                                  |
| **Styling & UI**       | Tailwind CSS v4, Lucide React, React Icons                                        |
| **Animations**         | Framer Motion, GSAP (`@gsap/react`)                                               |
| **Forms & Validation** | React Hook Form, Zod, `@hookform/resolvers`                                       |
| **Email Service**      | Resend                                                                            |
| **Code Quality**       | ESLint 9, Prettier                                                                |

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites
Make sure you have Node.js (v20+) and npm/yarn/pnpm installed on your local machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nadeem0105/Portfolio_Website.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Portfolio_Website
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Resend API key for the contact form functionality:
   ```env
   RESEND_API_KEY=your_resend_api_key_here
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **View the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```
├── public/                 # Static assets (images, resumes, etc.)
├── src/
│   ├── app/                # Next.js 15 App Router pages and layout
│   ├── components/         # Reusable React components (UI, Sections, Terminal, etc.)
│       ├── ui/             # Core UI components
│       ├── About.tsx       # About Me section
│       ├── Projects.tsx    # Showcase of featured projects
│       ├── TerminalOverlay.tsx # Custom NADEEM_OS terminal implementation
│       └── ...
│   └── lib/                # Utility functions and configurations
├── .env.local              # Environment variables (not tracked by Git)
├── package.json            # Project metadata and dependencies
└── eslint.config.mjs       # ESLint configuration
```

## 🌐 Deployed Version

The live version of this portfolio is deployed on **Vercel** for optimal performance and continuous integration.

## 👨‍💻 About Me

I am a Full-Stack developer and cybersecurity enthusiast focusing on dynamic React/Next.js builds, IoT architectures, and secure API gateways. Currently pursuing my B.Tech in Computer Science and Engineering.

- **LinkedIn**: [Mohammad Nadeem](https://www.linkedin.com/in/mdnadeem0108/)
- **GitHub**: [Nadeem0105](https://github.com/Nadeem0105)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use it as inspiration for your own portfolio!
