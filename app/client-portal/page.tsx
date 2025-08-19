"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Clock, Play, Download, MessageSquare, Calendar, RefreshCw, Star, ThumbsUp } from "lucide-react"

interface ClientProject {
  id: string
  title: string
  type: "video" | "concept" | "final_cut" | "color_grade"
  status: "pending_review" | "approved" | "revision_requested" | "in_progress"
  submittedDate: string
  dueDate: string
  description: string
  videoUrl?: string
  thumbnailUrl: string
  revisionCount: number
  feedback?: string
}

const mockClientProjects: ClientProject[] = [
  {
    id: "1",
    title: "Luxury Brand Campaign - Final Cut",
    type: "final_cut",
    status: "pending_review",
    submittedDate: "2024-01-15",
    dueDate: "2024-01-18",
    description: "Final edited version of the luxury brand campaign featuring the artisan craftsmanship story.",
    thumbnailUrl: "/luxury-campaign-thumb.jpg",
    revisionCount: 2,
  },
  {
    id: "2",
    title: "Luxury Brand Campaign - Color Grade",
    type: "color_grade",
    status: "approved",
    submittedDate: "2024-01-10",
    dueDate: "2024-01-14",
    description: "Color graded version with enhanced cinematic look and brand-appropriate mood.",
    thumbnailUrl: "/luxury-campaign-color.jpg",
    revisionCount: 1,
    feedback: "Perfect! The warm tones really bring out the craftsmanship story beautifully.",
  },
  {
    id: "3",
    title: "Luxury Brand Campaign - Initial Concept",
    type: "concept",
    status: "revision_requested",
    submittedDate: "2024-01-05",
    dueDate: "2024-01-08",
    description: "Initial concept and storyboard for the luxury brand campaign.",
    thumbnailUrl: "/luxury-campaign-concept.jpg",
    revisionCount: 0,
    feedback:
      "Love the overall direction! Could we explore a more intimate opening sequence focusing on the artisan's hands?",
  },
]

export default function ClientPortalPage() {
  const [projects, setProjects] = useState<ClientProject[]>(mockClientProjects)
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null)
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "revision_requested":
        return "bg-yellow-500"
      case "pending_review":
        return "bg-blue-500"
      case "in_progress":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "revision_requested":
        return <RefreshCw className="h-4 w-4" />
      case "pending_review":
        return <Clock className="h-4 w-4" />
      case "in_progress":
        return <Play className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleApproval = (projectId: string, approved: boolean, feedback: string, rating?: number) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: approved ? "approved" : "revision_requested",
              feedback: feedback,
            }
          : project,
      ),
    )
    setFeedback("")
    setRating(0)
    setSelectedProject(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Client Review Portal</h1>
              <p className="text-muted-foreground">Premium Fashion House</p>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Marie Dubois</p>
                <p className="text-xs text-muted-foreground">Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Projects</h2>
                <p className="text-muted-foreground mb-6">
                  Review and approve the latest deliverables from MaxTeam Visual
                </p>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="p-6 bg-card border-border">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={`/abstract-geometric-shapes.png?height=120&width=200&query=${project.title} thumbnail`}
                          alt={project.title}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(project.status)} text-white border-transparent`}
                          >
                            {getStatusIcon(project.status)}
                            <span className="ml-1 capitalize">{project.status.replace("_", " ")}</span>
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Submitted: {project.submittedDate}
                            </div>
                            {project.revisionCount > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                Rev {project.revisionCount}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {project.status === "pending_review" && (
                              <>
                                <Button size="sm" variant="outline" onClick={() => setSelectedProject(project)}>
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  Review
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => handleApproval(project.id, true, "Approved without feedback")}
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  Quick Approve
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>

                        {project.feedback && (
                          <div className="mt-4 p-3 bg-background rounded border">
                            <p className="text-sm text-foreground">{project.feedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Review Panel */}
          <div>
            {selectedProject ? (
              <Card className="p-6 bg-card border-border sticky top-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Review: {selectedProject.title}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                  </div>

                  <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                    <img
                      src={`/abstract-geometric-shapes.png?height=200&width=300&query=${selectedProject.title} preview`}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-16 h-16">
                        <Play className="h-6 w-6 ml-1" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Rate this deliverable</h4>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`p-1 ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                        >
                          <Star className="h-5 w-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Your Feedback</h4>
                    <Textarea
                      placeholder="Share your thoughts, suggestions, or approval..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleApproval(selectedProject.id, false, feedback, rating)}
                      disabled={!feedback.trim()}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Request Changes
                    </Button>
                    <Button onClick={() => handleApproval(selectedProject.id, true, feedback || "Approved", rating)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" className="w-full" onClick={() => setSelectedProject(null)}>
                    Close Review
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 bg-card border-border">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-2">Select a project to review</p>
                  <p className="text-sm">Click "Review" on any pending item to get started</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
