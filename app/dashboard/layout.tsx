"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Brain, Calendar, FileText, Home, LogOut, Settings, Users, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const sidebarLinks = [
  { href: "/dashboard", label: "Visao Geral", icon: Home },
  { href: "/dashboard/agendamentos", label: "Agendamentos", icon: Calendar },
  { href: "/dashboard/clientes", label: "Clientes", icon: Users },
  { href: "/dashboard/posts", label: "Posts", icon: FileText },
  { href: "/dashboard/configuracoes", label: "Configuracoes", icon: Settings },
]

function LoginForm({ onLogin }: { onLogin: (password: string) => boolean }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = onLogin(password)
    if (!success) {
      setError("Senha incorreta")
      setPassword("")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Lock className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
          <CardDescription>
            Digite a senha para acessar o painel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
                className="text-center"
              />
              {error && (
                <p className="mt-2 text-center text-sm text-destructive">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Link
              href="/"
              className="block text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Voltar ao site
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading, login, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
              <Brain className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Dashboard</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            >
              <Home className="h-5 w-5" />
              Voltar ao site
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="fixed left-0 right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Dashboard</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Sair
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-border bg-background p-2 lg:hidden">
        {sidebarLinks.slice(0, 4).map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label.split(" ")[0]}
            </Link>
          )
        })}
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 pt-16 lg:ml-64 lg:pb-0 lg:pt-0">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
}
