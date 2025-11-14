"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/85 backdrop-blur">
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-base font-semibold tracking-tight text-slate-900">
            Dentfit
          </span>
          <span className="hidden text-xs uppercase tracking-[0.14em] text-slate-400 sm:inline">
            Precision Toothbrush Lab
          </span>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-slate-500 sm:flex">
          {navItems.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "transition-colors hover:text-slate-900",
                  isActive ? "text-slate-900" : "",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100">
            로그인
          </button>
          <Link
            href="/measure"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            시작하기
          </Link>
        </div>
      </div>
    </header>
  );
}

