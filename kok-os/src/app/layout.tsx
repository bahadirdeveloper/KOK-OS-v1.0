import type { Metadata } from "next";
import Script from "next/script";
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
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1065092005738873');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1065092005738873&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
      </body>
    </html>
  );
}
