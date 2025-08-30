import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Linkedin, Twitter, Instagram } from "lucide-react"
import { AchievementBadges } from "@/components/gamification/AchievementBadges"
import { EasterEgg } from "@/components/gamification/EasterEgg"
import { achievementBadges, teamFunFacts } from "@/data/badges"

export default function AboutPage() {
  const team = [
    {
      name: "Marcus Thompson",
      role: "Creative Director & Founder",
      bio: "Award-winning director with 15+ years in commercial and documentary production. Marcus has led campaigns for Fortune 500 companies and his work has been featured at Cannes Lions.",
      image:
        "https://instagram.ftng2-1.fna.fbcdn.net/v/t51.2885-19/299837146_605608284473576_6262475497915159366_n.jpg?efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.ftng2-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QH5tv7KIxRwGpK5V29_rSIK21L-waRLiCSmpP9xZF-MiCvRKYTvVSEm_N5gHYxF-iE&_nc_ohc=rrMoN-cmZg0Q7kNvwF-jjpe&_nc_gid=BvXqtCvfxlZ5u4qTaLbefg&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AfUW1tLyUgGBazphUxhvwY6JusQTRtM8AaU266aSqAVUfw&oe=68B8C582&_nc_sid=7a9f4b",
      awards: ["Cannes Lions Gold", "D&AD Black Pencil"],
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Sarah Chen",
      role: "Head of Production",
      bio: "Production expert specializing in complex international shoots. Sarah ensures every project runs smoothly from pre-production through final delivery.",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&h=200",
      awards: ["Emmy Nomination", "Clio Award"],
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "David Rodriguez",
      role: "Lead Cinematographer",
      bio: "Master of visual storytelling with expertise in cutting-edge camera technology. David's cinematography has been recognized at film festivals worldwide.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200",
      awards: ["ASC Award", "Camerimage Bronze"],
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
  ]

  const clients = [
    "Apple",
    "Nike",
    "Mercedes-Benz",
    "Coca-Cola",
    "Netflix",
    "Google",
    "BMW",
    "Samsung",
    "Microsoft",
    "Adobe",
    "Tesla",
    "Spotify",
    "Airbnb",
    "Uber",
    "Amazon",
    "Meta",
  ]

  const awards = [
    { year: "2024", award: "Cannes Lions Gold", project: "Luxury Brand Campaign" },
    { year: "2024", award: "D&AD Pencil", project: "Tech Innovation Documentary" },
    { year: "2023", award: "Emmy Nomination", project: "Corporate Sustainability Series" },
    { year: "2023", award: "Clio Award", project: "Automotive Excellence" },
    { year: "2022", award: "One Show Merit", project: "Fashion Week Coverage" },
    { year: "2022", award: "Webby Award", project: "Interactive Brand Experience" },
  ]

  const press = [
    {
      publication: "AdAge",
      headline: "MaxTeam Visual Redefines Cinematic Advertising",
      date: "March 2024",
      url: "#",
    },
    {
      publication: "Campaign Magazine",
      headline: "The Future of Video Production is Here",
      date: "January 2024",
      url: "#",
    },
    {
      publication: "Creative Review",
      headline: "Award-Winning Studio Pushes Creative Boundaries",
      date: "November 2023",
      url: "#",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-foreground mb-6">About MaxTeam Visual</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Founded in 2016, MaxTeam Visual has grown from a passionate startup to an award-winning production house,
              creating cinematic experiences that captivate audiences and drive results for the world's leading brands.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-primary font-serif">8+</div>
                <div className="text-muted-foreground">Years</div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary font-serif">150+</div>
                <div className="text-muted-foreground">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary font-serif">25+</div>
                <div className="text-muted-foreground">Awards</div>
              </div>
              <div>
                <div className="text-3xl font-black text-primary font-serif">50+</div>
                <div className="text-muted-foreground">Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-foreground mb-6">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To create extraordinary visual experiences that transcend traditional advertising, connecting brands
                with their audiences through the power of cinematic storytelling and cutting-edge production techniques.
              </p>
            </div>
            <div>
              <h2 className="text-foreground mb-6">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To be the global leader in premium audiovisual production, setting new standards for creativity,
                technical excellence, and client satisfaction while pushing the boundaries of what's possible in visual
                communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of creative professionals brings together decades of experience in filmmaking,
              advertising, and digital media production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <EasterEgg key={index} funFact={teamFunFacts[index]}>
                <Card className="p-8 bg-background border-border text-center group hover:border-primary/50 transition-colors">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="text-foreground mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">{member.bio}</p>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.awards.map((award) => (
                      <Badge key={award} variant="outline" className="text-xs border-primary/30 text-primary">
                        <Award className="h-3 w-3 mr-1" />
                        {award}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.instagram}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </Card>
              </EasterEgg>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-foreground mb-4">Trusted by Leading Brands</h2>
            <p className="text-muted-foreground">
              We've had the privilege of working with some of the world's most innovative companies.
            </p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center opacity-60">
            {clients.map((client) => (
              <div key={client} className="text-center">
                <div className="text-muted-foreground font-medium text-sm">{client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Badges Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">Our Achievements</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Milestones that showcase our growth, expertise, and commitment to excellence in audiovisual production.
            </p>
          </div>

          <AchievementBadges badges={achievementBadges} className="max-w-6xl mx-auto" />
        </div>
      </section>

      {/* Awards Timeline */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">Awards & Recognition</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence has been recognized by industry leaders and award bodies worldwide.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {awards.map((item, index) => (
              <div key={index} className="flex items-start space-x-6 mb-8 last:mb-0">
                <div className="flex-shrink-0 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold font-serif">
                  {item.year}
                </div>
                <div className="flex-grow">
                  <h3 className="text-foreground mb-1">{item.award}</h3>
                  <p className="text-muted-foreground">{item.project}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Mentions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-foreground mb-4">In the Press</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Industry publications recognize our innovative approach to audiovisual production.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {press.map((article, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-colors">
                <div className="text-primary font-medium mb-2">{article.publication}</div>
                <h3 className="text-foreground mb-4 leading-tight">{article.headline}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.date}</span>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
