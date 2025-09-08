"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Video, LogOut, Menu, X, User, Plus, Edit } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Suspense } from "react"

const navigation = [
  { name: "Add New Work", href: "/admin", icon: Plus },
  { name: "Manage Works", href: "/admin/manage", icon: Edit },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const loggedIn =
      typeof window !== "undefined" &&
      localStorage.getItem("adminLoggedIn") === "true"
    if (!loggedIn && pathname !== "/admin/login") {
      router.replace("/admin/login")
    }
  }, [pathname, router])

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  const user = {
    name: "Admin",
    role: "Content Manager",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <Suspense fallback={<div>Loading...</div>}>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="font-serif font-bold text-lg text-foreground">Work Manager</h2>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="p-4 space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        )}
      </Suspense>

      {/* Desktop sidebar */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 lg:bg-card lg:border-r lg:border-border lg:block">
          <div className="p-4 border-b border-border">
            <h2 className="font-serif font-bold text-lg text-foreground">MaxTeam Works</h2>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </Suspense>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top header */}
        <header className="bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">Work Management</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-foreground">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.role}</div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                >
                  <Link
                    href="/admin/logout"
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
