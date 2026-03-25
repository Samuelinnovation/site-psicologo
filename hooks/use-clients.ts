"use client"

import { useState, useEffect } from "react"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  notes: string
  createdAt: string
}

const CLIENTS_KEY = "richard_clients"

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(CLIENTS_KEY)
    if (stored) {
      setClients(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  const saveClients = (newClients: Client[]) => {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(newClients))
    setClients(newClients)
  }

  const addClient = (client: Omit<Client, "id" | "createdAt">) => {
    const newClient: Client = {
      ...client,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    saveClients([...clients, newClient])
    return newClient
  }

  const updateClient = (id: string, data: Partial<Client>) => {
    const updated = clients.map((c) => (c.id === id ? { ...c, ...data } : c))
    saveClients(updated)
  }

  const deleteClient = (id: string) => {
    saveClients(clients.filter((c) => c.id !== id))
  }

  const getClient = (id: string) => clients.find((c) => c.id === id)

  return { clients, isLoading, addClient, updateClient, deleteClient, getClient }
}
