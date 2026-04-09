import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Award, Heart, Clock, ArrowRight } from "lucide-react"

const credentials = [
  {
    icon: GraduationCap,
    title: "Formação",
    description: "Graduado em Psicologia ",
  },
  {
    icon: Award,
    title: "Especialização",
    description: "Especialista em Psicanálise",
  },
  {
    icon: Heart,
    title: "Abordagem",
    description: "Atendimento humanizado e focado no bem-estar do paciente",
  },
  {
    icon: Clock,
    title: "Experiência",
    description: "Mais de anos de experiência em atendimento clínico",
  },
]

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <div className="relative mx-auto w-full max-w-md lg:order-2 lg:mx-0 lg:max-w-none">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-card shadow-xl">
                  <Image
                    src="/images/richard.jpeg"
                    alt="Richard - Psicólogo"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Decorative */}
                <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-2xl bg-primary/10" />
              </div>

              {/* Content */}
              <div className="lg:order-1">
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Olá, sou o Richard
                </h1>
                <p className="mt-4 text-lg text-primary">Psicólogo Clínico - CRP 05/72067</p>
                
                <div className="mt-8 space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Há mais de anos, dedico minha carreira a ajudar pessoas a encontrarem 
                    equilíbrio emocional e qualidade de vida. Acredito que cada pessoa é única 
                    e merece um atendimento personalizado, respeitando seu tempo e suas necessidades.
                  </p>
                  <p className="leading-relaxed">
                    Minha abordagem é baseada na Psicanálise, uma das mais eficazes para tratamento de ansiedade, depressão e diversos 
                    outros desafios emocionais. Busco criar um ambiente seguro e acolhedor 
                    onde você possa se expressar livremente.
                  </p>
                  <p className="leading-relaxed">
                    Além do atendimento presencial em Volta Redonda, ofereço sessões online 
                    com a mesma qualidade e dedicação, permitindo que você cuide da sua 
                    saúde mental de onde estiver.
                  </p>
                </div>

                <div className="mt-10">
                  <Button size="lg" asChild>
                    <Link href="/agendamento">
                      Agendar uma conversa
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials Section */}
        <section className="bg-background py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Formação e Experiência
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Uma trajetória dedicada ao cuidado da saúde mental
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {credentials.map((item) => (
                <Card key={item.title} className="border-border/50 bg-card">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-primary py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Minha Missão
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
              {`"Acredito que cuidar da saúde mental não é um luxo, mas uma necessidade. 
              Minha missão é proporcionar um espaço seguro onde você possa explorar suas 
              emoções, superar desafios e construir uma vida mais equilibrada e feliz. 
              Cada passo que você dá em direção ao autoconhecimento é uma vitória, 
              e estou aqui para caminhar ao seu lado nessa jornada."`}
            </p>
            <p className="mt-6 font-semibold text-primary-foreground">— Richard</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
