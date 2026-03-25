"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Brain } from "lucide-react"

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/feed", label: "Conteúdos" },
  { href: "/agendamento", label: "Agendamento" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Richard</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button asChild>
            <Link href="/agendamento">Agendar Consulta</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <div className="flex flex-col space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full">
                <Link href="/agendamento" onClick={() => setIsOpen(false)}>
                  Agendar Consulta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
