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
  title: "Godship",
  description: "Godship designs and manages AI-native e-commerce stores.",
  openGraph: {
    title: "Godship",
    description: "Godship designs and manages AI-native e-commerce stores.",
    images: [
      {
        url: "/godship.png",
        width: 1200,
        height: 630,
        alt: "Godship - AI-native e-commerce stores",
      },
    ],
    type: "website",
    siteName: "Godship",
  },
  twitter: {
    card: "summary_large_image",
    title: "Godship",
    description: "Godship designs and manages AI-native e-commerce stores.",
    images: ["/godship.png"],
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
