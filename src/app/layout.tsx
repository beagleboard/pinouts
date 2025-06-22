import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeagleY-AI Pinout",
  description: "GPIO Pinout reference for BeagleY-AI",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}