// ============================================================
// src/app/layout.tsx
// ============================================================
// The ROOT LAYOUT in Next.js App Router.
//
// This file wraps EVERY page in the application.
// It runs on the SERVER (no "use client" directive).
//
// Responsibilities:
//   1. Set the <html> and <body> attributes
//   2. Import global CSS
//   3. Define SEO metadata (title, description, og: tags)
//   4. Render children (the actual page content)
//
// Why is metadata defined here?
//   Next.js 14's Metadata API exports a `metadata` object.
//   Next.js reads this at build time and auto-generates the
//   <title> and <meta> tags — no manual <Head> components needed.
// ============================================================

import type { Metadata } from "next";
import "@/styles/globals.css";

// ---- SEO Metadata ----
// This is automatically inserted as <meta> tags by Next.js
export const metadata: Metadata = {
  title: "Best Boarding School in Dehradun | Tulas International School (TIS)",
  description:
    "Discover one of the best CBSE boarding schools in Dehradun, offering co-ed and day boarding education from Class 4 to 12 with modern learning, sports, and holistic development.",
  keywords: [
    "boarding school in dehradun india",
    "cbse co-ed boarding school in dehradun",
    "tulas international school",
    "best boarding school uttarakhand",
  ],
  // Open Graph tags — control how the page appears when shared on social media
  openGraph: {
    title: "Tulas International School | Best Boarding School in Dehradun",
    description:
      "CBSE-affiliated co-ed boarding school in Dehradun, Uttarakhand for boys and girls from Class 4 to 12.",
    url: "https://tis.edu.in",
    siteName: "Tulas International School",
    images: [
      {
        url: "https://tis.edu.in/images/tis-campus-og.jpg",
        width: 1200,
        height: 630,
        alt: "Tulas International School campus in Dehradun",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  // Twitter/X card metadata
  twitter: {
    card: "summary_large_image",
    title: "Tulas International School | Best Boarding School in Dehradun",
    description:
      "CBSE-affiliated co-ed boarding school for boys and girls from Class 4 to 12.",
    images: ["https://tis.edu.in/images/tis-campus-og.jpg"],
  },
  // Tells search engines to index this page
  robots: "index, follow",
};

// ---- Root Layout Component ----
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // lang="en" is important for accessibility (screen readers)
    // suppressHydrationWarning: required because our theme script
    // modifies the <html> class before React hydrates — without this,
    // React would warn about a class mismatch between server and client
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts — loaded via <link> (not CSS @import) to avoid PostCSS
            ordering restrictions. preconnect speeds up the font fetch. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {/* 
          children = the current page's content (src/app/page.tsx)
          Every page is rendered inside this layout.
        */}
        {children}
      </body>
    </html>
  );
}
