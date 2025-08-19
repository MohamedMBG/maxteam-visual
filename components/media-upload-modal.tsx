"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X, FileVideo, ImageIcon, Music, File, CheckCircle, AlertCircle } from "lucide-react"

interface UploadFile {
  id: string
  file: File
  name: string
  size: string
  type: "video" | "image" | "audio" | "document"
  progress: number
  status: "uploading" | "processing" | "complete" | "error"
  thumbnail?: string
}

interface MediaUploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MediaUploadModal({ open, onOpenChange }: MediaUploadModalProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [projectId, setProjectId] = useState("")
  const [tags, setTags] = useState("")

  const getFileType = (file: File): "video" | "image" | "audio" | "document" => {
    if (file.type.startsWith("video/")) return "video"
    if (file.type.startsWith("image/")) return "image"
    if (file.type.startsWith("audio/")) return "audio"
    return "document"
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleFiles = (files: FileList) => {
    const newFiles: UploadFile[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: getFileType(file),
      progress: 0,
      status: "uploading",
    }))

    setUploadFiles((prev) => [...prev, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 15, 100)
            const newStatus = newProgress === 100 ? (file.type === "video" ? "processing" : "complete") : file.status

            if (newProgress === 100 && file.type === "video") {
              // Simulate video processing
              setTimeout(() => {
                setUploadFiles((prev2) => prev2.map((f) => (f.id === fileId ? { ...f, status: "complete" } : f)))
              }, 3000)
            }

            return { ...file, progress: newProgress, status: newStatus }
          }
          return file
        }),
      )
    }, 500)

    setTimeout(() => clearInterval(interval), 8000)
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const removeFile = (fileId: string) => {
    setUploadFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FileVideo className="h-5 w-5" />
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "audio":
        return <Music className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Media Files</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Area */}
          <Card
            className={`p-8 border-dashed transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {dragActive ? "Drop files here" : "Drag and drop your files here"}
              </h3>
              <p className="text-muted-foreground mb-4">
                Support for MP4, MOV, AVI, JPG, PNG, WAV, MP3 files up to 10GB
              </p>
              <input
                type="file"
                multiple
                accept="video/*,image/*,audio/*"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>
            </div>
          </Card>

          {/* Upload Settings */}
          {uploadFiles.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project">Project (Optional)</Label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury-brand">Luxury Brand Campaign</SelectItem>
                    <SelectItem value="tech-doc">Tech Innovation Documentary</SelectItem>
                    <SelectItem value="automotive">Automotive Excellence</SelectItem>
                    <SelectItem value="music-video">Music Video Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  placeholder="commercial, 4k, hero"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploadFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Upload Progress</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {uploadFiles.map((file) => (
                  <Card key={file.id} className="p-4 bg-card border-border">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 text-muted-foreground">{getFileIcon(file.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(file.status)}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{file.size}</span>
                          <span className="capitalize">
                            {file.status === "processing" ? "Processing video..." : file.status}
                          </span>
                        </div>
                        {file.status !== "complete" && <Progress value={file.progress} className="h-1" />}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              disabled={uploadFiles.length === 0 || uploadFiles.some((f) => f.status === "uploading")}
            >
              Complete Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
