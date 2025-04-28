import NextTopLoader from "nextjs-toploader";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";
import "ldrs/react/Squircle.css";

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
        <Toaster
          position="bottom-right"
          richColors
          visibleToasts={5}
          closeButton
        />
      </body>
    </html>
  );
}
