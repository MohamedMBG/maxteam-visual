"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Upload,
  Search,
  Grid3X3,
  List,
  Play,
  Download,
  Share,
  Trash2,
  MoreHorizontal,
  FileVideo,
  ImageIcon,
  Music,
  File,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface MediaFile {
  id: string
  name: string
  type: "video" | "image" | "audio" | "document"
  size: string
  duration?: string
  resolution?: string
  format: string
  uploadDate: string
  status: "processing" | "ready" | "error"
  progress?: number
  thumbnail: string
  project?: string
  tags: string[]
}

export default function MediaManagementPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  const mediaFiles: MediaFile[] = [
    {
      id: "1",
      name: "luxury-brand-hero-4k.mp4",
      type: "video",
      size: "2.4 GB",
      duration: "2:30",
      resolution: "4K (3840x2160)",
      format: "MP4",
      uploadDate: "2024-01-15",
      status: "ready",
      thumbnail: "/luxury-brand-thumb.jpg",
      project: "Luxury Brand Campaign",
      tags: ["commercial", "4k", "hero"],
    },
    {
      id: "2",
      name: "tech-doc-interview-raw.mov",
      type: "video",
      size: "8.7 GB",
      duration: "45:12",
      resolution: "6K (6144x3456)",
      format: "MOV",
      uploadDate: "2024-01-14",
      status: "processing",
      progress: 65,
      thumbnail: "/tech-doc-thumb.jpg",
      project: "Tech Innovation Documentary",
      tags: ["documentary", "interview", "raw"],
    },
    {
      id: "3",
      name: "automotive-broll-collection.mp4",
      type: "video",
      size: "1.8 GB",
      duration: "8:45",
      resolution: "4K (3840x2160)",
      format: "MP4",
      uploadDate: "2024-01-13",
      status: "ready",
      thumbnail: "/automotive-thumb.jpg",
      project: "Automotive Excellence",
      tags: ["commercial", "broll", "automotive"],
    },
    {
      id: "4",
      name: "brand-logo-animation.mp4",
      type: "video",
      size: "156 MB",
      duration: "0:15",
      resolution: "4K (3840x2160)",
      format: "MP4",
      uploadDate: "2024-01-12",
      status: "error",
      thumbnail: "/logo-animation-thumb.jpg",
      tags: ["animation", "logo", "graphics"],
    },
    {
      id: "5",
      name: "behind-the-scenes-photos.zip",
      type: "image",
      size: "245 MB",
      format: "ZIP",
      uploadDate: "2024-01-11",
      status: "ready",
      thumbnail: "/bts-photos-thumb.jpg",
      project: "Luxury Brand Campaign",
      tags: ["photography", "bts", "stills"],
    },
    {
      id: "6",
      name: "original-soundtrack.wav",
      type: "audio",
      size: "89 MB",
      duration: "3:45",
      format: "WAV",
      uploadDate: "2024-01-10",
      status: "ready",
      thumbnail: "/audio-thumb.jpg",
      project: "Music Video Project",
      tags: ["audio", "soundtrack", "original"],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FileVideo className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <File className="h-4 w-4" />
    }
  }

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Media Library</h1>
          <p className="text-muted-foreground">Manage your video assets, images, and audio files</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      {/* Upload Area */}
      <Card className="p-8 bg-card border-border border-dashed">
        <div className="text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Drag and drop your files here</h3>
          <p className="text-muted-foreground mb-4">Support for MP4, MOV, AVI, JPG, PNG, WAV, MP3 files up to 10GB</p>
          <Button variant="outline">Browse Files</Button>
        </div>
      </Card>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search media files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="File type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="document">Documents</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="ready">Ready</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected Files Actions */}
      {selectedFiles.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedFiles.length} file{selectedFiles.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Media Grid/List */}
      <Tabs value="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Files ({mediaFiles.length})</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mediaFiles.map((file) => (
                <Card
                  key={file.id}
                  className={`group overflow-hidden bg-card border-border hover:border-primary/50 transition-colors cursor-pointer ${
                    selectedFiles.includes(file.id) ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={`/abstract-geometric-shapes.png?height=200&width=300&query=${file.name} media thumbnail`}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="sm" className="bg-primary/90 hover:bg-primary">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-background/80 text-foreground">
                        {file.format}
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">{getStatusIcon(file.status)}</div>
                    {file.duration && (
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary" className="bg-black/80 text-white text-xs">
                          {file.duration}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground truncate flex-1 mr-2">{file.name}</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span>{file.size}</span>
                        <span>{file.uploadDate}</span>
                      </div>
                      {file.resolution && <div>Resolution: {file.resolution}</div>}
                      {file.project && <div>Project: {file.project}</div>}
                    </div>

                    {file.status === "processing" && file.progress && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Processing...</span>
                          <span>{file.progress}%</span>
                        </div>
                        <Progress value={file.progress} className="h-1" />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1 mt-3">
                      {file.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {file.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{file.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card border-border">
              <div className="p-4 border-b border-border">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-1"></div>
                  <div className="col-span-4">Name</div>
                  <div className="col-span-1">Type</div>
                  <div className="col-span-1">Size</div>
                  <div className="col-span-2">Project</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1">Date</div>
                  <div className="col-span-1"></div>
                </div>
              </div>
              <div className="divide-y divide-border">
                {mediaFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
                      selectedFiles.includes(file.id) ? "bg-primary/5" : ""
                    }`}
                    onClick={() => handleFileSelect(file.id)}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-1">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleFileSelect(file.id)}
                          className="rounded border-border"
                        />
                      </div>
                      <div className="col-span-4 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                          {getTypeIcon(file.type)}
                        </div>
                        <div>
                          <div className="font-medium text-foreground truncate">{file.name}</div>
                          {file.duration && <div className="text-xs text-muted-foreground">{file.duration}</div>}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          {file.format}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-sm text-muted-foreground">{file.size}</div>
                      <div className="col-span-2 text-sm text-muted-foreground">{file.project || "—"}</div>
                      <div className="col-span-1 flex items-center space-x-2">
                        {getStatusIcon(file.status)}
                        <span className="text-sm text-muted-foreground capitalize">{file.status}</span>
                      </div>
                      <div className="col-span-1 text-sm text-muted-foreground">{file.uploadDate}</div>
                      <div className="col-span-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Play className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {file.status === "processing" && file.progress && (
                      <div className="mt-2 ml-14">
                        <Progress value={file.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Storage</p>
              <p className="text-2xl font-bold text-foreground">2.4 TB</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <FileVideo className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Video Files</p>
              <p className="text-2xl font-bold text-foreground">1,247</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Play className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Processing</p>
              <p className="text-2xl font-bold text-foreground">8</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-bold text-foreground">7.6 TB</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
