import { Montserrat, Prata } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: true,
});

const prata = Prata({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-prata",
  weight: ["400"],
  preload: true,
});

export const metadata = {
  title: "SecureCash | Convert CIT Provider",
  description:
    "SecureCash offers reliable currency conversion and CIT services with smooth transactions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* 🔗 Preconnect to improve first request speed */}
        <link rel="preconnect" href="https://securecash.vercel.app" crossOrigin="" />
        <link rel="dns-prefetch" href="https://securecash.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* ⚡ Preload global CSS to prevent render-blocking */}
        <link
          rel="preload"
          href="/_next/static/css/globals.css"
          as="style"
        />
        <noscript>
          <link rel="stylesheet" href="/_next/static/css/globals.css" />
        </noscript>

        {/* 🧠 SEO basics */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="robots" content="index, follow" />
      </head>

      <body className={`${montserrat.className} ${prata.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
