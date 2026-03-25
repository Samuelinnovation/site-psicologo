import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Heart, Calendar, MessageCircle, Share2 } from "lucide-react"

const posts = [
  {
    id: 1,
    content: "A ansiedade não define quem você é. É apenas uma experiência que você está atravessando. Com as ferramentas certas, você pode aprender a gerenciá-la e viver uma vida mais plena.",
    date: "15 de março de 2026",
    likes: 45,
    category: "Ansiedade",
  },
  {
    id: 2,
    content: "Autoconhecimento é um processo contínuo. Não espere ter todas as respostas de uma vez. Cada pequena descoberta sobre si mesmo é uma vitória a ser celebrada.",
    date: "12 de março de 2026",
    likes: 67,
    category: "Autoconhecimento",
  },
  {
    id: 3,
    content: "Pedir ajuda não é sinal de fraqueza, é sinal de coragem. Reconhecer que precisamos de apoio é o primeiro passo para uma mudança significativa em nossas vidas.",
    date: "10 de março de 2026",
    likes: 89,
    category: "Saúde Mental",
  },
  {
    id: 4,
    content: "O sono é fundamental para a saúde mental. Quando dormimos bem, nosso cérebro processa emoções e consolida memórias. Cuide da sua higiene do sono como parte do seu autocuidado.",
    date: "8 de março de 2026",
    likes: 52,
    category: "Bem-estar",
  },
  {
    id: 5,
    content: "Sentir medo é humano. O problema não é ter medo, mas deixar que ele paralise você. Na terapia, trabalhamos juntos para que você possa agir apesar do medo.",
    date: "5 de março de 2026",
    likes: 73,
    category: "Medo",
  },
  {
    id: 6,
    content: "A comparação com os outros é uma armadilha. Cada pessoa tem sua própria jornada, seus próprios desafios e seu próprio tempo. Foque no seu progresso, não no dos outros.",
    date: "3 de março de 2026",
    likes: 94,
    category: "Autoestima",
  },
  {
    id: 7,
    content: "Estabelecer limites saudáveis não é egoísmo, é autocuidado. Você não precisa dizer sim para tudo e todos. Proteger sua energia é fundamental para sua saúde mental.",
    date: "1 de março de 2026",
    likes: 108,
    category: "Limites",
  },
  {
    id: 8,
    content: "A depressão não é frescura ou falta de força de vontade. É uma condição de saúde que merece atenção e tratamento adequado. Não tenha vergonha de buscar ajuda profissional.",
    date: "27 de fevereiro de 2026",
    likes: 126,
    category: "Depressão",
  },
]

const categories = ["Todos", "Ansiedade", "Depressão", "Autoconhecimento", "Bem-estar", "Autoestima"]

export default function FeedPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary/30 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Conteúdos
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Reflexões e dicas sobre saúde mental, autoconhecimento e bem-estar. 
                Acompanhe meus pensamentos e encontre inspiração para sua jornada.
              </p>
            </div>
          </div>
        </section>

        {/* Feed Section */}
        <section className="bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            {/* Categories */}
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    category === "Todos"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="border-border/50 bg-card transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                        <Brain className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">Richard</span>
                          <span className="text-sm text-muted-foreground">@richardpsi</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="mt-4 leading-relaxed text-foreground">
                      {post.content}
                    </p>

                    {/* Category Tag */}
                    <div className="mt-4">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-6 border-t border-border pt-4">
                      <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <MessageCircle className="h-4 w-4" />
                        <span>Comentar</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                        <Share2 className="h-4 w-4" />
                        <span>Compartilhar</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 text-center">
              <button className="rounded-lg border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary">
                Carregar mais posts
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
