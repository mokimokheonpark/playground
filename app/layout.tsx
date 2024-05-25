import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SignIn } from "./components/SignIn";

export const metadata: Metadata = {
  title: "Playground",
  description: "full stack web application project",
};

export default async function RootLayout({
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
          <Link href="/rps">RPS</Link>
          <SignIn />
        </div>
        {children}
      </body>
    </html>
  );
}
