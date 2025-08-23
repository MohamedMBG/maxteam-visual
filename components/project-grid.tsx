"use client"

import React, { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, Calendar, MapPin, Search, Filter } from "lucide-react"

interface WorkItem {
  id: number
  title: string
  client: string
  category: string
  description: string
  startDate?: string
  endDate?: string
  location?: string
  awards?: string
  images: string[]
}

function deriveYear(item: WorkItem): string {
  const source = item.endDate || item.startDate
  if (!source) return ""
  const year = new Date(source).getFullYear()
  return isNaN(year) ? "" : String(year)
}

export function ProjectGrid() {
  const [works, setWorks] = useState<WorkItem[]>([])
  const [filteredWorks, setFilteredWorks] = useState<WorkItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/works")
        if (!res.ok) throw new Error("Failed to load works")
        const data = (await res.json()) as WorkItem[]
        setWorks(data)
        setFilteredWorks(data)
      } catch {
        setWorks([])
        setFilteredWorks([])
      }
    }
    load()
  }, [])

  const categories = useMemo(() => {
    const set = new Set<string>(["all"]) 
    works.forEach((w) => w.category && set.add(w.category))
    return Array.from(set)
  }, [works])

  const years = useMemo(() => {
    const set = new Set<string>(["all"]) 
    works.forEach((w) => {
      const y = deriveYear(w)
      if (y) set.add(y)
    })
    return Array.from(set).sort()
  }, [works])

  const handleFilter = () => {
    let filtered = works

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (selectedYear !== "all") {
      filtered = filtered.filter((item) => deriveYear(item) === selectedYear)
    }

    setFilteredWorks(filtered)
  }

  useEffect(() => {
    handleFilter()
  }, [searchTerm, selectedCategory, selectedYear, works])

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
      <div className="text-sm text-muted-foreground">Showing {filteredWorks.length} of {works.length} projects</div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorks.map((item) => {
          const year = deriveYear(item)
          const thumbnail = item.images?.[0] || "/placeholder.jpg"
          const awardsList = item.awards ? item.awards.split(",").map((s) => s.trim()).filter(Boolean) : []
          return (
            <Card 
              key={item.id} 
              className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedWork(item)
                setIsModalOpen(true)
              }}
            >
              <div className="relative overflow-hidden aspect-video">
                <img src={thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 text-foreground">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-foreground mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.client}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  {year && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {year}
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </div>
                  )}
                </div>

                {awardsList.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {awardsList.map((award) => (
                      <Badge key={award} variant="outline" className="text-xs border-primary/30 text-primary">
                        <Award className="h-3 w-3 mr-1" />
                        {award}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Work Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedWork && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">{selectedWork.title}</DialogTitle>
              </DialogHeader>

              {/* Images Gallery */}
              {selectedWork.images && selectedWork.images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Project Images</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedWork.images.map((image, index) => (
                      <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`${selectedWork.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Project Details</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Client:</span>
                      <p className="text-foreground">{selectedWork.client}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Category:</span>
                      <p className="text-foreground">{selectedWork.category}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Status:</span>
                      <Badge variant="outline">{selectedWork.status}</Badge>
                    </div>
                    {selectedWork.location && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Location:</span>
                        <p className="text-foreground">{selectedWork.location}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {selectedWork.startDate && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Start Date:</span>
                        <p className="text-foreground">{new Date(selectedWork.startDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedWork.endDate && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">End Date:</span>
                        <p className="text-foreground">{new Date(selectedWork.endDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    {selectedWork.awards && (
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Awards:</span>
                        <p className="text-foreground">{selectedWork.awards}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Description:</span>
                  <p className="text-foreground mt-2 leading-relaxed">{selectedWork.description}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredWorks.length === 0 && (
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
