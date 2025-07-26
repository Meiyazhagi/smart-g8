import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Review from "@/models/Review"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const reviews = await Review.find()
      .populate("user", "name")
      .populate("mechanic", "businessName")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      reviews,
    })
  } catch (error) {
    console.error("Get reviews error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
