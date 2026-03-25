"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "./sidebar-nav";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the sheet when the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <List size={20} />
        </Button>
        <SheetContent side="left" className="w-60 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>
              <Link href="/" className="font-semibold text-lg">
                FlowX Design System
              </Link>
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="flex-1 py-4">
            <SidebarNav />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
