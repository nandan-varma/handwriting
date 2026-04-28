import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PDFProvider } from "@/components/providers/pdf-provider";
import { ControlsProvider } from "@/components/providers/controls-provider";
import { cn } from "@/lib/utils";

const interHeading = Inter({subsets:['latin'],variable:'--font-heading'});

const outfit = Outfit({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" className={cn("font-sans", outfit.variable, interHeading.variable)}>
      <Script defer data-domain="writing.nandanvarma.com" src="https://plausible.nandanvarma.com/js/script.js" />
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