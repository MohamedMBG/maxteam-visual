import { Button } from "@/components/ui/button"
import { ProjectGrid } from "@/components/project-grid"

export default function WorkPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-foreground mb-6">Our Work</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover our portfolio of award-winning projects that showcase our commitment to cinematic excellence and
              creative storytelling across diverse industries and formats.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <ProjectGrid />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your next project and bring your vision to life with our award-winning production expertise.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4">
            Start Your Project
          </Button>
        </div>
      </section>
    </div>
  )
}
