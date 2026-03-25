"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2, User, Phone, Mail, FileText } from "lucide-react"
import { useClients, Client } from "@/hooks/use-clients"

export default function ClientesPage() {
  const { clients, isLoading, addClient, updateClient, deleteClient } = useClients()
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm)
  )

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", notes: "" })
    setEditingClient(null)
  }

  const handleAdd = () => {
    if (!formData.name.trim()) return
    addClient(formData)
    resetForm()
    setIsAddOpen(false)
  }

  const handleEdit = () => {
    if (!editingClient || !formData.name.trim()) return
    updateClient(editingClient.id, formData)
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cliente?")) {
      deleteClient(id)
    }
  }

  const openEditDialog = (client: Client) => {
    setEditingClient(client)
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      notes: client.notes,
    })
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
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Clientes</h1>
          <p className="mt-1 text-muted-foreground">Gerencie seus pacientes cadastrados.</p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsAddOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Cliente</DialogTitle>
              <DialogDescription>Preencha os dados do novo paciente.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nome *</label>
                <Input
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Telefone</label>
                <Input
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Observacoes</label>
                <Textarea
                  placeholder="Anotacoes sobre o paciente..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAdd}>Adicionar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="mb-6 border-border/50">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>{filteredClients.length} cliente(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="py-12 text-center">
              <User className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                {searchTerm ? "Nenhum cliente encontrado" : "Nenhum cliente cadastrado ainda"}
              </p>
              {!searchTerm && (
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => { resetForm(); setIsAddOpen(true); }}
                >
                  Adicionar primeiro cliente
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="flex flex-col gap-4 rounded-lg border border-border/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground">{client.name}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        {client.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" />
                            {client.email}
                          </span>
                        )}
                        {client.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3.5 w-3.5" />
                            {client.phone}
                          </span>
                        )}
                      </div>
                      {client.notes && (
                        <p className="mt-2 flex items-start gap-1 text-sm text-muted-foreground">
                          <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          <span className="line-clamp-2">{client.notes}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Dialog
                      open={editingClient?.id === client.id}
                      onOpenChange={(open) => !open && resetForm()}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(client)}>
                          <Edit className="mr-1.5 h-3.5 w-3.5" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Editar Cliente</DialogTitle>
                          <DialogDescription>Atualize os dados do paciente.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div>
                            <label className="text-sm font-medium text-foreground">Nome *</label>
                            <Input
                              placeholder="Nome completo"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <Input
                              type="email"
                              placeholder="email@exemplo.com"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Telefone</label>
                            <Input
                              placeholder="(00) 00000-0000"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-foreground">Observacoes</label>
                            <Textarea
                              placeholder="Anotacoes sobre o paciente..."
                              value={formData.notes}
                              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                              rows={3}
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
                      onClick={() => handleDelete(client.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
