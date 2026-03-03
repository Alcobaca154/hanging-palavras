import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HangingPalavras — Bilingual Hangman",
  description: "A bilingual English-Portuguese hangman game for ages 6–10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ background: "#FFFBEB" }}>
        {children}
      </body>
    </html>
  );
}
