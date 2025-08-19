"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navItems = [
    { name: "Work", href: "/work" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-background/80 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-primary/10 p-1 group-hover:bg-primary/20 transition-all duration-300">
              <Image
                src="/maxteam-logo.png"
                alt="MaxTeam Visual Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="font-serif font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              MaxTeam Visual
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-foreground hover:text-primary transition-all duration-300 font-medium group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a href="/contact">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
              >
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors duration-200 p-2 hover:bg-accent/10 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`h-6 w-6 absolute transition-all duration-300 ${
                  isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`h-6 w-6 absolute transition-all duration-300 ${
                  isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-foreground hover:text-primary transition-all duration-300 font-medium hover:translate-x-2 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: isOpen ? `${index * 100}ms` : "0ms" }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a href="/contact">
                <Button
                  size="sm"
                  className={`bg-primary hover:bg-primary/90 w-fit transform hover:scale-105 transition-all duration-200 ${
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
                >
                  Get Quote
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
