import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      firstName = "",
      lastName = "",
      email = "",
      phone = "",
      company = "",
      projectType = "",
      budget = "",
      timeline = "",
      location = "",
      message = "",
    } = body || {}

    if (!email || !message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 })
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com"
    const port = Number(process.env.SMTP_PORT || 587)
    const user = process.env.SMTP_USER || "baghdadmohamed.me@gmail.com"
    const pass = process.env.SMTP_PASS || "enxy piut ewpd zhvm"
    const to = process.env.CONTACT_TO || "programmingmb.my@gmail.com"

    if (!host || !user || !pass || !to) {
      return NextResponse.json({ error: "SMTP is not configured" }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: { 
        user: "baghdadmohamed.me@gmail.com", 
        pass: "enxy piut ewpd zhvm"
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    const text = `New contact form submission\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nProject Type: ${projectType}\nBudget: ${budget}\nTimeline: ${timeline}\nLocation: ${location}\n\nMessage:\n${message}`

    await transporter.sendMail({
      from: user,
      to,
      subject: `New Inquiry from ${firstName || ""} ${lastName || ""}`.trim(),
      text,
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Email error:", error)
    return NextResponse.json({ 
      error: "Failed to send message", 
      details: error.message 
    }, { status: 500 })
  }
}


