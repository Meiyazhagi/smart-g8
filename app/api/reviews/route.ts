import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Review from "@/models/Review"
import Mechanic from "@/models/Mechanic"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const mechanicId = searchParams.get("mechanicId")

    let reviews
    if (mechanicId) {
      reviews = await Review.find({ mechanic: mechanicId, status: "approved" })
        .populate("user", "name")
        .sort({ createdAt: -1 })
    } else {
      reviews = await Review.find()
        .populate("user", "name")
        .populate("mechanic", "businessName")
        .sort({ createdAt: -1 })
    }

    return NextResponse.json({
      success: true,
      reviews,
    })
  } catch (error) {
    console.error("Get reviews error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded || decoded.role !== "user") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { mechanicId, rating, comment } = await request.json()

    const review = await Review.create({
      user: decoded.userId,
      mechanic: mechanicId,
      rating,
      comment,
      status: "pending",
    })

    // Update mechanic's average rating
    const reviews = await Review.find({ mechanic: mechanicId, status: "approved" })
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    await Mechanic.findByIdAndUpdate(mechanicId, { rating: avgRating })

    return NextResponse.json({
      success: true,
      review,
    })
  } catch (error) {
    console.error("Create review error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
