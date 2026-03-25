

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Calendar,
  Edit,
  Trash2,
} from "lucide-react"
import { useAppointments, Appointment } from "@/hooks/use-appointments"
import { useClients } from "@/hooks/use-clients"

const statusConfig = {
  confirmed: { label: "Confirmado", icon: CheckCircle2, className: "bg-green-100 text-green-700" },
  pending: { label: "Pendente", icon: Clock, className: "bg-yellow-100 text-yellow-700" },
  cancelled: { label: "Cancelado", icon: XCircle, className: "bg-red-100 text-red-700" },
  completed: { label: "Concluido", icon: CheckCircle2, className: "bg-blue-100 text-blue-700" },
}

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
]

export default function AgendamentosPage() {
  const { appointments, isLoading, addAppointment, updateAppointment, deleteAppointment } = useAppointments()
  const { clients } = useClients()

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)

  const [formData, setFormData] = useState({
    clientId: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: "",
    time: "",
    type: "presencial" as "online" | "presencial",
    status: "pending" as Appointment["status"],
    notes: "",
  })

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesSearch =
        appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterStatus === "all" || appointment.status === filterStatus
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateB.getTime() - dateA.getTime()
    })

  const resetForm = () => {
    setFormData({
      clientId: "",
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      date: "",
      time: "",
      type: "presencial",
      status: "pending",
      notes: "",
    })
    setEditingAppointment(null)
  }

  const handleClientSelect = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId)
    if (client) {
      setFormData({
        ...formData,
        clientId: client.id,
        clientName: client.name,
        clientEmail: client.email,
        clientPhone: client.phone,
      })
    }
  }

  const handleAdd = () => {
    if (!formData.clientName.trim() || !formData.date || !formData.time) return
    addAppointment(formData)
    resetForm()
    setIsAddOpen(false)
  }

  const handleEdit = () => {
    if (!editingAppointment || !formData.clientName.trim()) return
    updateAppointment(editingAppointment.id, formData)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      deleteAppointment(id)
    }
  }

  const handleStatusChange = (id: string, newStatus: Appointment["status"]) => {
    updateAppointment(id, { status: newStatus })
  }

  const openEditDialog = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setFormData({
      clientId: appointment.clientId,
      clientName: appointment.clientName,
      clientEmail: appointment.clientEmail,
      clientPhone: appointment.clientPhone,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      status: appointment.status,
      notes: appointment.notes,
    })
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Agendamentos</h1>
          <p className="mt-1 text-muted-foreground">Gerencie todas as consultas agendadas.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsAddOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
              <DialogDescription>Agende uma nova consulta.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              {clients.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-foreground">Cliente Existente</label>
                  <Select value={formData.clientId} onValueChange={handleClientSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um cliente ou preencha manualmente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Nome *</label>
                  <Input
                    placeholder="Nome do paciente"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Telefone</label>
                  <Input
                    placeholder="(00) 00000-0000"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Data *</label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Horario *</label>
                  <Select value={formData.time} onValueChange={(v) => setFormData({ ...formData, time: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Tipo</label>
                  <Select
                    value={formData.type}
                    onValueChange={(v) => setFormData({ ...formData, type: v as "online" | "presencial" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="presencial">Presencial</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Status</label>
                  <Select
                    value={formData.status}
                    onValueChange={(v) => setFormData({ ...formData, status: v as Appointment["status"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="confirmed">Confirmado</SelectItem>
                      <SelectItem value="completed">Concluido</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Observacoes</label>
                <Textarea
                  placeholder="Anotacoes sobre a consulta..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAdd}>Agendar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="mb-6 border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendentes</SelectItem>
                  <SelectItem value="confirmed">Confirmados</SelectItem>
                  <SelectItem value="completed">Concluidos</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
          <CardDescription>{filteredAppointments.length} agendamento(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length === 0 ? (
            <div className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                {searchTerm || filterStatus !== "all"
                  ? "Nenhum agendamento encontrado"
                  : "Nenhum agendamento cadastrado ainda"}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => { resetForm(); setIsAddOpen(true); }}
                >
                  Criar primeiro agendamento
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => {
                const status = statusConfig[appointment.status]
                return (
                  <div
                    key={appointment.id}
                    className="flex flex-col gap-4 rounded-lg border border-border/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                        {appointment.clientName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-foreground">{appointment.clientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(appointment.date)} as {appointment.time}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              appointment.type === "online"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {appointment.type === "online" ? "Online" : "Presencial"}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                          >
                            <status.icon className="h-3 w-3" />
                            {status.label}
                          </span>
                        </div>
                        {appointment.notes && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-1">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      <Select
                        value={appointment.status}
                        onValueChange={(v) => handleStatusChange(appointment.id, v as Appointment["status"])}
                      >
                        <SelectTrigger className="h-8 w-[130px] text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="confirmed">Confirmado</SelectItem>
                          <SelectItem value="completed">Concluido</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                      <Dialog
                        open={editingAppointment?.id === appointment.id}
                        onOpenChange={(open) => !open && resetForm()}
                      >
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(appointment)}>
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Editar Agendamento</DialogTitle>
                            <DialogDescription>Atualize os dados da consulta.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 pt-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className="text-sm font-medium text-foreground">Nome *</label>
                                <Input
                                  placeholder="Nome do paciente"
                                  value={formData.clientName}
                                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground">Telefone</label>
                                <Input
                                  placeholder="(00) 00000-0000"
                                  value={formData.clientPhone}
                                  onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">Email</label>
                              <Input
                                type="email"
                                placeholder="email@exemplo.com"
                                value={formData.clientEmail}
                                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                              />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className="text-sm font-medium text-foreground">Data *</label>
                                <Input
                                  type="date"
                                  value={formData.date}
                                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground">Horario *</label>
                                <Select
                                  value={formData.time}
                                  onValueChange={(v) => setFormData({ ...formData, time: v })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((time) => (
                                      <SelectItem key={time} value={time}>
                                        {time}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                              <div>
                                <label className="text-sm font-medium text-foreground">Tipo</label>
                                <Select
                                  value={formData.type}
                                  onValueChange={(v) =>
                                    setFormData({ ...formData, type: v as "online" | "presencial" })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="presencial">Presencial</SelectItem>
                                    <SelectItem value="online">Online</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-foreground">Status</label>
                                <Select
                                  value={formData.status}
                                  onValueChange={(v) =>
                                    setFormData({ ...formData, status: v as Appointment["status"] })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="confirmed">Confirmado</SelectItem>
                                    <SelectItem value="completed">Concluido</SelectItem>
                                    <SelectItem value="cancelled">Cancelado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">Observacoes</label>
                              <Textarea
                                placeholder="Anotacoes sobre a consulta..."
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                rows={2}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={resetForm}>
                                Cancelar
                              </Button>
                              <Button onClick={handleEdit}>Salvar</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
