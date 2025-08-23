"use client"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit, Trash2, Video, Camera, Palette, Search, Plus, X } from "lucide-react"

// Mock data for existing works
const mockWorks = [
  {
    id: 1,
    title: "Nike Air Max Campaign",
    client: "Nike",
    category: "Commercial",
    status: "Completed",
    description:
      "High-energy commercial showcasing the new Air Max collection with dynamic cinematography and motion graphics.",
    budget: "$75,000",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    location: "Los Angeles, CA",
    awards: "Best Commercial 2024",
    images: ["/nike-commercial-bts.png", "/nike-commercial-cinematic.png"],
  },
  {
    id: 2,
    title: "Tesla Model S Animation",
    client: "Tesla",
    category: "Animation",
    status: "In Production",
    description:
      "3D animation showcasing the Tesla Model S features with photorealistic rendering and smooth transitions.",
    budget: "$120,000",
    startDate: "2024-02-01",
    endDate: "2024-04-15",
    location: "Remote",
    awards: "",
    images: ["/tesla-commercial-cinematic.png"],
  },
  {
    id: 3,
    title: "Spotify Wrapped Graphics",
    client: "Spotify",
    category: "Animation",
    status: "Completed",
    description:
      "Motion graphics package for Spotify Wrapped featuring vibrant colors and dynamic typography animations.",
    budget: "$45,000",
    startDate: "2023-10-01",
    endDate: "2023-11-30",
    location: "New York, NY",
    awards: "Motion Graphics Excellence Award",
    images: ["/spotify-wrapped-graphics.png"],
  },
]

export default function ManageWorks() {
  const [works, setWorks] = useState(mockWorks)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingWork, setEditingWork] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredWorks = works.filter(
    (work) =>
      work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      work.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (work: any) => {
    setEditingWork({ ...work })
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`/api/works/${editingWork.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingWork),
      })
      if (!res.ok) throw new Error("Failed to update work")
      const updated = await res.json()
      setWorks(works.map((work) => (work.id === updated.id ? updated : work)))
      setIsEditDialogOpen(false)
      setEditingWork(null)
    } catch (e: any) {
      alert(e.message || "Update failed")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this work?")) return
    try {
      const res = await fetch(`/api/works/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete work")
      setWorks(works.filter((work) => work.id !== id))
    } catch (e: any) {
      alert(e.message || "Delete failed")
    }
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/works")
        if (!res.ok) throw new Error("Failed to load works")
        const data = await res.json()
        setWorks(data)
      } catch (e) {
        // keep mock if failed
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const addImageUrl = (url: string) => {
    if (url.trim()) {
      setEditingWork({
        ...editingWork,
        images: [...editingWork.images, url.trim()],
      })
    }
  }

  const removeImage = (index: number) => {
    setEditingWork({
      ...editingWork,
      images: editingWork.images.filter((_: any, i: number) => i !== index),
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Edit className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Manage Works</h1>
        <p className="text-muted-foreground">Edit, delete, or view your existing projects</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search works..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Works Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorks.map((work) => (
          <Card key={work.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{work.title}</h3>
                  <p className="text-sm text-muted-foreground">{work.client}</p>
                </div>
                <div className="flex items-center space-x-1">
                  {work.category === "Commercial" && <Camera className="h-4 w-4 text-primary" />}
                  {work.category === "Animation" && <Palette className="h-4 w-4 text-primary" />}
                  {work.category === "Documentary" && <Video className="h-4 w-4 text-primary" />}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      work.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : work.status === "In Production"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {work.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="text-foreground">{work.category}</span>
                </div>
                {work.budget && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="text-foreground">{work.budget}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">{work.description}</p>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" onClick={() => handleEdit(work)} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(work.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredWorks.length === 0 && (
        <div className="text-center py-12">
          <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No works found</h3>
          <p className="text-muted-foreground">Try adjusting your search or add a new work.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Work</DialogTitle>
          </DialogHeader>

          {editingWork && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Title</Label>
                  <Input
                    value={editingWork.title}
                    onChange={(e) => setEditingWork({ ...editingWork, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Input
                    value={editingWork.client}
                    onChange={(e) => setEditingWork({ ...editingWork, client: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={editingWork.description}
                  onChange={(e) => setEditingWork({ ...editingWork, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={editingWork.category}
                    onValueChange={(value) => setEditingWork({ ...editingWork, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Documentary">Documentary</SelectItem>
                      <SelectItem value="Animation">Animation</SelectItem>
                      <SelectItem value="Music Video">Music Video</SelectItem>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Event">Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editingWork.status}
                    onValueChange={(value) => setEditingWork({ ...editingWork, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Pre-Production">Pre-Production</SelectItem>
                      <SelectItem value="In Production">In Production</SelectItem>
                      <SelectItem value="Post-Production">Post-Production</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Budget</Label>
                  <Input
                    value={editingWork.budget}
                    onChange={(e) => setEditingWork({ ...editingWork, budget: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={editingWork.startDate}
                    onChange={(e) => setEditingWork({ ...editingWork, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    value={editingWork.endDate}
                    onChange={(e) => setEditingWork({ ...editingWork, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={editingWork.location}
                    onChange={(e) => setEditingWork({ ...editingWork, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Awards</Label>
                  <Input
                    value={editingWork.awards}
                    onChange={(e) => setEditingWork({ ...editingWork, awards: e.target.value })}
                  />
                </div>
              </div>

              {/* Image Management */}
              <div className="space-y-4">
                <Label>Project Images</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter image URL"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addImageUrl(e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      addImageUrl(input.value)
                      input.value = ""
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {editingWork.images?.length > 0 && (
                  <div className="space-y-2">
                    {editingWork.images.map((image: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-background rounded">
                        <span className="text-sm truncate flex-1">{image}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
