import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PDFProvider } from "@/components/providers/pdf-provider";
import { ControlsProvider } from "@/components/providers/controls-provider";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <ControlsProvider>
          <PDFProvider>
            {children}
          </PDFProvider>
        </ControlsProvider>
      </body>
    </html>
  );
}