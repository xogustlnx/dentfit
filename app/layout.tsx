import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dentfit | Precision Toothbrush Lab",
  description:
    "손과 치아 데이터를 기반으로 가장 편안한 칫솔 스펙을 추천하는 플랫폼, Dentfit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-slate-900 antialiased`}
      >
        <div className="min-h-screen pb-20 pt-16 sm:pb-0">
          <Header />
          {children}
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
