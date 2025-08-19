"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Play,
  Eye,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Calendar,
  Download,
} from "lucide-react"

// Mock analytics data
const engagementData = [
  { time: "0:00", viewers: 1000, engagement: 95 },
  { time: "0:30", viewers: 950, engagement: 88 },
  { time: "1:00", viewers: 900, engagement: 82 },
  { time: "1:30", viewers: 820, engagement: 75 },
  { time: "2:00", viewers: 750, engagement: 68 },
  { time: "2:30", viewers: 680, engagement: 60 },
]

const performanceData = [
  { project: "Luxury Brand", views: 45000, completion: 78, engagement: 85, ctr: 12.4 },
  { project: "Tech Documentary", views: 32000, completion: 82, engagement: 90, ctr: 15.2 },
  { project: "Automotive", views: 28000, completion: 75, engagement: 80, ctr: 11.8 },
  { project: "Healthcare", views: 22000, completion: 70, engagement: 75, ctr: 9.6 },
]

const audienceData = [
  { age: "18-24", percentage: 15, color: "#8884d8" },
  { age: "25-34", percentage: 35, color: "#82ca9d" },
  { age: "35-44", percentage: 28, color: "#ffc658" },
  { age: "45-54", percentage: 15, color: "#ff7300" },
  { age: "55+", percentage: 7, color: "#8dd1e1" },
]

const deviceData = [
  { device: "Desktop", sessions: 4500, percentage: 45 },
  { device: "Mobile", sessions: 3800, percentage: 38 },
  { device: "Tablet", sessions: 1700, percentage: 17 },
]

const geographicData = [
  { country: "United States", views: 15000, percentage: 35 },
  { country: "United Kingdom", views: 8500, percentage: 20 },
  { country: "Germany", views: 6800, percentage: 16 },
  { country: "France", views: 5100, percentage: 12 },
  { country: "Canada", views: 3400, percentage: 8 },
  { country: "Others", views: 3900, percentage: 9 },
]

const heatmapData = [
  { x: 20, y: 30, intensity: 0.8, clicks: 45 },
  { x: 60, y: 25, intensity: 0.6, clicks: 32 },
  { x: 80, y: 40, intensity: 0.9, clicks: 67 },
  { x: 40, y: 60, intensity: 0.4, clicks: 18 },
  { x: 70, y: 70, intensity: 0.7, clicks: 41 },
]

