import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODOリストアプリ",
  description: "Next.jsとIaCとCI/CDの学習用TODOリストアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
