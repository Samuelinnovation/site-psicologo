"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Send, Edit2, Trash2, Calendar } from "lucide-react"

const existingPosts = [
  {
    id: 1,
    content: "A ansiedade não define quem você é. É apenas uma experiência que você está atravessando.",
    category: "Ansiedade",
    date: "15/03/2026",
    published: true,
  },
  {
    id: 2,
    content: "Autoconhecimento é um processo contínuo. Não espere ter todas as respostas de uma vez.",
    category: "Autoconhecimento",
    date: "12/03/2026",
    published: true,
  },
  {
    id: 3,
    content: "Pedir ajuda não é sinal de fraqueza, é sinal de coragem.",
    category: "Saúde Mental",
    date: "10/03/2026",
    published: true,
  },
]

const categories = [
  "Ansiedade",
  "Depressão",
  "Autoconhecimento",
  "Bem-estar",
  "Autoestima",
  "Saúde Mental",
  "Medo",
  "Limites",
]

export default function PostsAdminPage() {
  const [newPost, setNewPost] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [posts, setPosts] = useState(existingPosts)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim() || !selectedCategory) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newPostData = {
      id: posts.length + 1,
      content: newPost,
      category: selectedCategory,
      date: new Date().toLocaleDateString("pt-BR"),
      published: true,
    }
    
    setPosts([newPostData, ...posts])
    setNewPost("")
    setSelectedCategory(undefined)
    setIsSubmitting(false)
  }

  const handleDelete = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Posts</h1>
        <p className="mt-1 text-muted-foreground">
          Crie e gerencie seus conteúdos.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Create New Post */}
        <Card className="border-border/50 lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Criar Novo Post
            </CardTitle>
            <CardDescription>
              Escreva um novo conteúdo para o feed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo</Label>
                <Textarea
                  id="content"
                  placeholder="Escreva sua reflexão ou dica sobre saúde mental..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <p className="text-right text-xs text-muted-foreground">
                  {newPost.length}/500 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label>Categoria</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={!newPost.trim() || !selectedCategory || isSubmitting}
              >
                {isSubmitting ? (
                  "Publicando..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Publicar Post
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Posts */}
        <Card className="border-border/50 lg:col-span-1">
          <CardHeader>
            <CardTitle>Posts Publicados</CardTitle>
            <CardDescription>
              {posts.length} post(s) publicado(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border border-border/50 p-4"
                >
                  <p className="text-sm leading-relaxed text-foreground line-clamp-3">
                    {post.content}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
