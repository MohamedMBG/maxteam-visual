"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  Calendar,
  User,
  FileText,
  Send,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"

interface ApprovalItem {
  id: string
  projectTitle: string
  client: string
  type: "video" | "concept" | "final_cut" | "color_grade"
  status: "pending" | "approved" | "rejected" | "revision_requested"
  submittedDate: string
  dueDate: string
  reviewer: string
  comments?: string
  revisionCount: number
  priority: "high" | "medium" | "low"
}

const mockApprovals: ApprovalItem[] = [
  {
    id: "1",
    projectTitle: "Luxury Brand Campaign",
    client: "Premium Fashion House",
    type: "final_cut",
    status: "pending",
    submittedDate: "2024-01-15",
    dueDate: "2024-01-18",
    reviewer: "Marie Dubois",
    revisionCount: 2,
    priority: "high",
  },
  {
    id: "2",
    projectTitle: "Tech Innovation Documentary",
    client: "Global Tech Corporation",
    type: "color_grade",
    status: "approved",
    submittedDate: "2024-01-14",
    dueDate: "2024-01-16",
    reviewer: "John Smith",
    comments: "Excellent work on the color grading. The mood perfectly captures our brand essence.",
    revisionCount: 1,
    priority: "medium",
  },
  {
    id: "3",
    projectTitle: "Automotive Excellence",
    client: "Luxury Car Manufacturer",
    type: "concept",
    status: "revision_requested",
    submittedDate: "2024-01-13",
    dueDate: "2024-01-17",
    reviewer: "Sarah Johnson",
    comments:
      "Love the overall direction! Could we explore a more dynamic opening sequence? Also, the music feels a bit too intense for our brand.",
    revisionCount: 0,
    priority: "medium",
  },
  {
    id: "4",
    projectTitle: "Healthcare Innovation",
    client: "Medical Technology Inc",
    type: "video",
    status: "rejected",
    submittedDate: "2024-01-12",
    dueDate: "2024-01-15",
    reviewer: "Dr. Michael Chen",
    comments:
      "The technical accuracy needs improvement. Please consult with our medical team before the next revision.",
    revisionCount: 1,
    priority: "high",
  },
]

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<ApprovalItem[]>(mockApprovals)
  const [selectedApproval, setSelectedApproval] = useState<ApprovalItem | null>(null)
  const [newComment, setNewComment] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "revision_requested":
        return "bg-yellow-500"
      case "pending":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "revision_requested":
        return <RefreshCw className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-green-500 bg-green-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const filteredApprovals =
    filterStatus === "all" ? approvals : approvals.filter((approval) => approval.status === filterStatus)

  const statusCounts = {
    all: approvals.length,
    pending: approvals.filter((a) => a.status === "pending").length,
    approved: approvals.filter((a) => a.status === "approved").length,
    revision_requested: approvals.filter((a) => a.status === "revision_requested").length,
    rejected: approvals.filter((a) => a.status === "rejected").length,
  }

  const updateApprovalStatus = (id: string, status: ApprovalItem["status"], comment?: string) => {
    setApprovals((prev) =>
      prev.map((approval) =>
        approval.id === id ? { ...approval, status, comments: comment || approval.comments } : approval,
      ),
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Client Approvals</h1>
        <p className="text-muted-foreground">Manage client reviews and approval workflows</p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card
            key={status}
            className={`p-4 cursor-pointer transition-all ${filterStatus === status ? "ring-2 ring-primary" : ""}`}
            onClick={() => setFilterStatus(status)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground capitalize">{status.replace("_", " ")}</p>
                <p className="text-2xl font-bold text-foreground">{count}</p>
              </div>
              <div className={`p-2 rounded-full ${getStatusColor(status)}`}>{getStatusIcon(status)}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Approvals List */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-card border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {filterStatus === "all" ? "All Approvals" : `${filterStatus.replace("_", " ")} Approvals`}
              </h2>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-4">
              {filteredApprovals.map((approval) => (
                <div
                  key={approval.id}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:bg-muted/50 ${getPriorityColor(
                    approval.priority,
                  )} ${selectedApproval?.id === approval.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedApproval(approval)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-foreground">{approval.projectTitle}</h3>
                        <Badge variant="outline" className="text-xs">
                          {approval.type.replace("_", " ")}
                        </Badge>
                        {approval.revisionCount > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Rev {approval.revisionCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{approval.client}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Due: {approval.dueDate}
                        </div>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {approval.reviewer}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={`${getStatusColor(approval.status)} text-white border-transparent`}
                      >
                        {getStatusIcon(approval.status)}
                        <span className="ml-1 capitalize">{approval.status.replace("_", " ")}</span>
                      </Badge>
                    </div>
                  </div>
                  {approval.comments && (
                    <div className="mt-3 p-3 bg-background rounded border">
                      <p className="text-sm text-foreground">{approval.comments}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Approval Details */}
        <div>
          {selectedApproval ? (
            <Card className="p-6 bg-card border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{selectedApproval.projectTitle}</h3>
                  <p className="text-muted-foreground">{selectedApproval.client}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge
                      variant="outline"
                      className={`${getStatusColor(selectedApproval.status)} text-white border-transparent`}
                    >
                      {getStatusIcon(selectedApproval.status)}
                      <span className="ml-1 capitalize">{selectedApproval.status.replace("_", " ")}</span>
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm font-medium capitalize">{selectedApproval.type.replace("_", " ")}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reviewer</span>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {selectedApproval.reviewer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{selectedApproval.reviewer}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Due Date</span>
                    <span className="text-sm font-medium">{selectedApproval.dueDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Revisions</span>
                    <span className="text-sm font-medium">{selectedApproval.revisionCount}</span>
                  </div>
                </div>

                {selectedApproval.comments && (
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Latest Feedback</h4>
                    <div className="p-3 bg-background rounded border">
                      <p className="text-sm text-foreground">{selectedApproval.comments}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateApprovalStatus(selectedApproval.id, "approved")}
                      disabled={selectedApproval.status === "approved"}
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateApprovalStatus(selectedApproval.id, "rejected")}
                      disabled={selectedApproval.status === "rejected"}
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => updateApprovalStatus(selectedApproval.id, "revision_requested")}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Request Revision
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Add Comment</h4>
                  <Textarea
                    placeholder="Add feedback or notes..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      if (newComment.trim()) {
                        updateApprovalStatus(selectedApproval.id, selectedApproval.status, newComment)
                        setNewComment("")
                      }
                    }}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Add Comment
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Assets</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Eye className="h-3 w-3 mr-2" />
                      Preview Video
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Download className="h-3 w-3 mr-2" />
                      Download Files
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <FileText className="h-3 w-3 mr-2" />
                      View Brief
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 bg-card border-border">
              <div className="text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select an approval item to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
