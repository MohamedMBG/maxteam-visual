"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Producer" | "Editor" | "Sales"
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

// Mock authentication - in real app this would connect to your auth service
const mockUsers: Record<string, User> = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@maxteamvisual.com",
    role: "Admin",
    permissions: ["*"], // Admin has all permissions
  },
  "producer@maxteamvisual.com": {
    id: "2",
    name: "Nour el houda",
    email: "producer@maxteamvisual.com",
    role: "Producer",
    permissions: ["projects.read", "projects.write", "team.read", "analytics.read"],
  },
  "editor@maxteamvisual.com": {
    id: "3",
    name: "Mehdi Bouchbib",
    email: "editor@maxteamvisual.com",
    role: "Editor",
    permissions: ["projects.read", "media.read", "media.write"],
  },
}

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("admin_token")
    if (token) {
      // In real app, validate token with server
      const userData = localStorage.getItem("admin_user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } else {
      router.push("/admin/login")
    }
    setLoading(false)
  }, [router])

  const login = async (email: string, password: string): Promise<boolean> => {
    if ((email === "admin" && password === "admin") || (email === "admin@maxteamvisual.com" && password === "admin")) {
      const user = mockUsers["admin"]
      localStorage.setItem("admin_token", "mock_token")
      localStorage.setItem("admin_user", JSON.stringify(user))
      setUser(user)
      return true
    }

    // Keep existing logic for other users
    const user = mockUsers[email]
    if (user && password.includes("123")) {
      localStorage.setItem("admin_token", "mock_token")
      localStorage.setItem("admin_user", JSON.stringify(user))
      setUser(user)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    setUser(null)
    router.push("/admin/login")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes("*") || user.permissions.includes(permission)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to login
  }

  return <>{children}</>
}
