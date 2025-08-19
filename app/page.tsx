"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Play,
  Camera,
  ChevronDown,
  Zap,
  Film,
  Palette,
  Video,
  Mic,
  Lightbulb,
  Clapperboard,
  Settings,
  Monitor,
  Star,
  ArrowRight,
  Quote,
  CheckCircle,
} from "lucide-react"

// Animated counter hook
function useAnimatedCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!hasAnimated) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, hasAnimated])

  return { count, startAnimation: () => setHasAnimated(true) }
}

// Intersection Observer hook for scroll animations
function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [element, threshold])

  return { isVisible, setElement }
}

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Animated counters
  const projectsCounter = useAnimatedCounter(150)
  const awardsCounter = useAnimatedCounter(25)
  const clientsCounter = useAnimatedCounter(50)
  const experienceCounter = useAnimatedCounter(8)

  // Intersection observers for scroll animations
  const statsObserver = useIntersectionObserver(0.3)
  const servicesObserver = useIntersectionObserver(0.2)
  const portfolioObserver = useIntersectionObserver(0.2)
  const testimonialsObserver = useIntersectionObserver(0.2)
  const processObserver = useIntersectionObserver(0.2)
  const ctaObserver = useIntersectionObserver(0.2)

  useEffect(() => {
    setIsLoaded(true)

    // Start counter animations when stats section is visible
    if (statsObserver.isVisible) {
      projectsCounter.startAnimation()
      awardsCounter.startAnimation()
      clientsCounter.startAnimation()
      experienceCounter.startAnimation()
    }
  }, [statsObserver.isVisible])

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-card">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        </div>

        {/* Animated filmmaking tools */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Camera */}
          <div className="absolute top-1/4 left-1/4 animate-float-slow opacity-20">
            <Camera className="h-12 w-12 text-primary" />
          </div>
          {/* Clapperboard */}
          <div className="absolute top-1/3 right-1/4 animate-float-delayed opacity-20">
            <Clapperboard className="h-10 w-10 text-primary" />
          </div>
          {/* Microphone */}
          <div className="absolute bottom-1/3 left-1/5 animate-float opacity-20">
            <Mic className="h-8 w-8 text-primary" />
          </div>
          {/* Light */}
          <div className="absolute top-1/2 right-1/5 animate-float-slow opacity-20">
            <Lightbulb className="h-10 w-10 text-primary" />
          </div>
          {/* Video camera */}
          <div className="absolute bottom-1/4 right-1/3 animate-float-delayed opacity-20">
            <Video className="h-11 w-11 text-primary" />
          </div>
          {/* Monitor */}
          <div className="absolute top-1/5 left-1/3 animate-float opacity-20">
            <Monitor className="h-9 w-9 text-primary" />
          </div>
          {/* Settings gear */}
          <div className="absolute bottom-1/5 left-1/2 animate-spin-slow opacity-20">
            <Settings className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-foreground mb-8 tracking-tight">
            <span className="font-serif font-black">MaxTeam</span>
            <br />
            <span className="text-primary font-light">Visual</span>
          </h1>

          <p
            className={`text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Crafting cinematic experiences through
            <span className="text-foreground font-medium"> visual storytelling</span>,
            <span className="text-foreground font-medium"> motion design</span>, and
            <span className="text-foreground font-medium"> animation</span>
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a href="/work">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-base font-medium rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
              >
                <Play className="mr-2 h-4 w-4" />
                View Our Work
              </Button>
            </a>
            <a href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-muted px-10 py-4 text-base font-medium rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                Start Project
              </Button>
            </a>
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
            <ChevronDown className="h-4 w-4 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card" ref={statsObserver.setElement}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div
              className={`space-y-2 transition-all duration-700 delay-100 ${
                statsObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl md:text-5xl font-black text-primary font-serif hover:scale-110 transition-transform duration-300 cursor-default">
                {projectsCounter.count}+
              </div>
              <div className="text-muted-foreground">Projects Delivered</div>
            </div>
            <div
              className={`space-y-2 transition-all duration-700 delay-200 ${
                statsObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl md:text-5xl font-black text-primary font-serif hover:scale-110 transition-transform duration-300 cursor-default">
                {awardsCounter.count}+
              </div>
              <div className="text-muted-foreground">Awards Won</div>
            </div>
            <div
              className={`space-y-2 transition-all duration-700 delay-300 ${
                statsObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl md:text-5xl font-black text-primary font-serif hover:scale-110 transition-transform duration-300 cursor-default">
                {clientsCounter.count}+
              </div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div
              className={`space-y-2 transition-all duration-700 delay-400 ${
                statsObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="text-4xl md:text-5xl font-black text-primary font-serif hover:scale-110 transition-transform duration-300 cursor-default">
                {experienceCounter.count}
              </div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background" ref={servicesObserver.setElement}>
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              servicesObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-foreground mb-4">Our Creative Arsenal</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From cinematic storytelling to cutting-edge animation, we master every aspect of visual production to
              create content that doesn't just capture attention—it commands it.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                servicesObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } delay-100`}
            >
              <Camera className="h-10 w-10 text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              <h3 className="text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                Cinematic Production
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Full-service video production with Hollywood-grade equipment and techniques for stunning visual
                narratives.
              </p>
              <div className="mt-4 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
            </Card>

            <Card
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                servicesObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } delay-200`}
            >
              <Zap className="h-10 w-10 text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              <h3 className="text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                Motion Graphics
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Dynamic motion graphics and kinetic typography that bring brands to life with fluid, engaging
                animations.
              </p>
              <div className="mt-4 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
            </Card>

            <Card
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                servicesObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } delay-300`}
            >
              <Film className="h-10 w-10 text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              <h3 className="text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                3D Animation
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Cutting-edge 3D animation and visual effects that push creative boundaries and deliver jaw-dropping
                results.
              </p>
              <div className="mt-4 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
            </Card>

            <Card
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-500 group hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                servicesObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } delay-400`}
            >
              <Palette className="h-10 w-10 text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              <h3 className="text-foreground mb-3 text-lg group-hover:text-primary transition-colors duration-300">
                Post-Production
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Award-winning editing, color grading, and sound design that transforms raw footage into cinematic
                masterpieces.
              </p>
              <div className="mt-4 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background" ref={portfolioObserver.setElement}>
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              portfolioObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Projects</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our latest work that showcases the power of visual storytelling and cutting-edge production
              techniques.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Nike Air Revolution",
                client: "Nike",
                category: "Commercial",
                image: "/nike-commercial-bts.png",
              },
              {
                title: "Tesla Model S Launch",
                client: "Tesla",
                category: "Product Film",
                image: "/tesla-commercial-cinematic.png",
              },
              {
                title: "Spotify Wrapped 2024",
                client: "Spotify",
                category: "Motion Graphics",
                image: "/spotify-wrapped-graphics.png",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className={`group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                  portfolioObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{project.client}</p>
                  <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm font-medium">View Project</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="/work">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent"
              >
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-card" ref={testimonialsObserver.setElement}>
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              testimonialsObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't just take our word for it. Here's what industry leaders say about working with MaxTeam Visual.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "MaxTeam Visual transformed our brand story into a cinematic masterpiece. Their attention to detail and creative vision exceeded all expectations.",
                author: "Sarah Johnson",
                role: "Marketing Director",
                company: "Nike",
                rating: 5,
              },
              {
                quote:
                  "The animation work they delivered was absolutely stunning. Every frame was crafted with precision and artistic flair that brought our vision to life.",
                author: "Michael Chen",
                role: "Creative Director",
                company: "Tesla",
                rating: 5,
              },
              {
                quote:
                  "Professional, creative, and incredibly talented. MaxTeam Visual delivered beyond our wildest expectations and on time.",
                author: "Emma Rodriguez",
                role: "Brand Manager",
                company: "Spotify",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`p-6 bg-background border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 ${
                  testimonialsObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Quote className="h-8 w-8 text-primary mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background" ref={processObserver.setElement}>
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-700 ${
              processObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Creative Process</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From concept to completion, we follow a proven process that ensures exceptional results every time.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We dive deep into your brand, goals, and vision to understand what makes your story unique.",
                icon: Lightbulb,
              },
              {
                step: "02",
                title: "Concept",
                description:
                  "Our creative team develops innovative concepts and storyboards that bring your vision to life.",
                icon: Film,
              },
              {
                step: "03",
                title: "Production",
                description:
                  "Using cutting-edge equipment and techniques, we capture stunning footage and create amazing animations.",
                icon: Camera,
              },
              {
                step: "04",
                title: "Post-Production",
                description:
                  "We polish every detail through expert editing, color grading, and sound design for the perfect final product.",
                icon: Settings,
              },
            ].map((process, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-700 ${
                  processObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors duration-300">
                    <process.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {process.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5" ref={ctaObserver.setElement}>
        <div className="container mx-auto px-4">
          <div
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ${
              ctaObserver.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Create Something
              <span className="text-primary"> Extraordinary?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's bring your vision to life with our award-winning team of creatives, cutting-edge technology, and
              passion for visual storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <a href="/contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-medium rounded-full transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/work">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border text-foreground hover:bg-muted px-10 py-4 text-lg font-medium rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Our Reel
                </Button>
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Award-Winning Quality</h3>
                <p className="text-muted-foreground text-sm">25+ industry awards and recognition</p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">On-Time Delivery</h3>
                <p className="text-muted-foreground text-sm">100% project completion rate</p>
              </div>
              <div className="space-y-2">
                <CheckCircle className="h-8 w-8 text-primary mx-auto" />
                <h3 className="font-semibold text-foreground">Full-Service Production</h3>
                <p className="text-muted-foreground text-sm">From concept to final delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
