import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

export const spaceGrotesk = Space_Grotesk({
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Scyra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
