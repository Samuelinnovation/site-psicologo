import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { User, Brain, Heart, Video, ArrowRight, Check } from "lucide-react"

const services = [
  {
    icon: User,
    title: "Terapia Individual",
    description: "Sessões personalizadas focadas nas suas necessidades específicas, promovendo autoconhecimento e desenvolvimento pessoal.",
    benefits: [
      "Atendimento personalizado",
      "Sessões de 50 minutos",
      "Sigilo profissional garantido",
      "Acompanhamento contínuo",
    ],
    details: "A terapia individual é um espaço seguro para você explorar seus pensamentos, emoções e comportamentos. Juntos, trabalharemos para identificar padrões que possam estar te impedindo de viver plenamente e desenvolveremos estratégias práticas para superar desafios.",
  },
  {
    icon: Brain,
    title: "Tratamento de Ansiedade",
    description: "Tratamento especializado para controlar a ansiedade, aprendendo técnicas eficazes para lidar com preocupações e medos.",
    benefits: [
      "Técnicas de respiração e relaxamento",
      "Reestruturação cognitiva",
      "Exposição gradual",
      "Prevenção de recaídas",
    ],
    details: "A ansiedade é uma resposta natural do corpo, mas quando se torna excessiva, pode prejudicar sua qualidade de vida. Utilizando a Terapia Cognitivo-Comportamental, ajudo você a entender os gatilhos da ansiedade e desenvolver habilidades para gerenciá-la.",
  },
  {
    icon: Heart,
    title: "Tratamento de Depressão",
    description: "Acompanhamento terapêutico para superar a depressão, recuperando a alegria de viver e o equilíbrio emocional.",
    benefits: [
      "Identificação de pensamentos negativos",
      "Ativação comportamental",
      "Fortalecimento da autoestima",
      "Construção de rede de apoio",
    ],
    details: "A depressão vai além da tristeza comum - é uma condição que afeta como você pensa, sente e age. No tratamento, trabalhamos juntos para identificar os fatores que contribuem para a depressão e desenvolver estratégias para retomar o prazer nas atividades do dia a dia.",
  },
  {
    icon: Video,
    title: "Atendimento Online",
    description: "Sessões remotas com a mesma qualidade do atendimento presencial, no conforto e privacidade da sua casa.",
    benefits: [
      "Flexibilidade de horários",
      "Sem necessidade de deslocamento",
      "Plataforma segura e privada",
      "Ideal para rotinas agitadas",
    ],
    details: "O atendimento online permite que você cuide da sua saúde mental de qualquer lugar. As sessões são realizadas por videochamada em uma plataforma segura, garantindo a mesma qualidade e confidencialidade do atendimento presencial.",
  },
]

export default function ServicosPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Serviços
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Ofereço diferentes abordagens terapêuticas para atender às suas necessidades. 
                Cada tratamento é personalizado, respeitando sua individualidade e ritmo.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {services.map((service, index) => (
                <Card 
                  key={service.title} 
                  className="overflow-hidden border-border/50 bg-card"
                >
                  <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                    {/* Content */}
                    <div className="p-8 lg:p-12 lg:[direction:ltr]">
                      <CardHeader className="p-0">
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <service.icon className="h-7 w-7" />
                        </div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                        <CardDescription className="mt-2 text-base">
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-6 p-0">
                        <p className="leading-relaxed text-muted-foreground">
                          {service.details}
                        </p>
                        <div className="mt-8">
                          <Button asChild>
                            <Link href="/agendamento">
                              Agendar Consulta
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>

                    {/* Benefits */}
                    <div className="bg-secondary/50 p-8 lg:p-12 lg:[direction:ltr]">
                      <h4 className="font-semibold text-foreground">Benefícios</h4>
                      <ul className="mt-6 space-y-4">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Não sabe qual serviço é ideal para você?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
              Agende uma conversa inicial e juntos vamos entender suas necessidades 
              e definir o melhor caminho para o seu bem-estar.
            </p>
            <div className="mt-10">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/agendamento">
                  Agendar Conversa Inicial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
