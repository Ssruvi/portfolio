import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Ssruvi Rupani | SDE intern, full-stack web",
  description:
    "Ssruvi Rupani is an SDE intern at ZootechX building full-stack web products. Experience, live projects, résumé and contact.",
  openGraph: {
    title: "Ssruvi Rupani",
    description: "SDE intern at ZootechX. Full-stack web. Live projects and résumé.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

// Runs before first paint: enables the JS-only motion styles, and guarantees the
// page is revealed even if the loader script never runs.
const boot = `(function(d){d.classList.add('js');setTimeout(function(){d.classList.add('loaded')},2600)})(document.documentElement)`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