export default function AnalyticsPage() {
  const [selectedProject, setSelectedProject] = useState("all")
  const [dateRange, setDateRange] = useState("30d")

  const totalViews = performanceData.reduce((sum, project) => sum + project.views, 0)
  const avgCompletion = performanceData.reduce((sum, project) => sum + project.completion, 0) / performanceData.length
  const avgEngagement = performanceData.reduce((sum, project) => sum + project.engagement, 0) / performanceData.length
  const avgCTR = performanceData.reduce((sum, project) => sum + project.ctr, 0) / performanceData.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Video Analytics</h1>
          <p className="text-muted-foreground">Advanced insights into video performance and audience engagement</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Views</p>
              <p className="text-2xl font-bold text-foreground">{totalViews.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs font-medium text-green-500">+18.2%</span>
              </div>
            </div>
            <Eye className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Completion</p>
              <p className="text-2xl font-bold text-foreground">{avgCompletion.toFixed(1)}%</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs font-medium text-green-500">+5.4%</span>
              </div>
            </div>
            <Play className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
              <p className="text-2xl font-bold text-foreground">{avgEngagement.toFixed(1)}%</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-xs font-medium text-red-500">-2.1%</span>
              </div>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Watch Time</p>
              <p className="text-2xl font-bold text-foreground">2:14</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs font-medium text-green-500">+12.8%</span>
              </div>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Video Engagement Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="viewers" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="engagement" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Drop-off Points</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">0:45 - 1:00</span>
                    <Badge variant="destructive">-15%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">1:30 - 1:45</span>
                    <Badge variant="destructive">-12%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">2:15 - 2:30</span>
                    <Badge variant="destructive">-8%</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Peak Engagement</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">0:15 - 0:30</span>
                    <Badge variant="default">95%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">1:45 - 2:00</span>
                    <Badge variant="default">88%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">2:30 - End</span>
                    <Badge variant="default">82%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Project Performance Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 text-sm font-medium text-muted-foreground">Project</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Views</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Completion</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">Engagement</th>
                    <th className="text-right py-3 text-sm font-medium text-muted-foreground">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map((project, index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="py-4 font-medium text-foreground">{project.project}</td>
                      <td className="py-4 text-right text-foreground">{project.views.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <div className="w-16 h-2 bg-muted rounded-full">
                            <div className="h-2 bg-primary rounded-full" style={{ width: `${project.completion}%` }} />
                          </div>
                          <span className="text-sm text-foreground">{project.completion}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <Badge variant={project.engagement > 80 ? "default" : "secondary"}>{project.engagement}%</Badge>
                      </td>
                      <td className="py-4 text-right text-foreground">{project.ctr}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audience" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Age Demographics</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={audienceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ age, percentage }) => `${age}: ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                  >
                    {audienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Device Usage</h3>
              <div className="space-y-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {device.device === "Desktop" && <Monitor className="h-4 w-4 text-primary" />}
                      {device.device === "Mobile" && <Smartphone className="h-4 w-4 text-primary" />}
                      {device.device === "Tablet" && <Globe className="h-4 w-4 text-primary" />}
                      <span className="text-sm font-medium text-foreground">{device.device}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 h-2 bg-muted rounded-full">
                        <div className="h-2 bg-primary rounded-full" style={{ width: `${device.percentage}%` }} />
                      </div>
                      <span className="text-sm text-foreground w-12 text-right">{device.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Geographic Distribution</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                {geographicData.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{country.country}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">{country.views.toLocaleString()}</span>
                      <Badge variant="outline">{country.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-muted/20 rounded-lg p-4 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Interactive world map would go here</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="heatmap" className="space-y-6">
          <Card className="p-6 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Click Heatmap - Luxury Brand Campaign</h3>
            <div className="relative bg-black rounded-lg aspect-video overflow-hidden">
              <img
                src="/abstract-geometric-shapes.png?height=400&width=700&query=luxury brand campaign video frame"
                alt="Video frame"
                className="w-full h-full object-cover"
              />
              {heatmapData.map((point, index) => (
                <div
                  key={index}
                  className="absolute w-8 h-8 rounded-full cursor-pointer transform -translate-x-4 -translate-y-4 animate-pulse"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    backgroundColor: `rgba(255, 0, 0, ${point.intensity})`,
                  }}
                  title={`${point.clicks} clicks`}
                />
              ))}
              <div className="absolute bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs">
                Red dots indicate click hotspots - intensity shows engagement level
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border">
              <h4 className="font-medium text-foreground mb-3">Most Clicked Areas</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product showcase</span>
                  <span className="text-foreground">67 clicks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Artisan hands</span>
                  <span className="text-foreground">45 clicks</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Brand logo</span>
                  <span className="text-foreground">41 clicks</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h4 className="font-medium text-foreground mb-3">Interaction Rate</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">8.4%</div>
                <p className="text-sm text-muted-foreground">of viewers clicked on video</p>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <h4 className="font-medium text-foreground mb-3">Avg Time to Click</h4>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">1:23</div>
                <p className="text-sm text-muted-foreground">average time before interaction</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 bg-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Live Viewers</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-muted-foreground">Live</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="viewers" stroke="#8884d8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Current Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Viewers</span>
                    <span className="text-lg font-bold text-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Peak Today</span>
                    <span className="text-lg font-bold text-foreground">2,891</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Session</span>
                    <span className="text-lg font-bold text-foreground">3:42</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-card border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Luxury Brand</span>
                    <Badge variant="default">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Tech Documentary</span>
                    <span className="text-sm text-muted-foreground">847 viewers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Automotive</span>
                    <span className="text-sm text-muted-foreground">623 viewers</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
