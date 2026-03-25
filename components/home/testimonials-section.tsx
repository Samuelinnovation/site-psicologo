import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Maria S.",
    role: "Paciente há 1 ano",
    content: "O Richard me ajudou a entender minhas emoções e a lidar com a ansiedade de uma forma que eu nunca imaginei ser possível. Sou muito grata pelo acolhimento.",
    avatar: "M",
  },
  {
    name: "João P.",
    role: "Paciente há 8 meses",
    content: "Depois de anos evitando terapia, encontrei no consultório do Richard um espaço seguro para me abrir. A mudança na minha qualidade de vida foi significativa.",
    avatar: "J",
  },
  {
    name: "Ana C.",
    role: "Paciente há 6 meses",
    content: "O atendimento online me surpreendeu positivamente. A conexão com o Richard é a mesma, e posso fazer terapia sem sair de casa. Recomendo muito!",
    avatar: "A",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            O que dizem sobre o atendimento
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Depoimentos de pessoas que iniciaram sua jornada de autoconhecimento
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.name} 
              className="relative border-border/50 bg-card"
            >
              <CardContent className="pt-6">
                <Quote className="mb-4 h-8 w-8 text-primary/20" />
                <p className="leading-relaxed text-muted-foreground">
                  {`"${testimonial.content}"`}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
