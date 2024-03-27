import { TailwindIndicator } from "@/components/TailwindIndicator";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background antialiased flex flex-col min-h-screen relative",
          inter.className
        )}
      >
        <Providers>
          <Header />
          <main className="flex-1 pb-10 pt-16">{children}</main>
          <Footer />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
