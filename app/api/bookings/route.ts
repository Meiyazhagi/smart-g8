import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/mongodb"
import Booking from "@/models/Booking"
import Vehicle from "@/models/Vehicle"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const token = request.headers.get("authorization")?.replace("Bearer ", "")
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    let bookings
    if (decoded.role === "user") {
      bookings = await Booking.find({ user: decoded.userId })
        .populate("vehicle", "name type price")
        .populate("vendor", "name email")
        .sort({ createdAt: -1 })
    } else if (decoded.role === "vendor") {
      bookings = await Booking.find({ vendor: decoded.userId })
        .populate("vehicle", "name type price")
        .populate("user", "name email")
        .sort({ createdAt: -1 })
    } else {
      bookings = await Booking.find()
        .populate("vehicle", "name type price")
        .populate("user", "name email")
        .populate("vendor", "name email")
        .sort({ createdAt: -1 })
    }

    return NextResponse.json({
      success: true,
      bookings,
    })
  } catch (error) {
    console.error("Get bookings error:", error)
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

    const { vehicleId, startDate, endDate, pickupLocation } = await request.json()

    // Check vehicle availability
    const vehicle = await Vehicle.findById(vehicleId)
    if (!vehicle || !vehicle.available) {
      return NextResponse.json({ success: false, message: "Vehicle not available" }, { status: 400 })
    }

    // Calculate total price
    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = days * vehicle.price

    const booking = await Booking.create({
      user: decoded.userId,
      vehicle: vehicleId,
      vendor: vehicle.vendor,
      startDate,
      endDate,
      pickupLocation,
      totalPrice,
      status: "confirmed",
    })

    // Update vehicle availability
    await Vehicle.findByIdAndUpdate(vehicleId, { available: false })

    return NextResponse.json({
      success: true,
      booking,
    })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
