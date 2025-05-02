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
      <body className={`antialiased overscroll-none ${poppins.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
