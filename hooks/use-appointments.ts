"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export interface Appointment {
  id: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  type: "online" | "presencial"
  status: "pending" | "confirmed" | "cancelled" | "completed"
  notes: string
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // 🔥 BUSCAR DO SUPABASE
  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("date", { ascending: false })

    if (error) {
      console.log("Erro ao buscar:", error)
    } else {
      const formatted = (data || []).map((item: any, index: number) => ({
        id: item.id || index.toString(),
        clientName: item.name,
        clientEmail: item.email,
        clientPhone: item.phone,
        date: item.date,
        time: item.time,
        type: "presencial",
        status: ["pending", "confirmed", "cancelled", "completed"].includes(item.status)
  ? item.status
  : "pending",
        notes: "",
      }))

      setAppointments(formatted)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // 🔥 ADICIONAR
  const addAppointment = async (appointment: any) => {
    const { error } = await supabase.from("appointments").insert([
      {
        name: appointment.clientName,
        email: appointment.clientEmail,
        phone: appointment.clientPhone,
        date: appointment.date,
        time: appointment.time,
      }
    ])

    if (error) {
      console.log("Erro ao adicionar:", error)
      alert("Erro ao salvar")
    } else {
      fetchAppointments()
    }
  }

  // 🔥 ATUALIZAR
 const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
  const { data, error } = await supabase
    .from("appointments")
    .update(updates)
    .eq("id", id)
    .select() // 👈 IMPORTANTE

  if (error) {
    console.log(error)
    return
  }

  // 🔥 ATUALIZA O ESTADO LOCAL (AQUI ESTÁ O SEGREDO)
  setAppointments((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    )
  )
}
  // 🔥 DELETAR
  const deleteAppointment = async (id: string) => {
    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id)

    if (error) {
      console.log("Erro ao deletar:", error)
    } else {
      fetchAppointments()
    }
  }

  // 🔥 FUNÇÃO QUE ESTAVA FALTANDO (ARRUMA O ERRO DO DASHBOARD)
  const getUpcomingAppointments = () => {
    const now = new Date()

    return appointments
      .filter((a) => {
        const date = new Date(`${a.date}T${a.time}`)
        return date >= now && a.status !== "cancelled"
      })
      .sort((a, b) => {
        const dateA = new Date(`${a.date}T${a.time}`)
        const dateB = new Date(`${b.date}T${b.time}`)
        return dateA.getTime() - dateB.getTime()
      })
  }

  return {
    appointments,
    isLoading,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getUpcomingAppointments, // ✅ ESSENCIAL
  }
}