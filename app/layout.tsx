import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio3D | Creative Developer & 3D Designer",
  description: "Interactive 3D portfolio showcasing creative development and 3D design projects.",
  keywords: "3D portfolio, creative developer, WebGL, Three.js, interactive design, Spline",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
        >
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
