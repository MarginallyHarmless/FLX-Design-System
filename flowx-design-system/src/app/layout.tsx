import type { Metadata } from "next";
import { Open_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarNav } from "@/components/docs/sidebar-nav";
import { TopBar } from "@/components/docs/top-bar";
import { Breadcrumbs } from "@/components/docs/breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-flowx",
});

const docsFont = Open_Sans({
  subsets: ["latin"],
  variable: "--font-docs",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marginallyharmless.github.io/FLX-Design-System"),
  title: "FlowX Design System",
  description: "Design system documentation for FlowX",
  openGraph: {
    title: "FlowX Design System",
    description: "Design system documentation for FlowX",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowX Design System",
    description: "Design system documentation for FlowX",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${openSans.variable} ${docsFont.variable} ${jetbrains.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="flex min-h-screen">
              {/* Sidebar - hidden on mobile, shown on md+ */}
              <aside className="hidden md:flex w-60 flex-col border-r bg-background fixed inset-y-0 left-0 z-30">
                <div className="flex h-14 shrink-0 items-center gap-2.5 px-4 py-3 border-b">
                  <Image src={`${basePath}/flowx-logo-light.png`} alt="FlowX" width={18} height={18} className="dark:hidden" />
                  <Image src={`${basePath}/flowx-logo-dark.png`} alt="FlowX" width={18} height={18} className="hidden dark:block" />
                  <Link href="/" className="font-semibold text-lg">
                    Design System
                  </Link>
                </div>
                <ScrollArea className="flex-1 overflow-hidden py-4">
                  <SidebarNav />
                </ScrollArea>
              </aside>

              {/* Main area */}
              <div className="flex-1 flex flex-col md:pl-60" style={{ backgroundColor: "#F9FAFB" }}>
                <TopBar />
                <main className="flex-1 px-6 py-8 mx-auto w-full max-w-[900px]">
                  <Breadcrumbs />
                  {children}
                </main>
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
