import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AchievementBadges } from "@/components/gamification/AchievementBadges"
import { EasterEgg } from "@/components/gamification/EasterEgg"
import { achievementBadges } from "@/data/badges"
import jest from "jest" // Declare the jest variable

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

describe("AchievementBadges", () => {
  it("renders all badges correctly", () => {
    render(<AchievementBadges badges={achievementBadges} />)

    expect(screen.getByText("100+ Projects")).toBeInTheDocument()
    expect(screen.getByText("10 Countries Served")).toBeInTheDocument()
    expect(screen.getByText("Top Client Satisfaction 95%+")).toBeInTheDocument()
  })

  it("shows unlocked badges without lock overlay", () => {
    const unlockedBadge = achievementBadges.find((b) => b.unlocked)!
    render(<AchievementBadges badges={[unlockedBadge]} />)

    expect(screen.getByText("Unlocked")).toBeInTheDocument()
    expect(screen.queryByRole("img", { name: /lock/i })).not.toBeInTheDocument()
  })

  it("shows progress bar for locked badges with progress", () => {
    const lockedBadgeWithProgress = achievementBadges.find((b) => !b.unlocked && b.progress)!
    render(<AchievementBadges badges={[lockedBadgeWithProgress]} />)

    expect(screen.getByText("Progress")).toBeInTheDocument()
    expect(screen.getByText(`${lockedBadgeWithProgress.progress}%`)).toBeInTheDocument()
  })

  it("has proper accessibility attributes", () => {
    render(<AchievementBadges badges={achievementBadges.slice(0, 1)} />)

    const badge = screen.getByRole("article")
    expect(badge).toHaveAttribute("aria-label", expect.stringContaining("Achievement:"))
  })
})

describe("EasterEgg", () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear()
  })

  it("renders children correctly", () => {
    render(
      <EasterEgg funFact="Test fun fact">
        <div>Test Child</div>
      </EasterEgg>,
    )

    expect(screen.getByText("Test Child")).toBeInTheDocument()
  })

  it("shows fun fact on keyboard trigger", async () => {
    render(
      <EasterEgg funFact="Amazing fun fact!">
        <div>Hover me</div>
      </EasterEgg>,
    )

    fireEvent.keyDown(document, { key: "e", shiftKey: true })

    await waitFor(() => {
      expect(screen.getByText("Fun Fact!")).toBeInTheDocument()
      expect(screen.getByText("Amazing fun fact!")).toBeInTheDocument()
    })
  })

  it("closes fun fact when close button is clicked", async () => {
    render(
      <EasterEgg funFact="Test fact">
        <div>Test</div>
      </EasterEgg>,
    )

    // Trigger easter egg
    fireEvent.keyDown(document, { key: "e", shiftKey: true })

    await waitFor(() => {
      expect(screen.getByText("Fun Fact!")).toBeInTheDocument()
    })

    // Close it
    const closeButton = screen.getByLabelText("Close fun fact")
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByText("Fun Fact!")).not.toBeInTheDocument()
    })
  })

  it("has proper accessibility attributes", () => {
    render(
      <EasterEgg funFact="Test">
        <div>Content</div>
      </EasterEgg>,
    )

    const container = screen.getByRole("button")
    expect(container).toHaveAttribute("tabIndex", "0")
    expect(container).toHaveAttribute("aria-label", expect.stringContaining("easter egg"))
  })
})
