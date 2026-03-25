import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const highlights = [
  "Atendimento humanizado",
  "Sessões presenciais e online",
  "Ambiente acolhedor",
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.55_0.15_240/0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,oklch(0.65_0.12_240/0.08),transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="text-sm font-medium text-primary">Psicólogo CRP 05/72067</span>
            </div>
            
            <h1 className="text-pretty text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Cuidar da sua mente é o primeiro passo para uma vida melhor
            </h1>
            
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Olá, sou o Richard, psicólogo especializado em ajudar pessoas a superar 
              desafios emocionais e encontrar equilíbrio. Juntos, podemos construir 
              um caminho para o seu bem-estar.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/agendamento">
                  Agendar Consulta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sobre">Conhecer mais</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-xl">
              <Image
                src="/images/richard.jpeg"
                alt="Richard - Psicólogo"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-2xl bg-primary/20" />
              <div className="absolute -left-4 -top-4 -z-10 h-16 w-16 rounded-2xl bg-accent/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
