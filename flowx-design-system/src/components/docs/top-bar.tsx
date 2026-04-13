"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <MobileNav />
        <Link href="/" className="text-lg font-semibold md:hidden">
          FlowX Design System
        </Link>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
