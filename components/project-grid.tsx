"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Award, Calendar, MapPin, Search, Filter } from "lucide-react"
import Link from "next/link"

interface Project {
  id: number
  slug: string
  title: string
  client: string
  category: string
  year: string
  location: string
  awards: string[]
  thumbnail: string
  description: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    slug: "luxury-brand-campaign",
    title: "Luxury Brand Campaign",
    client: "Premium Fashion House",
    category: "Commercial",
    year: "2024",
    location: "Paris, France",
    awards: ["Cannes Lions Gold", "D&AD Pencil"],
    thumbnail: "/project-luxury-brand.jpg",
    description:
      "A cinematic journey through craftsmanship and elegance, showcasing the brand's heritage through stunning visuals and compelling storytelling.",
    featured: true,
  },
  {
    id: 2,
    slug: "tech-innovation-documentary",
    title: "Tech Innovation Documentary",
    client: "Global Tech Corporation",
    category: "Documentary",
    year: "2024",
    location: "Silicon Valley, USA",
    awards: ["Emmy Nomination"],
    thumbnail: "/project-tech-doc.jpg",
    description:
      "An in-depth exploration of cutting-edge technology and its impact on society, featuring interviews with industry leaders and stunning visualizations.",
  },
  {
    id: 3,
    slug: "automotive-excellence",
    title: "Automotive Excellence",
    client: "Luxury Car Manufacturer",
    category: "Commercial",
    year: "2023",
    location: "Monaco",
    awards: ["Clio Award", "One Show Merit"],
    thumbnail: "/project-automotive.jpg",
    description:
      "High-octane cinematography capturing the essence of performance and luxury in motion, with breathtaking aerial shots and precision driving sequences.",
  },
  {
    id: 4,
    slug: "music-video-artist",
    title: "Chart-Topping Music Video",
    client: "International Recording Artist",
    category: "Music Video",
    year: "2024",
    location: "Los Angeles, USA",
    awards: ["MTV VMA Nomination"],
    thumbnail: "/project-music-video.jpg",
    description:
      "A visually stunning music video that combines practical effects with cutting-edge VFX to create a surreal narrative experience.",
  },
  {
    id: 5,
    slug: "corporate-sustainability",
    title: "Corporate Sustainability Series",
    client: "Fortune 500 Company",
    category: "Corporate",
    year: "2023",
    location: "Multiple Locations",
    awards: ["Telly Award Gold"],
    thumbnail: "/project-corporate.jpg",
    description:
      "A comprehensive video series showcasing corporate environmental initiatives across multiple continents and industries.",
  },
  {
    id: 6,
    slug: "fashion-week-coverage",
    title: "Fashion Week Coverage",
    client: "Fashion Media Group",
    category: "Event",
    year: "2023",
    location: "Milan, Italy",
    awards: ["Fashion Film Award"],
    thumbnail: "/project-fashion.jpg",
    description:
      "Behind-the-scenes and runway coverage of Milan Fashion Week, capturing the energy and artistry of haute couture.",
  },
]

export function ProjectGrid() {
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const categories = ["all", "Commercial", "Documentary", "Music Video", "Corporate", "Event"]
  const years = ["all", "2024", "2023", "2022", "2021"]

  const handleFilter = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((project) => project.year === selectedYear)
    }

    setFilteredProjects(filtered)
  }

  // Apply filters whenever search term or filters change
  React.useEffect(() => {
    handleFilter()
  }, [searchTerm, selectedCategory, selectedYear])

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects, clients, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:w-auto w-full justify-center"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-card rounded-lg border border-border">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Year</label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedYear("all")
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className={`group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 ${
              project.featured ? "md:col-span-2 lg:col-span-2" : ""
            }`}
          >
            <Link href={`/work/${project.slug}`}>
              <div className={`relative overflow-hidden ${project.featured ? "aspect-[2/1]" : "aspect-video"}`}>
                <img
                  src={`/abstract-geometric-shapes.png?height=${project.featured ? "400" : "300"}&width=${
                    project.featured ? "800" : "500"
                  }&query=${project.title} cinematic video production`}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" className="bg-primary/90 hover:bg-primary">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Project
                  </Button>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 text-foreground">
                    {project.category}
                  </Badge>
                </div>
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.client}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.year}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </div>
                </div>

                {project.awards.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.awards.map((award) => (
                      <Badge key={award} variant="outline" className="text-xs border-primary/30 text-primary">
                        <Award className="h-3 w-3 mr-1" />
                        {award}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">No projects found matching your criteria.</div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
              setSelectedYear("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
