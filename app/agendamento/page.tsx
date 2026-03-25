"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, CheckCircle2, Clock, MapPin, Phone, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { supabase } from "@/lib/supabase"

const timeSlots = [
  "08:00", "09:00", "10:00", "11:00",
  "14:00", "15:00", "16:00", "17:00", "18:00"
]

const appointmentTypes = [
  { value: "presencial", label: "Presencial", icon: MapPin },
  { value: "online", label: "Online", icon: Video },
]

export default function AgendamentoPage() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [appointmentType, setAppointmentType] = useState<string>()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])

  const fetchBookedTimes = async (selectedDate: Date) => {
  const formattedDate = selectedDate.toISOString().split("T")[0]

  const { data, error } = await supabase
    .from("appointments")
    .select("time")
    .eq("date", formattedDate)

  if (error) {
    console.log("Erro ao buscar horários:", error)
  } else {
    const times = data.map((item: any) => item.time)
    setBookedTimes(times)
  }
}

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    } else if (!/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Formato: (11) 99999-9999"
    }

    if (!date) {
      newErrors.date = "Selecione uma data"
    }

    if (!time) {
      newErrors.time = "Selecione um horário"
    }

    if (!appointmentType) {
      newErrors.appointmentType = "Selecione o tipo de atendimento"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setFormData({ ...formData, phone: formatted })
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  console.log("CLICOU NO BOTÃO")

  if (!validateForm()) {
    console.log("VALIDAÇÃO FALHOU")
    return
  }

  console.log("VALIDAÇÃO OK")

  setIsLoading(true)

  const { data, error } = await supabase.from("appointments").insert([
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: date?.toISOString().split("T")[0],
      time: time,
    }
  ])

  console.log("RESULTADO:", data)
  console.log("ERRO:", error)

  setIsLoading(false)

  if (error) {
    alert("Erro ao salvar")
  } else {
    setIsSubmitted(true)
  }
}

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center bg-secondary/30 px-4 py-20">
          <Card className="mx-auto max-w-md text-center">
            <CardContent className="pt-6">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Agendamento Confirmado!</h2>
              <p className="mt-4 text-muted-foreground">
                Sua consulta foi agendada com sucesso. Você receberá um email de confirmação em breve.
              </p>
              <div className="mt-6 rounded-lg bg-secondary/50 p-4 text-left">
                <div className="space-y-2 text-sm">
                  <p><strong>Data:</strong> {date && format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
                  <p><strong>Horário:</strong> {time}</p>
                  <p><strong>Tipo:</strong> {appointmentType === "presencial" ? "Presencial" : "Online"}</p>
                </div>
              </div>
              <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                Agendar nova consulta
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Agende sua Consulta
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Escolha o melhor dia e horário para iniciar sua jornada de autoconhecimento. 
                O primeiro passo já é uma grande conquista.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Dados para Agendamento</CardTitle>
                <CardDescription>
                  Preencha os campos abaixo para agendar sua consulta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={cn(errors.name && "border-destructive")}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={cn(errors.email && "border-destructive")}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className={cn(errors.phone && "border-destructive")}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Appointment Type */}
                  <div className="space-y-2">
                    <Label>Tipo de Atendimento</Label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {appointmentTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setAppointmentType(type.value)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all",
                            appointmentType === type.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          )}
                        >
                          <div className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-lg",
                            appointmentType === type.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          )}>
                            <type.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{type.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {type.value === "presencial" ? "No consultório" : "Por videochamada"}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                    {errors.appointmentType && (
                      <p className="text-sm text-destructive">{errors.appointmentType}</p>
                    )}
                  </div>

                  {/* Date and Time */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Data</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                              errors.date && "border-destructive"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "dd/MM/yyyy") : "Selecione uma data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
  mode="single"
  selected={date}
  onSelect={(selectedDate) => {
    setDate(selectedDate)
    if (selectedDate) fetchBookedTimes(selectedDate)
  }}
  disabled={(date) => 
    date < new Date() || 
    date.getDay() === 0 || 
    date.getDay() === 6
  }
  initialFocus
/>
                        </PopoverContent>
                      </Popover>
                      {errors.date && (
                        <p className="text-sm text-destructive">{errors.date}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Horário</Label>
                      <Select onValueChange={setTime}>
                        <SelectTrigger className={cn(errors.time && "border-destructive")}>
                          <SelectValue placeholder="Selecione um horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => {
  const isBooked = bookedTimes.includes(slot)

  return (
    <SelectItem key={slot} value={slot} disabled={isBooked}>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        {slot} {isBooked && "(Indisponível)"}
      </div>
    </SelectItem>
  )
})}
                        </SelectContent>
                      </Select>
                      {errors.time && (
                        <p className="text-sm text-destructive">{errors.time}</p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Agendando..." : "Confirmar Agendamento"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="mt-8 rounded-lg border border-border/50 bg-card p-6">
              <h3 className="font-semibold text-foreground">Dúvidas?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Entre em contato diretamente pelo WhatsApp:
              </p>
              <a 
                href="tel:+5524998554197" 
                className="mt-3 inline-flex items-center gap-2 text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                (24) 99855-4197
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
