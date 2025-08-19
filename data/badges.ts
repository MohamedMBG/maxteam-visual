import type { AchievementBadge } from "@/components/gamification/AchievementBadges"

export const achievementBadges: AchievementBadge[] = [
  {
    id: "projects-100",
    icon: "trophy",
    title: "100+ Projects",
    description: "Successfully completed over 100 high-quality video productions for clients worldwide.",
    unlocked: true,
  },
  {
    id: "countries-10",
    icon: "target",
    title: "10 Countries Served",
    description: "Expanded our reach to serve clients across 10 different countries and counting.",
    unlocked: true,
  },
  {
    id: "client-satisfaction",
    icon: "star",
    title: "Top Client Satisfaction 95%+",
    description: "Achieve and maintain a client satisfaction rating of 95% or higher.",
    unlocked: false,
    progress: 82,
  },
  {
    id: "awards-25",
    icon: "award",
    title: "25+ Industry Awards",
    description: "Recognition from prestigious industry organizations and film festivals.",
    unlocked: true,
  },
  {
    id: "team-growth",
    icon: "trophy",
    title: "Team of 50+ Professionals",
    description: "Build a diverse team of creative professionals and technical experts.",
    unlocked: false,
    progress: 60,
  },
  {
    id: "revenue-milestone",
    icon: "target",
    title: "$10M Revenue Milestone",
    description: "Reach the significant business milestone of $10 million in annual revenue.",
    unlocked: false,
    progress: 75,
  },
]

export const teamFunFacts = [
  "Marcus once directed a commercial while skydiving - literally!",
  "Sarah speaks 5 languages and has coordinated shoots on every continent.",
  "David's camera collection is worth more than most people's cars.",
]
