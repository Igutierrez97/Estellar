/* src/components/layout/navbar.tsx */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Sparkles,
  Menu,
  Search,
} from "lucide-react";

const links = [
  { href: "/", label: "Explorar" },
  { href: "/departments", label: "Departamentos" },
  { href: "/favorites", label: "Favoritos" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 h-[72px] flex items-center transition-all duration-300",
        "bg-background/80 backdrop-blur-xl",
        scrolled
          ? "border-b border-gold/15"
          : "border-b border-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto w-full px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-background">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-display text-xl font-bold tracking-wide">
            STELLAR
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-gold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search + Mobile */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden lg:flex items-center gap-2 text-muted-foreground border-border hover:border-gold/30 hover:text-gold"
            onClick={() => {
              document.getElementById("search-section")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Buscar obras...</span>
            <kbd className="ml-2 font-mono text-[10px] px-1.5 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
              ⌘K
            </kbd>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card border-border">
              <SheetTitle className="font-display text-lg mb-6">
                Navegación
              </SheetTitle>
              <nav className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-gold/10 text-gold"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}