import type { Metadata } from "next";
import { Poppins, Anton, Parisienne } from "next/font/google";
import "../assets/scss/main.scss";
import "./globals.css";

// Define the Poppins font
const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

// Define the Anton font
const parisienne = Parisienne({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-parisienne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "J & K",
  description: "Wedding Invitation",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${parisienne.variable}`} suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
