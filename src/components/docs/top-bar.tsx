"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-6">
      <div className="flex items-center gap-2">
        <MobileNav />
        <Link href="/" className="text-lg font-semibold md:hidden">
          FlowX Design System
        </Link>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <a
          href="https://www.figma.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Figma"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
