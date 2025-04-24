import NextTopLoader from "nextjs-toploader";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
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
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <NextTopLoader color="#AD46FF" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
