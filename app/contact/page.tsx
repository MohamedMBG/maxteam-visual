import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const offices = [
    {
      city: "Los Angeles",
      address: "1234 Sunset Boulevard, Suite 500\nLos Angeles, CA 90028",
      phone: "+1 (323) 555-0123",
      email: "la@maxteamvisual.com",
    },
    {
      city: "New York",
      address: "567 Broadway, Floor 12\nNew York, NY 10012",
      phone: "+1 (212) 555-0456",
      email: "ny@maxteamvisual.com",
    },
    {
      city: "London",
      address: "89 Shoreditch High Street\nLondon E1 6JN, UK",
      phone: "+44 20 7946 0789",
      email: "london@maxteamvisual.com",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-foreground mb-6">Let's Create Together</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to bring your vision to life? Get in touch with our team to discuss your next project and discover
              how we can help you achieve your creative goals.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="p-8 bg-card border-border">
              <h2 className="text-foreground mb-6">Start Your Project</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-2" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@company.com" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="mt-2" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your Company Name" className="mt-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="documentary">Documentary</SelectItem>
                        <SelectItem value="corporate">Corporate Video</SelectItem>
                        <SelectItem value="music-video">Music Video</SelectItem>
                        <SelectItem value="live-event">Live Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-10k">Under $10K</SelectItem>
                        <SelectItem value="10k-25k">$10K - $25K</SelectItem>
                        <SelectItem value="25k-50k">$25K - $50K</SelectItem>
                        <SelectItem value="50k-100k">$50K - $100K</SelectItem>
                        <SelectItem value="100k-plus">$100K+</SelectItem>
                        <SelectItem value="discuss">Let's Discuss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline">Desired Timeline</Label>
                  <Input id="timeline" placeholder="e.g., 6 weeks, by March 2024" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="location">Project Location</Label>
                  <Input id="location" placeholder="e.g., Los Angeles, Remote, Multiple locations" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project, goals, target audience, and any specific requirements..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Send Project Brief
                </Button>
              </form>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-foreground mb-6">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're looking to create a commercial, documentary, or any other video content, our team is
                  here to help bring your vision to life. Reach out to discuss your project requirements.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground">+1 (323) 555-0123</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground">hello@maxteamvisual.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Mon-Fri 9AM-6PM PST</span>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              <div>
                <h3 className="text-foreground mb-6">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={index} className="p-6 bg-card border-border">
                      <h4 className="text-foreground mb-3 flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        {office.city}
                      </h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="whitespace-pre-line">{office.address}</p>
                        <p>{office.phone}</p>
                        <p>{office.email}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Quick Response */}
              <Card className="p-6 bg-primary/10 border-primary/20">
                <h4 className="text-foreground mb-3">Quick Response Guarantee</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We understand that timing is crucial in production. Our team responds to all project inquiries within
                  24 hours, and we can often provide initial quotes and timelines within 48 hours.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
