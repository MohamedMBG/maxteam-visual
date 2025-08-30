"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Award,
  Calendar,
  MapPin,
  Users,
  Camera,
  Quote,
  ArrowLeft,
  Download,
  MessageCircle,
  Send,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

// Mock project data - in real app this would come from API/database
const projectData = {
  "luxury-brand-campaign": {
    title: "Luxury Brand Campaign",
    client: "Premium Fashion House",
    category: "Commercial",
    year: "2024",
    location: "Paris, France",
    duration: "2:30",
    awards: ["Cannes Lions Gold", "D&AD Pencil"],
    description:
      "A cinematic journey through craftsmanship and elegance, showcasing the brand's heritage through stunning visuals and compelling storytelling.",
    longDescription:
      "This luxury brand campaign represents the pinnacle of our creative and technical capabilities. Shot over 5 days in Paris, we captured the essence of French craftsmanship through a series of intimate vignettes that showcase both the product and the artisans behind it. The campaign combines traditional cinematography with cutting-edge post-production techniques to create a timeless piece that resonates with the brand's sophisticated audience.",
    objectives: [
      "Elevate brand perception in luxury market",
      "Showcase artisanal craftsmanship",
      "Connect with affluent millennials",
      "Drive awareness for new product line",
    ],
    timeline: "8 weeks from concept to delivery",
    budget: "$150,000 - $200,000",
    team: [
      { name: "Kodiji Mohammed", role: "Director" },
      { name: "Mehdi Bouchbib", role: "Cinematographer" },
      { name: "Nour el houda", role: "Producer" },
      { name: "Elena Vasquez", role: "Art Director" },
    ],
    gear: ["ARRI Alexa LF", "Cooke S7/i Lenses", "Technocrane 30ft", "RED Komodo (B-Camera)", "DJI Ronin 4D"],
    deliverables: ["2:30 Hero Film", "30s TV Spot", "15s Social Cuts", "Behind-the-Scenes", "Photography"],
    testimonial: {
      quote:
        "MaxTeam Visual exceeded our expectations in every way. Their attention to detail and creative vision brought our brand story to life in ways we never imagined possible.",
      author: "Marie Dubois",
      title: "Creative Director, Premium Fashion House",
    },
    videoUrl: "/luxury-campaign-hero.mp4",
    beforeAfterImages: {
      before: "/luxury-before-grading.jpg",
      after: "/luxury-after-grading.jpg",
    },
    shotBreakdown: [
      {
        timestamp: "0:15",
        camera: "ARRI Alexa LF",
        lens: "Cooke S7/i 50mm",
        fps: "24fps",
        lighting: "Natural window light + LED panel fill",
        notes: "Close-up of artisan hands working leather",
      },
      {
        timestamp: "0:45",
        camera: "RED Komodo",
        lens: "Cooke S7/i 85mm",
        fps: "120fps",
        lighting: "3-point LED setup with practical lamps",
        notes: "Slow motion product reveal",
      },
      {
        timestamp: "1:20",
        camera: "ARRI Alexa LF",
        lens: "Cooke S7/i 25mm",
        fps: "24fps",
        lighting: "Technocrane with LED array",
        notes: "Sweeping crane shot of workshop",
      },
    ],
  },
}

interface Comment {
  id: string
  user: { name: string; avatar: string; role: string }
  content: string
  timestamp: string
  replies?: Comment[]
  resolved?: boolean
}

interface CollaborationState {
  activeUsers: Array<{ name: string; avatar: string; status: "viewing" | "editing" }>
  comments: Comment[]
  notifications: Array<{ id: string; message: string; timestamp: string; type: "info" | "success" | "warning" }>
}

