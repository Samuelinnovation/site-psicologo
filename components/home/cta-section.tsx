import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center justify-center rounded-full bg-primary-foreground/10 p-3">
            <Calendar className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Pronto para dar o primeiro passo?
          </h2>
          
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/80">
            Agende sua consulta e comece sua jornada de autoconhecimento e bem-estar. 
            O primeiro passo pode parecer difícil, mas estou aqui para te acompanhar.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/agendamento">
                Agendar Consulta
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
              <Link href="/sobre">Saber mais sobre mim</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
