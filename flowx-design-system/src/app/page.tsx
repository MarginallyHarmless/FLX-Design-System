"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight } from "@phosphor-icons/react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const quickLinks = [
  {
    title: "Foundations",
    description:
      "Explore the design tokens that make up the visual language: colors, typography, spacing, and more.",
    href: "/foundations/colors",
    image: `${basePath}/card-foundations.png`,
  },
  {
    title: "Components",
    description:
      "Design references for each component — interactive previews, usage guidelines, and visual specs.",
    href: "/components/button",
    image: `${basePath}/card-components.png`,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="flex items-center gap-4 text-5xl font-bold tracking-tight">
          <Image src={`${basePath}/flowx-logo-light.png`} alt="FlowX" width={40} height={40} className="dark:hidden" />
          <Image src={`${basePath}/flowx-logo-dark.png`} alt="FlowX" width={40} height={40} className="hidden dark:block" />
          Design System
        </h1>
        <p className="text-lg text-muted-foreground">
          A unified design language and component library for building
          consistent, accessible, and beautiful FlowX interfaces. Start with the
          foundations or dive straight into components.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="group">
            <Card className="card-hover h-full overflow-hidden transition-colors">
              <div className="flex justify-center px-6 pt-3">
                <Image src={link.image} alt={link.title} width={180} height={180} className="-mb-4 object-contain" />
              </div>
              <CardHeader className="pt-0 pb-10 text-center">
                <CardTitle className="font-bold">
                  {link.title}
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
