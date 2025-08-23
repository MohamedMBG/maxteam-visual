import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

interface Work {
  id: number
  title: string
  client: string
  description: string
  category: string
  status: string
  budget?: string
  startDate?: string
  endDate?: string
  location?: string
  awards?: string
  images: string[]
}

const WORKS_PATH = path.join(process.cwd(), "data", "works.json")

async function readWorks(): Promise<Work[]> {
  try {
    const data = await fs.readFile(WORKS_PATH, "utf8")
    return JSON.parse(data || "[]") as Work[]
  } catch (err: any) {
    if (err?.code === "ENOENT") {
      await fs.mkdir(path.dirname(WORKS_PATH), { recursive: true })
      await fs.writeFile(WORKS_PATH, "[]", "utf8")
      return []
    }
    throw err
  }
}

async function writeWorks(works: Work[]): Promise<void> {
  await fs.writeFile(WORKS_PATH, JSON.stringify(works, null, 2), "utf8")
}

export async function GET() {
  try {
    const works = await readWorks()
    return NextResponse.json(works)
  } catch (error) {
    return NextResponse.json({ error: "Failed to load works" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const required = ["title", "client", "description", "category", "status"]
    for (const key of required) {
      if (!body?.[key]) {
        return NextResponse.json({ error: `Missing field: ${key}` }, { status: 400 })
      }
    }

    const works = await readWorks()
    const nextId = works.length > 0 ? Math.max(...works.map((w) => w.id)) + 1 : 1

    const newWork: Work = {
      id: nextId,
      title: String(body.title),
      client: String(body.client),
      description: String(body.description),
      category: String(body.category),
      status: String(body.status),
      budget: body.budget ? String(body.budget) : undefined,
      startDate: body.startDate ? String(body.startDate) : undefined,
      endDate: body.endDate ? String(body.endDate) : undefined,
      location: body.location ? String(body.location) : undefined,
      awards: body.awards ? String(body.awards) : undefined,
      images: Array.isArray(body.images) ? body.images.map(String) : [],
    }

    works.push(newWork)
    await writeWorks(works)
    return NextResponse.json(newWork, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create work" }, { status: 500 })
  }
}


