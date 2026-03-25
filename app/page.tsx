import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { ServicesPreview } from "@/components/home/services-preview"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesPreview />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
