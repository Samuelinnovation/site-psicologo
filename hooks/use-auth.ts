"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setIsLoading(false)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return false
    return true
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }
}