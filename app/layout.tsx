import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Playground",
  description: "full stack web applilcation project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="navbar pd-20">
          <Link href="/">Home</Link>
          <Link href="/coin">Coin</Link>
          <Link href="/dice">Dice</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
