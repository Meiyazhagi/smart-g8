import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Vehicle from "@/models/Vehicle"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const vehicles = await Vehicle.find({ available: true }).populate("vendor", "name email").sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      vehicles,
    })
  } catch (error) {
    console.error("Get vehicles error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "vendor") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const vehicleData = await request.json()

    const vehicle = await Vehicle.create({
      ...vehicleData,
      vendor: decoded.userId,
    })

    return NextResponse.json({
      success: true,
      vehicle,
    })
  } catch (error) {
    console.error("Create vehicle error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
