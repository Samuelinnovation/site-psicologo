"use client"

import { useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    const success = await login(email, password)

    if (success) {
      router.push("/dashboard")
    } else {
      alert("Email ou senha inválidos")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <Input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  )
}