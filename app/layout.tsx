import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Technologist // Full Stack Developer",
  description: "Portfolio of a Creative Technologist & Full Stack Developer bridging precise design with robust architecture.",
  keywords: ["developer", "creative technologist", "full stack", "react", "next.js", "portfolio"],
  authors: [{ name: "Frank Dulko" }],
  creator: "Frank Dulko",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Creative Technologist // Full Stack Developer",
    description: "Engineering digital experiences that feel right.",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Technologist // Full Stack Developer",
    description: "Engineering digital experiences that feel right.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
