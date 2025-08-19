"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Link, X, Plus, Video, Camera, Palette } from "lucide-react"

export default function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    description: "",
    category: "",
    status: "Planning",
    budget: "",
    startDate: "",
    endDate: "",
    location: "",
    awards: "",
    images: [] as string[],
  })

  const [imageMode, setImageMode] = useState<"upload" | "url">("upload")
  const [newImageUrl, setNewImageUrl] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
      }))
      setNewImageUrl("")
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Submitting new work:", formData)
    // Here you would typically send the data to your backend
    alert("New work added successfully!")

    // Reset form
    setFormData({
      title: "",
      client: "",
      description: "",
      category: "",
      status: "Planning",
      budget: "",
      startDate: "",
      endDate: "",
      location: "",
      awards: "",
      images: [],
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full animate-pulse-glow">
            <Video className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2 animate-gradient-text">Add New Work</h1>
        <p className="text-muted-foreground">Upload your latest project to showcase MaxTeam Visual's expertise</p>
      </div>

      <Card className="p-8 bg-card border-border animate-scale-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 animate-slide-in-left">
              <Label htmlFor="title" className="text-sm font-medium">
                Project Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter project title"
                required
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="space-y-2 animate-slide-in-right">
              <Label htmlFor="client" className="text-sm font-medium">
                Client *
              </Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleInputChange("client", e.target.value)}
                placeholder="Enter client name"
                required
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 animate-fade-in">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the project, goals, and creative approach..."
              rows={4}
              required
              className="transition-all duration-300 focus:scale-105"
            />
          </div>

          {/* Category and Status */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 animate-slide-in-left">
              <Label className="text-sm font-medium">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="transition-all duration-300 hover:scale-105">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Commercial">
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 mr-2" />
                      Commercial
                    </div>
                  </SelectItem>
                  <SelectItem value="Documentary">
                    <div className="flex items-center">
                      <Video className="h-4 w-4 mr-2" />
                      Documentary
                    </div>
                  </SelectItem>
                  <SelectItem value="Animation">
                    <div className="flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      Animation
                    </div>
                  </SelectItem>
                  <SelectItem value="Music Video">Music Video</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 animate-slide-in-right">
              <Label className="text-sm font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="transition-all duration-300 hover:scale-105">
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

          {/* Budget and Dates */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2 animate-slide-in-left">
              <Label htmlFor="budget" className="text-sm font-medium">
                Budget
              </Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="e.g., $50,000"
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="startDate" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="space-y-2 animate-slide-in-right">
              <Label htmlFor="endDate" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>

          {/* Location and Awards */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 animate-slide-in-left">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g., Los Angeles, CA"
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
            <div className="space-y-2 animate-slide-in-right">
              <Label htmlFor="awards" className="text-sm font-medium">
                Awards
              </Label>
              <Input
                id="awards"
                value={formData.awards}
                onChange={(e) => handleInputChange("awards", e.target.value)}
                placeholder="e.g., Best Commercial 2024"
                className="transition-all duration-300 focus:scale-105"
              />
            </div>
          </div>

          {/* Image Management */}
          <div className="space-y-4 animate-fade-in">
            <Label className="text-sm font-medium">Project Images</Label>

            {/* Image Mode Toggle */}
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={imageMode === "upload" ? "default" : "outline"}
                size="sm"
                onClick={() => setImageMode("upload")}
                className="transition-all duration-300 hover:scale-105"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
              <Button
                type="button"
                variant={imageMode === "url" ? "default" : "outline"}
                size="sm"
                onClick={() => setImageMode("url")}
                className="transition-all duration-300 hover:scale-105"
              >
                <Link className="h-4 w-4 mr-2" />
                Image URLs
              </Button>
            </div>

            {/* Image Input */}
            {imageMode === "url" && (
              <div className="flex space-x-2 animate-slide-in-up">
                <Input
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                  className="flex-1 transition-all duration-300 focus:scale-105"
                />
                <Button
                  type="button"
                  onClick={addImageUrl}
                  size="sm"
                  className="transition-all duration-300 hover:scale-110"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}

            {imageMode === "upload" && (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center animate-pulse-border">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-bounce" />
                <p className="text-muted-foreground">Drag and drop images here, or click to browse</p>
                <Input type="file" multiple accept="image/*" className="hidden" />
              </div>
            )}

            {/* Image List */}
            {formData.images.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Added Images:</Label>
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-background rounded-lg animate-slide-in-up"
                    >
                      <span className="text-sm text-foreground truncate flex-1 mr-4">{image}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-6 animate-fade-in">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              <Video className="h-5 w-5 mr-2" />
              Add New Work
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
