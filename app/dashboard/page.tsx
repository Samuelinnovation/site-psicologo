"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useAppointments } from "@/hooks/use-appointments"
import { useClients } from "@/hooks/use-clients"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { appointments, getUpcomingAppointments } = useAppointments()
  const { clients } = useClients()

  const upcomingAppointments = getUpcomingAppointments().slice(0, 5)
  const pendingCount = appointments.filter((a) => a.status === "pending").length
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length
  const completedCount = appointments.filter((a) => a.status === "completed").length

  const stats = [
    {
      title: "Proximos",
      value: upcomingAppointments.length.toString(),
      description: "Agendamentos",
      icon: Calendar,
      href: "/dashboard/agendamentos",
    },
    {
      title: "Clientes",
      value: clients.length.toString(),
      description: "Cadastrados",
      icon: Users,
      href: "/dashboard/clientes",
    },
    {
      title: "Pendentes",
      value: pendingCount.toString(),
      description: "Aguardando",
      icon: Clock,
      href: "/dashboard/agendamentos",
    },
    {
      title: "Concluidos",
      value: completedCount.toString(),
      description: "Atendimentos",
      icon: CheckCircle2,
      href: "/dashboard/agendamentos",
    },
  ]

  const { isAuthenticated, isLoading } = useAuth()
const router = useRouter()

useEffect(() => {
  if (!isLoading && !isAuthenticated) {
    router.push("/login")
  }
}, [isAuthenticated, isLoading])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Ola, Richard!</h1>
        <p className="mt-1 text-muted-foreground">
          Aqui esta um resumo das suas atividades.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="border-border/50 transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Appointments */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Proximos Agendamentos</CardTitle>
          <CardDescription>Suas consultas para os proximos dias</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="py-8 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">Nenhum agendamento proximo</p>
              <Link
                href="/dashboard/agendamentos"
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                Criar agendamento
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between rounded-lg border border-border/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {appointment.clientName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{appointment.clientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(appointment.date)} as {appointment.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          appointment.type === "online"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {appointment.type === "online" ? "Online" : "Presencial"}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : appointment.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {appointment.status === "confirmed"
                          ? "Confirmado"
                          : appointment.status === "pending"
                          ? "Pendente"
                          : appointment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard/agendamentos"
                className="mt-4 block text-center text-sm font-medium text-primary hover:underline"
              >
                Ver todos os agendamentos
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
