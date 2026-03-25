import Link from "next/link"
import { Brain, Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">Richard</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Cuidando da sua saúde mental com profissionalismo e acolhimento.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Navegação</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Início" },
                { href: "/sobre", label: "Sobre" },
                { href: "/servicos", label: "Serviços" },
                { href: "/feed", label: "Conteúdos" },
                { href: "/agendamento", label: "Agendamento" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Serviços</h3>
            <ul className="space-y-2">
              {[
                "Terapia Individual",
                "Ansiedade",
                "Depressão",
                "Atendimento Online",
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-muted-foreground">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>(24) 99855-4197</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>sourarichardsouza@gmail.com</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Volta Redonda, RJ</span>
              </li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a
                href="https://www.instagram.com/richardsaantos.r/"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Richard Psicologia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
