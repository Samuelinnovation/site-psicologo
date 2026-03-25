"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Save, User, Bell, Shield } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ConfiguracoesPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: "Richard",
    crp: "05/72067",
    email: "sourarichardsouza@gmail.com",
    phone: "(24) 99855-4197",
    bio: "Psicólogo clínico com anos de experiência, especializado em Terapia Cognitivo-Comportamental.",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    newAppointments: true,
    reminders: true,
  })

  const handleSave = async () => {
  setIsSaving(true)

  const { error } = await supabase
    .from("settings")
    .upsert({
  id: 1,
        name: profile.name,
        crp: profile.crp,
        email: profile.email,
        phone: profile.phone,
        bio: profile.bio,
      }
    )

  setIsSaving(false)

  if (error) {
    alert("Erro ao salvar")
    console.log(error)
  } else {
    alert("Salvo com sucesso")
  }
}

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Configurações</h1>
        <p className="mt-1 text-muted-foreground">
          Gerencie suas preferências e informações.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil
            </CardTitle>
            <CardDescription>
              Informações exibidas no site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crp">CRP</Label>
                <Input
                  id="crp"
                  value={profile.crp}
                  onChange={(e) => setProfile({ ...profile, crp: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>
              Configure como deseja receber avisos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notificações por Email</p>
                <p className="text-sm text-muted-foreground">Receber avisos no seu email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Notificações por SMS</p>
                <p className="text-sm text-muted-foreground">Receber avisos por mensagem de texto</p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Novos Agendamentos</p>
                <p className="text-sm text-muted-foreground">Ser notificado quando houver novos agendamentos</p>
              </div>
              <Switch
                checked={notifications.newAppointments}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newAppointments: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Lembretes</p>
                <p className="text-sm text-muted-foreground">Receber lembretes de consultas</p>
              </div>
              <Switch
                checked={notifications.reminders}
                onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
            <CardDescription>
              Configurações de acesso e senha
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha Atual</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button variant="outline">
              Alterar Senha
            </Button>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            {isSaving ? (
              "Salvando..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
