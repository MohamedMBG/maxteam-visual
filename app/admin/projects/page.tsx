"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Calendar, DollarSign, Upload, LinkIcon } from "lucide-react"

interface Project {
  id: number
  title: string
  client: string
  status: string
  category: string
  budget: string
  startDate: string
  dueDate: string
  progress: number
  team: string[]
  description: string
  images: string[]
  location: string
  awards: string[]
}

export default function AdminProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    status: "Pre-Production",
    category: "Commercial",
    budget: "",
    startDate: "",
    dueDate: "",
    description: "",
    location: "",
    awards: "",
    images: [] as string[],
    imageInput: "",
    imageType: "url" as "url" | "upload",
  })

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Luxury Brand Campaign",
      client: "Premium Fashion House",
      status: "In Production",
      category: "Commercial",
      budget: "$150,000",
      startDate: "2024-01-15",
      dueDate: "2024-02-15",
      progress: 75,
      team: ["Marcus Thompson", "David Rodriguez", "Sarah Chen"],
      description:
        "A cinematic journey through craftsmanship and elegance, showcasing the brand's heritage through stunning visuals and compelling storytelling.",
      images: ["/project-luxury-brand.jpg"],
      location: "Paris, France",
      awards: ["Cannes Lions Gold", "D&AD Pencil"],
    },
    {
      id: 2,
      title: "3D Character Animation Series",
      client: "Gaming Studio",
      status: "Post-Production",
      category: "Animation",
      budget: "$200,000",
      startDate: "2023-12-01",
      dueDate: "2024-01-30",
      progress: 90,
      team: ["Marcus Thompson", "Elena Vasquez"],
      description:
        "High-end 3D character animation for next-generation gaming experience with motion capture integration.",
      images: ["/character-animation-preview.png"],
      location: "Los Angeles, USA",
      awards: ["Animation Excellence Award"],
    },
    {
      id: 3,
      title: "Motion Graphics Explainer",
      client: "Tech Startup",
      status: "Completed",
      category: "Animation",
      budget: "$75,000",
      startDate: "2023-11-15",
      dueDate: "2024-01-15",
      progress: 100,
      team: ["David Rodriguez", "Sarah Chen"],
      description:
        "Dynamic motion graphics and 2D animation explaining complex technology in an engaging visual format.",
      images: ["/motion-graphics-demo.png"],
      location: "Remote",
      awards: ["Motion Design Award"],
    },
    {
      id: 4,
      title: "Music Video Project",
      client: "International Recording Artist",
      status: "Pre-Production",
      category: "Music Video",
      budget: "$75,000",
      startDate: "2024-02-01",
      dueDate: "2024-03-01",
      progress: 25,
      team: ["Marcus Thompson", "Elena Vasquez"],
      description: "A visually stunning music video to accompany the artist's latest release.",
      images: ["/project-music-video.jpg"],
      location: "London, UK",
      awards: [],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "In Production":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Post-Production":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "Pre-Production":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const handleAddProject = () => {
    const newProject: Project = {
      id: Math.max(...projects.map((p) => p.id)) + 1,
      title: formData.title,
      client: formData.client,
      status: formData.status,
      category: formData.category,
      budget: formData.budget,
      startDate: formData.startDate,
      dueDate: formData.dueDate,
      progress: 0,
      team: [],
      description: formData.description,
      images: formData.images,
      location: formData.location,
      awards: formData.awards ? formData.awards.split(",").map((a) => a.trim()) : [],
    }

    setProjects([...projects, newProject])
    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      client: project.client,
      status: project.status,
      category: project.category,
      budget: project.budget,
      startDate: project.startDate,
      dueDate: project.dueDate,
      description: project.description,
      location: project.location,
      awards: project.awards.join(", "),
      images: project.images,
      imageInput: "",
      imageType: "url",
    })
    setIsAddDialogOpen(true)
  }

  const handleUpdateProject = () => {
    if (!editingProject) return

    const updatedProject: Project = {
      ...editingProject,
      title: formData.title,
      client: formData.client,
      status: formData.status,
      category: formData.category,
      budget: formData.budget,
      startDate: formData.startDate,
      dueDate: formData.dueDate,
      description: formData.description,
      images: formData.images,
      location: formData.location,
      awards: formData.awards ? formData.awards.split(",").map((a) => a.trim()) : [],
    }

    setProjects(projects.map((p) => (p.id === editingProject.id ? updatedProject : p)))
    resetForm()
    setIsAddDialogOpen(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      client: "",
      status: "Pre-Production",
      category: "Commercial",
      budget: "",
      startDate: "",
      dueDate: "",
      description: "",
      location: "",
      awards: "",
      images: [],
      imageInput: "",
      imageType: "url",
    })
  }

  const handleAddImage = () => {
    if (formData.imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, formData.imageInput.trim()],
        imageInput: "",
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    })
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a server and get back a URL
      const fakeUrl = URL.createObjectURL(file)
      setFormData({
        ...formData,
        images: [...formData.images, fakeUrl],
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
          <p className="text-muted-foreground">Manage all your video production projects</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => {
                resetForm()
                setEditingProject(null)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Enter client name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pre-Production">Pre-Production</SelectItem>
                      <SelectItem value="In Production">In Production</SelectItem>
                      <SelectItem value="Post-Production">Post-Production</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Documentary">Documentary</SelectItem>
                      <SelectItem value="Music Video">Music Video</SelectItem>
                      <SelectItem value="Animation">Animation</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="$150,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Paris, France"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter project description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="awards">Awards (comma-separated)</Label>
                <Input
                  id="awards"
                  value={formData.awards}
                  onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                  placeholder="Cannes Lions Gold, D&AD Pencil"
                />
              </div>

              <div>
                <Label>Project Images</Label>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Select
                      value={formData.imageType}
                      onValueChange={(value: "url" | "upload") => setFormData({ ...formData, imageType: value })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="upload">Upload</SelectItem>
                      </SelectContent>
                    </Select>

                    {formData.imageType === "url" ? (
                      <>
                        <Input
                          value={formData.imageInput}
                          onChange={(e) => setFormData({ ...formData, imageInput: e.target.value })}
                          placeholder="Enter image URL"
                          className="flex-1"
                        />
                        <Button type="button" onClick={handleAddImage} size="sm">
                          <LinkIcon className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </>
                    ) : (
                      <>
                        <Input type="file" accept="image/*" onChange={handleFileUpload} className="flex-1" />
                        <Button type="button" size="sm">
                          <Upload className="h-4 w-4 mr-1" />
                          Upload
                        </Button>
                      </>
                    )}
                  </div>

                  {formData.images.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Added Images:</p>
                      {formData.images.map((image, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm truncate flex-1">{image}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveImage(index)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false)
                    resetForm()
                    setEditingProject(null)
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={editingProject ? handleUpdateProject : handleAddProject}>
                  {editingProject ? "Update Project" : "Add Project"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pre-production">Pre-Production</SelectItem>
              <SelectItem value="in-production">In Production</SelectItem>
              <SelectItem value="post-production">Post-Production</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Projects Table */}
      <Card className="bg-card border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-foreground">{project.title}</div>
                    <div className="text-sm text-muted-foreground">ID: {project.id}</div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{project.client}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{project.category}</TableCell>
                <TableCell className="font-medium text-foreground">{project.budget}</TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {project.dueDate}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full">
                      <div className="h-2 bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditProject(project)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteProject(project.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
              <p className="text-2xl font-bold text-foreground">156</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">In Production</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">$2.4M</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg. Project Value</p>
              <p className="text-2xl font-bold text-foreground">$125K</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
