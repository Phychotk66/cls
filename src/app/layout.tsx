import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casa del Rey Moro — Bien de Interés Cultural, Ronda",
  description:
    "Discover eight centuries of Moorish heritage above the El Tajo gorge. Visit the Nazarí water mine, hanging gardens and neo-Mudéjar palace in Ronda, Andalusia.",
  keywords: "Casa del Rey Moro, Ronda, heritage, Moorish, garden, mine, Andalusia, museum, tickets",
  openGraph: {
    title: "Casa del Rey Moro — Ronda, Andalusia",
    description:
      "Eight centuries of Moorish heritage above the El Tajo gorge. Book your visit to the palace, hanging gardens and Nazarí water mine.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
