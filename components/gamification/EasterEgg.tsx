"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"

interface EasterEggProps {
  funFact: string
  children: React.ReactNode
  className?: string
}

export function EasterEgg({ funFact, children, className = "" }: EasterEggProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [hasSeenConfetti, setHasSeenConfetti] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user has seen confetti this session
    const confettiSeen = sessionStorage.getItem("maxteam-confetti-seen")
    setHasSeenConfetti(!!confettiSeen)

    // Keyboard listener for Shift+E
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "e") {
        triggerEasterEgg()
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const triggerEasterEgg = () => {
    setIsRevealed(true)

    if (!hasSeenConfetti) {
      setShowConfetti(true)
      setHasSeenConfetti(true)
      sessionStorage.setItem("maxteam-confetti-seen", "true")

      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      triggerEasterEgg()
    }, 2000)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  const handleClose = () => {
    setIsRevealed(false)
  }

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-primary rounded-full"
      initial={{
        x: 0,
        y: 0,
        scale: 0,
        rotate: 0,
      }}
      animate={{
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        scale: [0, 1, 0],
        rotate: Math.random() * 360,
      }}
      transition={{
        duration: 2,
        ease: "easeOut",
        delay: Math.random() * 0.5,
      }}
      style={{
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      }}
    />
  ))

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label="Hidden easter egg - hover for 2 seconds or press Shift+E"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          triggerEasterEgg()
        }
      }}
    >
      {children}

      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {confettiParticles}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Fun Fact Tooltip */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50"
          >
            <div className="bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
              <div className="flex items-start space-x-2">
                <Sparkles className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-foreground font-medium mb-1">Fun Fact!</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{funFact}</p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground text-xs ml-2"
                  aria-label="Close fun fact"
                >
                  ×
                </button>
              </div>

              {/* Tooltip arrow */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-background border-l border-t border-border rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
