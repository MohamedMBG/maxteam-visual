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
    return []
  }
}

async function writeWorks(works: Work[]): Promise<void> {
  await fs.writeFile(WORKS_PATH, JSON.stringify(works, null, 2), "utf8")
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id)
    const body = await request.json()
    const works = await readWorks()
    const index = works.findIndex((w) => w.id === id)
    if (index === -1) return NextResponse.json({ error: "Work not found" }, { status: 404 })

    const updated: Work = {
      ...works[index],
      ...body,
      id,
      images: Array.isArray(body.images) ? body.images.map(String) : works[index].images,
    }

    works[index] = updated
    await writeWorks(works)
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update work" }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: { params: { id: string } }) {
  try {
    const id = Number(context.params.id)
    const works = await readWorks()
    const exists = works.some((w) => w.id === id)
    if (!exists) return NextResponse.json({ error: "Work not found" }, { status: 404 })
    const filtered = works.filter((w) => w.id !== id)
    await writeWorks(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete work" }, { status: 500 })
  }
}