// Mock collaboration data
const mockCollaboration: CollaborationState = {
  activeUsers: [
    { name: "Nour el houda", avatar: "SC", status: "viewing" },
    { name: "Kodiji Mohammed", avatar: "MT", status: "editing" },
    { name: "Elena Vasquez", avatar: "EV", status: "viewing" },
  ],
  comments: [
    {
      id: "1",
      user: { name: "Nour el houda", avatar: "SC", role: "Producer" },
      content:
        "The color grading in the 0:45 sequence looks fantastic! The warm tones really enhance the craftsmanship story.",
      timestamp: "2 hours ago",
      resolved: false,
    },
    {
      id: "2",
      user: { name: "Kodiji Mohammed", avatar: "MT", role: "Director" },
      content:
        "Agreed! Should we consider adding a subtle vignette to the crane shot at 1:20 to draw more focus to the center?",
      timestamp: "1 hour ago",
      replies: [
        {
          id: "2-1",
          user: { name: "Mehdi Bouchbib", avatar: "DR", role: "Cinematographer" },
          content: "Good call. I'll adjust that in the next revision.",
          timestamp: "45 minutes ago",
        },
      ],
      resolved: false,
    },
  ],
  notifications: [
    { id: "1", message: "Marcus Thompson updated the color grade", timestamp: "5 minutes ago", type: "info" },
    { id: "2", message: "New comment from Nour el houda", timestamp: "2 hours ago", type: "success" },
  ],
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState([80])
  const [beforeAfterSlider, setBeforeAfterSlider] = useState([50])
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null)

  const [collaboration, setCollaboration] = useState<CollaborationState>(mockCollaboration)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate user activity updates
      setCollaboration((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers.map((user) => ({
          ...user,
          status: Math.random() > 0.7 ? "editing" : "viewing",
        })),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: { name: "You", avatar: "YU", role: "Reviewer" },
      content: newComment,
      timestamp: "Just now",
      resolved: false,
    }

    setCollaboration((prev) => ({
      ...prev,
      comments: [...prev.comments, comment],
      notifications: [
        { id: Date.now().toString(), message: "You added a new comment", timestamp: "Just now", type: "success" },
        ...prev.notifications,
      ],
    }))

    setNewComment("")
  }

  const toggleCommentResolved = (commentId: string) => {
    setCollaboration((prev) => ({
      ...prev,
      comments: prev.comments.map((comment) =>
        comment.id === commentId ? { ...comment, resolved: !comment.resolved } : comment,
      ),
    }))
  }

  const project = projectData[params.slug as keyof typeof projectData]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{collaboration.activeUsers.length} collaborators</span>
            </div>
            <div className="flex -space-x-2">
              {collaboration.activeUsers.map((user, index) => (
                <div key={index} className="relative">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                      user.status === "editing" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowComments(!showComments)} className="relative">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comments ({collaboration.comments.length})
              {collaboration.comments.some((c) => !c.resolved) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {showComments && (
        <div className="fixed right-0 top-32 bottom-0 w-96 bg-background border-l border-border z-30 overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Project Comments</h3>
          </div>

          <div className="p-4 space-y-4">
            {collaboration.comments.map((comment) => (
              <Card key={comment.id} className={`p-4 ${comment.resolved ? "opacity-60" : ""}`}>
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">{comment.user.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{comment.user.role}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCommentResolved(comment.id)}
                          className="h-6 w-6 p-0"
                        >
                          {comment.resolved ? (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          ) : (
                            <AlertCircle className="h-3 w-3 text-yellow-500" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {comment.timestamp}
                      </span>
                    </div>

                    {comment.replies && (
                      <div className="ml-4 space-y-2 border-l-2 border-border pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex items-start space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">{reply.user.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-xs">{reply.user.name}</span>
                                <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                              </div>
                              <p className="text-xs text-foreground mt-1">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{newComment.length}/500 characters</span>
                <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Send className="h-3 w-3 mr-1" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Video Section */}
      <section className={`relative h-screen bg-black ${showComments ? "mr-96" : ""} transition-all duration-300`}>
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            poster={`/abstract-geometric-shapes.png?height=1080&width=1920&query=${project.title} cinematic still`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button
              size="lg"
              className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full w-20 h-20"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
            </Button>
          </div>

          {/* Interactive Hotspots */}
          {project.shotBreakdown.map((shot, index) => (
            <div
              key={index}
              className={`absolute w-4 h-4 bg-primary rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 animate-pulse ${
                index === 0 ? "top-1/3 left-1/4" : index === 1 ? "top-1/2 right-1/3" : "bottom-1/3 left-1/2"
              }`}
              onClick={() => setSelectedHotspot(selectedHotspot === index ? null : index)}
            >
              <div className="absolute top-6 left-0 w-64 bg-background/95 backdrop-blur-sm p-4 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-sm space-y-2">
                  <div className="font-medium text-foreground">{shot.timestamp}</div>
                  <div className="text-muted-foreground">
                    <div>{shot.camera}</div>
                    <div>{shot.lens}</div>
                    <div>{shot.fps}</div>
                    <div className="mt-2 text-xs">{shot.notes}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Video Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center space-x-4 text-white">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <div className="flex-1 bg-white/20 rounded-full h-1">
                <div className="bg-primary h-1 rounded-full" style={{ width: `${(currentTime / 150) * 100}%` }} />
              </div>

              <div className="flex items-center space-x-2">
                <Volume2 className="h-4 w-4" />
                <div className="w-16 bg-white/20 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full" style={{ width: `${volume[0]}%` }} />
                </div>
              </div>

              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Project Title Overlay */}
        <div className="absolute bottom-20 left-6 text-white">
          <h1 className="hero-text text-white mb-2">{project.title}</h1>
          <p className="text-xl text-white/80">{project.client}</p>
        </div>
      </section>

      {/* Project Details */}
      <section className={`py-20 bg-background ${showComments ? "mr-96" : ""} transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" className="mb-8" onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Work
            </Button>

            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Project Overview */}
                <div>
                  <h2 className="text-foreground mb-6">Project Overview</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6">{project.longDescription}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-foreground mb-4">Objectives</h3>
                      <ul className="space-y-2">
                        {project.objectives.map((objective, index) => (
                          <li key={index} className="text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-foreground mb-4">Deliverables</h3>
                      <ul className="space-y-2">
                        {project.deliverables.map((deliverable, index) => (
                          <li key={index} className="text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Before/After Color Grading */}
                <div>
                  <h2 className="text-foreground mb-6">Before/After Color Grading</h2>
                  <Card className="p-6 bg-card border-border">
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                      <img
                        src={`/abstract-geometric-shapes.png?height=400&width=700&query=before color grading raw footage`}
                        alt="Before grading"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ clipPath: `inset(0 ${100 - beforeAfterSlider[0]}% 0 0)` }}
                      />
                      <img
                        src={`/abstract-geometric-shapes.png?height=400&width=700&query=after color grading cinematic look`}
                        alt="After grading"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ clipPath: `inset(0 0 0 ${beforeAfterSlider[0]}%)` }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                        style={{ left: `${beforeAfterSlider[0]}%` }}
                      />
                    </div>
                    <div className="space-y-4">
                      <Slider
                        value={beforeAfterSlider}
                        onValueChange={setBeforeAfterSlider}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Before (Raw Footage)</span>
                        <span>After (Final Grade)</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Shot Breakdown */}
                <div>
                  <h2 className="text-foreground mb-6">Technical Breakdown</h2>
                  <div className="space-y-4">
                    {project.shotBreakdown.map((shot, index) => (
                      <Card key={index} className="p-6 bg-card border-border">
                        <div className="grid md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Timestamp</div>
                            <div className="font-medium text-foreground">{shot.timestamp}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Camera & Lens</div>
                            <div className="font-medium text-foreground">{shot.camera}</div>
                            <div className="text-sm text-muted-foreground">{shot.lens}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Settings</div>
                            <div className="font-medium text-foreground">{shot.fps}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Lighting</div>
                            <div className="text-sm text-foreground">{shot.lighting}</div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="text-sm text-muted-foreground">{shot.notes}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Client Testimonial */}
                <Card className="p-8 bg-primary/5 border-primary/20">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <blockquote className="text-lg text-foreground leading-relaxed mb-6">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">
                        {project.testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{project.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{project.testimonial.title}</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Info */}
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-foreground mb-6">Project Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Year</div>
                        <div className="font-medium text-foreground">{project.year}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-medium text-foreground">{project.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Camera className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="font-medium text-foreground">{project.duration}</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Awards */}
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-foreground mb-4">Awards & Recognition</h3>
                  <div className="space-y-2">
                    {project.awards.map((award) => (
                      <Badge key={award} variant="outline" className="border-primary/30 text-primary">
                        <Award className="h-3 w-3 mr-1" />
                        {award}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Team */}
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-foreground mb-4">Team</h3>
                  <div className="space-y-3">
                    {project.team.map((member, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Users className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium text-foreground">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Equipment */}
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-foreground mb-4">Equipment Used</h3>
                  <div className="space-y-2">
                    {project.gear.map((item, index) => (
                      <div key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                        {item}
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Download Assets */}
                <Card className="p-6 bg-card border-border">
                  <h3 className="text-foreground mb-4">Press Kit</h3>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      High-Res Stills
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Project Brief PDF
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Behind the Scenes
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
