import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, Film, Palette, Headphones, Monitor, Zap, Clock, DollarSign } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Camera,
      title: "Video Production",
      description: "Full-service video production from concept to completion",
      features: ["Pre-production planning", "Professional filming", "Location scouting", "Talent coordination"],
      timeline: "2-8 weeks",
      priceRange: "$5K - $50K",
    },
    {
      icon: Film,
      title: "Commercial Production",
      description: "High-impact commercials that drive results",
      features: ["Brand storytelling", "Product showcases", "Testimonial videos", "Social media content"],
      timeline: "3-6 weeks",
      priceRange: "$10K - $100K",
    },
    {
      icon: Palette,
      title: "Post-Production",
      description: "Professional editing and finishing services",
      features: ["Video editing", "Color grading", "Motion graphics", "Sound design"],
      timeline: "1-4 weeks",
      priceRange: "$2K - $20K",
    },
    {
      icon: Headphones,
      title: "Audio Production",
      description: "Crystal-clear audio recording and mixing",
      features: ["Voice-over recording", "Sound mixing", "Audio restoration", "Music composition"],
      timeline: "1-2 weeks",
      priceRange: "$1K - $10K",
    },
    {
      icon: Monitor,
      title: "Live Streaming",
      description: "Professional live event broadcasting",
      features: ["Multi-camera setup", "Real-time switching", "Graphics overlay", "Platform distribution"],
      timeline: "1-2 days",
      priceRange: "$3K - $15K",
    },
    {
      icon: Zap,
      title: "Creative Direction",
      description: "Strategic creative guidance for your projects",
      features: ["Concept development", "Storyboarding", "Art direction", "Brand alignment"],
      timeline: "1-3 weeks",
      priceRange: "$2K - $25K",
    },
  ]

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "We dive deep into your brand, goals, and target audience to develop a comprehensive creative strategy.",
    },
    {
      step: "02",
      title: "Concept Development",
      description:
        "Our creative team develops compelling concepts and storyboards that align with your vision and objectives.",
    },
    {
      step: "03",
      title: "Pre-Production",
      description: "Detailed planning including casting, location scouting, equipment preparation, and scheduling.",
    },
    {
      step: "04",
      title: "Production",
      description: "Professional filming with our experienced crew using state-of-the-art equipment and techniques.",
    },
    {
      step: "05",
      title: "Post-Production",
      description: "Expert editing, color grading, sound design, and finishing to create your final masterpiece.",
    },
    {
      step: "06",
      title: "Delivery & Support",
      description: "Final delivery in all required formats with ongoing support for distribution and marketing.",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-foreground mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive audiovisual production services designed to elevate your brand and captivate your audience
              through the power of cinematic storytelling.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="p-8 bg-card border-border hover:border-primary/50 transition-colors group">
                  <IconComponent className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.timeline}
                    </div>
                    <div className="flex items-center text-primary font-medium">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {service.priceRange}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">Our Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures every project is delivered on time, on budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold font-serif">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-foreground mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution that brings your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4">
                Get a Quote
              </Button>
            </a>
            <a href="/contact">
              <Button variant="outline" size="lg" className="px-8 py-4 bg-transparent">
                Schedule Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
