import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mohammad Nadeem - Professional Portfolio",
  description: "Mohammad Nadeem - Full-Stack Developer & Cybersecurity Enthusiast portfolio. Dynamic web applications, IoT architectures, and secure API systems.",
  keywords: ["Mohammad Nadeem", "Full-Stack Developer", "Next.js", "React", "Cybersecurity", "IoT", "Portfolio"],
  authors: [{ name: "Mohammad Nadeem" }],
  openGraph: {
    title: "Mohammad Nadeem - Professional Portfolio",
    description: "Mohammad Nadeem - Full-Stack Developer & Cybersecurity Enthusiast portfolio.",
    type: "website",
    locale: "en_US",
    siteName: "Mohammad Nadeem Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Nadeem - Professional Portfolio",
    description: "Full-Stack Developer & Cybersecurity Enthusiast portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohammad Nadeem",
    jobTitle: "Full-Stack Developer",
    sameAs: [
      "https://github.com/Nadeem0105"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-[#0A0A0B] text-[#F0EAD6]`}
      >
        {children}
      </body>
    </html>
  );
}
