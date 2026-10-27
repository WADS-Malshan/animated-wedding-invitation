import type { Metadata } from "next";
import { Poppins, Parisienne } from "next/font/google";
import "../assets/scss/main.scss";
import "./globals.css";

// Define the Poppins font
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

// Define the Parisienne font
const parisienne = Parisienne({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-parisienne",
  display: "swap",
});

// SEO & Meta Tags
export const metadata: Metadata = {
  title: 'Jayani & Kulinda | Wedding Invitation',
  description: 'We are getting married! Please join us to celebrate our special day on 16th November 2026.',
  openGraph: {
    title: 'Jayani & Kulinda | Wedding Invitation',
    description: 'We are getting married! Please join us to celebrate our special day on 16th November 2026.',
    url: 'https://jayani-kulinda.vercel.app', // Oyage aththa URL eka methanata danna
    siteName: 'Jayani & Kulinda Wedding',
    images: [
      {
        url: 'https://jayani-kulinda.vercel.app/img/wedding-preview.webp', // Link eka share karaddi pena image eka
        width: 1200,
        height: 630,
        alt: 'Jayani & Kulinda Wedding Invitation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://jayani-kulinda.vercel.app/img/wedding-preview.webp'], // Twitter ekedi pena image eka
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${parisienne.variable}`} suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
    </html>
  );
}