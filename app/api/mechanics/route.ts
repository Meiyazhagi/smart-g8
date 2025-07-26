import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Mechanic from "@/models/Mechanic"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    const radius = searchParams.get("radius") || "10" // km

    let mechanics
    if (lat && lng) {
      // Find mechanics within radius using MongoDB geospatial query
      mechanics = await Mechanic.find({
        status: "approved",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number.parseFloat(lng), Number.parseFloat(lat)],
            },
            $maxDistance: Number.parseFloat(radius) * 1000, // Convert km to meters
          },
        },
      }).populate("user", "name email")
    } else {
      mechanics = await Mechanic.find({ status: "approved" }).populate("user", "name email")
    }

    return NextResponse.json({
      success: true,
      mechanics,
    })
  } catch (error) {
    console.error("Get mechanics error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "mechanic") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const mechanicData = await request.json()

    const mechanic = await Mechanic.create({
      ...mechanicData,
      user: decoded.userId,
      status: "pending",
    })

    return NextResponse.json({
      success: true,
      mechanic,
    })
  } catch (error) {
    console.error("Create mechanic error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
