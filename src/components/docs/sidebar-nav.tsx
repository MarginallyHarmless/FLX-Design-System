"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { componentRegistry } from "@/lib/components-data/registry";
import { cn } from "@/lib/utils";

interface NavSection {
  title: string;
  items: { label: string; href: string }[];
}

const foundationsItems = [
  { label: "Colors", href: "/foundations/colors" },
  { label: "Typography", href: "/foundations/typography" },
  { label: "Spacing", href: "/foundations/spacing" },
  { label: "Elevation", href: "/foundations/elevation" },
  { label: "Iconography", href: "/foundations/iconography" },
  { label: "Grid", href: "/foundations/grid" },
];

const patternsItems = [{ label: "Patterns", href: "/patterns" }];

const resourcesItems = [
  { label: "Figma", href: "/resources/figma" },
  { label: "Changelog", href: "/resources/changelog" },
];

function buildSections(): NavSection[] {
  const componentItems = componentRegistry.map((c) => ({
    label: c.name,
    href: `/components/${c.slug}`,
  }));

  return [
    { title: "Foundations", items: foundationsItems },
    { title: "Components", items: componentItems },
    { title: "Patterns", items: patternsItems },
    { title: "Resources", items: resourcesItems },
  ];
}

export function SidebarNav() {
  const pathname = usePathname();
  const sections = buildSections();

  return (
    <nav className="flex flex-col gap-6 px-4">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h4>
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
