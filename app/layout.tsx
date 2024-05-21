import type { Metadata } from "next";
import Link from "next/link";
import { Session, getServerSession } from "next-auth";
import "./globals.css";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const metadata: Metadata = {
  title: "Playground",
  description: "full stack web application project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <div className="navbar pd-20">
          <Link href="/">Home</Link>
          <Link href="/coin">Coin</Link>
          <Link href="/dice">Dice</Link>
          <Link href="/rps">RPS</Link>
          {/* {!session ? <SignIn /> : <SignOut />} */}
        </div>
        {children}
      </body>
    </html>
  );
}
