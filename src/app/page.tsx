"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight } from "@phosphor-icons/react";

const quickLinks = [
  {
    title: "Foundations",
    description:
      "Explore the design tokens that make up the visual language: colors, typography, spacing, and more.",
    href: "/foundations/colors",
  },
  {
    title: "Components",
    description:
      "Browse the component library with live examples, usage guidelines, and API references.",
    href: "/components/button",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">
          FlowX Design System
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A unified design language and component library for building
          consistent, accessible, and beautiful FlowX interfaces. Start with the
          foundations or dive straight into components.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="group">
            <Card className="h-full transition-colors hover:border-foreground/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {link.title}
                  <ArrowRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
