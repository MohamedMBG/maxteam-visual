"use client"

import { motion } from "framer-motion"
import { Lock, Trophy, Star, Target, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export interface AchievementBadge {
  id: string
  icon: "trophy" | "star" | "target" | "award"
  title: string
  description: string
  unlocked: boolean
  progress?: number
}

interface AchievementBadgesProps {
  badges: AchievementBadge[]
  className?: string
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  target: Target,
  award: Award,
}

export function AchievementBadges({ badges, className = "" }: AchievementBadgesProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {badges.map((badge, index) => {
        const IconComponent = iconMap[badge.icon]

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={badge.unlocked ? { scale: 1.02 } : { scale: 1.05 }}
          >
            <Card
              className={`relative p-6 transition-all duration-300 ${
                badge.unlocked
                  ? "bg-gradient-to-br from-background to-card border-primary/20 hover:border-primary/40"
                  : "bg-muted/50 border-muted hover:border-muted-foreground/30"
              }`}
              role="article"
              aria-label={`Achievement: ${badge.title}`}
            >
              {/* Lock overlay for locked badges */}
              {!badge.unlocked && (
                <motion.div
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10"
                  whileHover={{
                    scale: [1, 1.05, 1],
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Lock className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                </motion.div>
              )}

              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    badge.unlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <IconComponent className="h-6 w-6" aria-hidden="true" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold mb-2 ${badge.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                    {badge.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      badge.unlocked ? "text-muted-foreground" : "text-muted-foreground/70"
                    }`}
                  >
                    {badge.description}
                  </p>

                  {/* Progress bar for locked badges with progress */}
                  {!badge.unlocked && badge.progress !== undefined && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <Progress value={badge.progress} className="h-2" aria-label={`Progress: ${badge.progress}%`} />
                    </div>
                  )}

                  {/* Unlocked badge indicator */}
                  {badge.unlocked && (
                    <Badge variant="secondary" className="mt-3 bg-primary/10 text-primary border-primary/20">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
