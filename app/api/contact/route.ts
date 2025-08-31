'use server'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Received consultation request:", body)

    // Here you would typically send an email, save to a database, etc.
    // For this example, we'll just simulate a successful response.

    return NextResponse.json({ message: "Consultation request received successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error processing consultation request:", error)
    return NextResponse.json({ message: "Error processing request" }, { status: 500 })
  }
}
