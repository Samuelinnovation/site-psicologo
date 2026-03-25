import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Brain, Heart, Video, ArrowRight } from "lucide-react"

const services = [
  {
    icon: User,
    title: "Terapia Individual",
    description: "Sessões personalizadas focadas nas suas necessidades específicas, promovendo autoconhecimento e desenvolvimento pessoal.",
  },
  {
    icon: Brain,
    title: "Ansiedade",
    description: "Tratamento especializado para controlar a ansiedade, aprendendo técnicas para lidar com preocupações e medos.",
  },
  {
    icon: Heart,
    title: "Depressão",
    description: "Acompanhamento terapêutico para superar a depressão, recuperando a alegria de viver e o equilíbrio emocional.",
  },
  {
    icon: Video,
    title: "Atendimento Online",
    description: "Sessões remotas com a mesma qualidade do atendimento presencial, no conforto da sua casa.",
  },
]

export function ServicesPreview() {
  return (
    <section className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Como posso ajudar você
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ofereço diferentes abordagens terapêuticas para atender às suas necessidades
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card 
              key={service.title} 
              className="group border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/servicos">
              Ver todos os serviços
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
