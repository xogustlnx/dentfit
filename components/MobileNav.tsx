"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./navigation";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur sm:hidden">
      <ul className="mx-auto flex max-w-6xl items-center justify-around px-4 py-3">
        {navItems.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={[
                  "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
                  isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" aria-hidden />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

