import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const APP_URL = "https://daimo-store.vercel.app";

export const metadata: Metadata = {
  title: "Daimo Store",
  description: "Buy a cap with Digital Money",
  metadataBase: new URL(APP_URL),
  keywords: ["cap", "digital money", "daimo pay", "farcon", "farcaster"],
  authors: [{ name: "Daimo team" }],
  creator: "Daimo team",
  publisher: "Daimo team",
  
  // Open Graph
  openGraph: {
    type: "website",
    url: APP_URL,
    title: "Daimo Store",
    description: "Buy a cap with Digital Money",
    siteName: "Daimo Store",
    images: [
      {
        url: `${APP_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Daimo Store - Buy a cap with Digital Money"
      }
    ]
  },
  
  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Daimo Store",
    description: "Buy a cap with Digital Money",
    images: [`${APP_URL}/og.png`]
  },
  
  // Category
  category: "shopping"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${APP_URL}/og.png`} />
        <meta property="fc:frame:button:1" content="Get Your Cap @ Farcon" />
        <meta property="fc:frame:post_url" content={`${APP_URL}/api/frame`} />
        <meta property="fc:frame:embed" content="true" />
        <meta property="fc:frame:embed:url" content={APP_URL} />
        <meta property="fc:frame:embed:allowed_hosts" content="daimo-store.vercel.app" />
        <meta property="fc:frame:embed:aspect_ratio" content="1.91:1" />
        <meta property="og:image" content={`${APP_URL}/og.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:title" content="Daimo Store" />
        <meta property="og:description" content="Buy a cap with Digital Money" />
        <meta property="og:url" content={APP_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Daimo Store" />
        <meta name="application-name" content="Daimo Store" />
        <meta name="theme-color" content="#F1D78B" />
      </head>
      <body className={`antialiased overscroll-none ${poppins.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
