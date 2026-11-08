import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Footer, Header } from "@/components/chrome";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `waydlp — ${site.tagline}`, template: "%s · waydlp" },
  description: site.description,
  applicationName: "waydlp",
  openGraph: {
    title: "waydlp",
    description: site.description,
    type: "website",
    siteName: "waydlp",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-fg">
        <Header />
        <main id="main" className="mx-auto max-w-6xl px-5">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
