/* src/app/layout.tsx */
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "STELLAR — Met Museum Explorer",
  description:
    "Explorá medio millón de obras de arte del Metropolitan Museum of Art. Proyecto educativo con Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans min-h-screen bg-background">{children}</body>
    </html>
  );
}