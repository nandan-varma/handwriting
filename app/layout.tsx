import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ControlsProvider } from "@/components/providers/controls-provider";
import { PDFProvider } from "@/components/providers/pdf-provider";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hand Written Text Generator",
  description: "Generates a PDF with handwritten text",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <Script
        defer
        data-domain="writing.nandanvarma.com"
        src="https://plausible.nandanvarma.com/js/script.js"
        strategy="lazyOnload"
      />
      <body className={inter.className}>
        <ControlsProvider>
          <PDFProvider>{children}</PDFProvider>
        </ControlsProvider>
      </body>
    </html>
  );
}
