import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

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
    default: "Skills Library - Discover 50+ AI Agent Skills",
    template: "%s | Skills Library",
  },
  description: "Browse and discover 50+ Claude Skills for OpenClaw, Codex, and AI agents. Find skills for development, productivity, communication, media, and more.",
  keywords: ["Claude Skills", "AI Agent", "OpenClaw", "Codex", "Automation", "Productivity", "Developer Tools", "CLI"],
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
    title: "Skills Library - Discover 50+ AI Agent Skills",
    description: "Browse and discover 50+ Claude Skills for OpenClaw, Codex, and AI agents.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Skills Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills Library",
    description: "Discover 50+ AI Agent Skills for OpenClaw and Codex",
    images: ["/og-image.png"],
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Skills Library",
              "url": "https://skillslibrary.fun",
              "description": "A collection of Claude Skills for AI agents",
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
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
