import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daimo Store",
  description: "See https://paydocs.daimo.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${poppins.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
