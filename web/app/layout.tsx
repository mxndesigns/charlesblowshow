import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.charlesblowshow.com";
const TITLE = "The Charles Blow Show";
const DESCRIPTION =
  "The smartest seat at the table on race, politics, and power in America — in conversation. A daily show: Lunch Break Live and The Evening Show.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${TITLE} — Race, Politics & Power, in Conversation`,
    template: `%s · ${TITLE}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Charles Blow",
    "politics",
    "race",
    "interview show",
    "political commentary",
    "Lunch Break Live",
    "The Evening Show",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream font-sans">
        {children}
      </body>
    </html>
  );
}
