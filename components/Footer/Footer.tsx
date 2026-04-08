import Link from "next/link";
import { Database } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  explore: [
    { href: "/", label: "Obras destacadas" },
    { href: "/departments", label: "Departamentos" },
    { href: "/random", label: "Obra aleatoria" },
  ],
  learn: [
    { href: "#", label: "Sobre Next.js" },
    { href: "#", label: "Server Components" },
    { href: "#", label: "Streaming & Suspense" },
  ],
  resources: [
    { href: "https://metmuseum.org/art/collection", label: "Met Collection", external: true },
    { href: "https://github.com/metmuseum/openaccess", label: "API Docs", external: true },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-xl font-bold">
              STELLAR
            </Link>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-[260px]">
              Explorador de la colección del Metropolitan Museum of Art.
              Proyecto educativo construido con Next.js App Router y shadcn/ui.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Explorar
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Aprendizaje
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.learn.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Recursos
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© 2025 STELLAR. Proyecto educativo.</span>
          <div className="flex items-center gap-1.5">
            <Database className="w-3 h-3 text-gold" />
            <span>Datos:</span>
            <Link
              href="https://metmuseum.org/art/collection/open-access"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              Met Museum Open Access API
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}