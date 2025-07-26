import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Mechanic from "@/models/Mechanic"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const mechanic = await Mechanic.findByIdAndUpdate(params.id, { status: "approved" }, { new: true })

    if (!mechanic) {
      return NextResponse.json({ success: false, message: "Mechanic not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      mechanic,
    })
  } catch (error) {
    console.error("Approve mechanic error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
