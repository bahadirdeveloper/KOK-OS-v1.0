import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { BootProvider } from "@/contexts/BootContext";
import BootSequence from "@/components/BootSequence";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KÖK-OS | Dijital İşletim Sistemi",
  description: "Bu bir web sitesi değil. Bu, işletmenizin dijital işletim sistemi. Markanızı dijitalde doğurur, büyütür ve otomatikleştirir.",
  keywords: ["dijital işletim sistemi", "web tasarım", "otomasyon", "AI", "marka stratejisi", "KÖK-OS"],
  authors: [{ name: "KÖK-OS" }],
  openGraph: {
    title: "KÖK-OS | Dijital İşletim Sistemi",
    description: "Bu bir web sitesi değil. Bu, işletmenizin dijital işletim sistemi.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "KÖK-OS | Dijital İşletim Sistemi",
    description: "Bu bir web sitesi değil. Bu, işletmenizin dijital işletim sistemi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <BootProvider>
            <BootSequence />
            {children}
          </BootProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
