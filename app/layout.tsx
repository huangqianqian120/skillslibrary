import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { VisitTracker } from "@/components/VisitTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://skillslibrary.fun"),
  title: {
    default: "AI Agent Skills Library | 50+ Skills for OpenClaw, Claude Code & Codex",
    template: "%s | Skills Library",
  },
  description: "Discover 50+ AI agent skills for OpenClaw, Claude Code, and Codex. Browse skills for development, productivity, communication, automation, and more. Free & open-source.",
  keywords: ["AI agent skills", "Claude Code skills", "OpenClaw skills", "Codex skills", "AI assistant plugins", "Claude plugins", "agent skills", "automation skills", "developer tools", "CLI skills", "productivity skills"],
  authors: [{ name: "OpenClaw Community" }],
  creator: "OpenClaw",
  publisher: "OpenClaw",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillslibrary.fun",
    siteName: "Skills Library",
    title: "AI Agent Skills Library | 50+ Skills for OpenClaw & Codex",
    description: "Discover 50+ AI agent skills for OpenClaw, Claude Code, and Codex. Browse skills for development, productivity, communication, automation, and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Skills Library - AI Agent Skills Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Skills Library",
    description: "Discover 50+ skills for OpenClaw, Claude Code & Codex",
    images: ["/og-image.png"],
  },
  other: {
    "og:see_also": "https://github.com/openclaw/openclaw",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <VisitTracker />
        {/* Enhanced JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Skills Library",
              "url": "https://skillslibrary.fun",
              "description": "Discover 50+ AI agent skills for OpenClaw, Claude Code, and Codex. Browse skills for development, productivity, communication, automation, and more.",
              "keywords": ["AI agent skills", "Claude Code skills", "OpenClaw skills", "Codex skills"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://skillslibrary.fun/?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "OpenClaw",
                "url": "https://github.com/openclaw/openclaw"
              },
              "license": "https://opensource.org/licenses/MIT",
              "softwareVersion": "1.0",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "macOS, Linux, Windows",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OpenClaw",
              "url": "https://github.com/openclaw/openclaw",
              "logo": "https://skillslibrary.fun/og-image.png",
              "description": "OpenClaw - AI agent platform for automation and productivity",
              "sameAs": [
                "https://github.com/openclaw/openclaw",
                "https://discord.gg/clawd"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <main>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
