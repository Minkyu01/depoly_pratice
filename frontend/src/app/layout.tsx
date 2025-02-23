import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";

import { Chewy } from "next/font/google";
import Link from "next/link";

const chewy = Chewy({
  weight: "400",
  subsets: ["latin"],
});

export const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansKR.className} ${geistSans.variable} ${geistMono.variable} antialiased flex-col justify-center items-center `}
        // style={{ backgroundColor: "var(--background)" }}
      >
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                {/* <a onClick={}>Voca</a> */}
                {/* <Link href="/random">Voca</Link> */}
                <Link href="/manage">Manage</Link>
              </li>
              <li>
                <Link href="/study">Study</Link>
              </li>
              <li>
                <Link href="/add">Add</Link>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
