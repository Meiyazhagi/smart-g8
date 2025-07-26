"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Car,
  MapPin,
  Phone,
  Star,
  Calendar,
  AlertTriangle,
  Navigation,
  User,
  Settings,
  LogOut,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [nearbyMechanics, setNearbyMechanics] = useState([])
  const [vehicles, setVehicles] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          fetchNearbyMechanics(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/vehicles")
      const data = await response.json()
      if (data.success) {
        setVehicles(data.vehicles)
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    }
  }

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error("Error fetching bookings:", error)
    }
  }

  const fetchNearbyMechanics = async (lat: number, lng: number) => {
    try {
      const response = await fetch(`/api/mechanics?lat=${lat}&lng=${lng}&radius=10`)
      const data = await response.json()
      if (data.success) {
        setNearbyMechanics(data.mechanics)
      }
    } catch (error) {
      console.error("Error fetching mechanics:", error)
    }
  }

  const handleBookVehicle = async (vehicleId: string, bookingData: any) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicleId,
          ...bookingData,
        }),
      })
      const data = await response.json()
      if (data.success) {
        alert("Booking confirmed!")
        fetchBookings()
        fetchVehicles()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Error booking vehicle:", error)
    }
  }

  useEffect(() => {
    getCurrentLocation()
    fetchVehicles()
    fetchBookings()
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SmartRental</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">Manage your rentals and get emergency support</p>
        </div>

        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vehicles">Browse Vehicles</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="support">Emergency Support</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          </TabsList>

          {/* Browse Vehicles */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search vehicles..." className="w-full" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle: any) => (
                <Card key={vehicle._id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={vehicle.images?.[0] || "/placeholder.svg?height=200&width=300"}
                      alt={vehicle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                        <CardDescription>{vehicle.type}</CardDescription>
                      </div>
                      <Badge variant={vehicle.available ? "default" : "secondary"}>
                        {vehicle.available ? "Available" : "Booked"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {vehicle.features?.map((feature: string) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">${vehicle.price}/day</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button disabled={!vehicle.available}>
                            {vehicle.available ? "Book Now" : "Unavailable"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Book {vehicle.name}</DialogTitle>
                            <DialogDescription>Select your rental dates and confirm booking</DialogDescription>
                          </DialogHeader>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault()
                              const formData = new FormData(e.target as HTMLFormElement)
                              handleBookVehicle(vehicle._id, {
                                startDate: formData.get("startDate"),
                                endDate: formData.get("endDate"),
                                pickupLocation: formData.get("pickupLocation"),
                              })
                            }}
                            className="space-y-4"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Start Date</label>
                                <Input name="startDate" type="date" required />
                              </div>
                              <div>
                                <label className="text-sm font-medium">End Date</label>
                                <Input name="endDate" type="date" required />
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Pickup Location</label>
                              <Input name="pickupLocation" placeholder="Enter pickup address" required />
                            </div>
                            <Button type="submit" className="w-full">
                              Confirm Booking
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Bookings */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="grid gap-4">
              {bookings.map((booking: any) => (
                <Card key={booking._id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{booking.vehicle?.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.startDate).toLocaleDateString()} to{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                          <span className="font-semibold">${booking.totalPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={booking.status === "active" ? "default" : "secondary"}>{booking.status}</Badge>
                        {booking.status === "active" && (
                          <Button size="sm" variant="outline">
                            Track Vehicle
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Emergency Support */}
          <TabsContent value="support" className="space-y-6">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-700">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Support
                </CardTitle>
                <CardDescription>Need immediate assistance? Find nearby mechanics and get help fast.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={getCurrentLocation} className="bg-red-600 hover:bg-red-700">
                    <Navigation className="h-4 w-4 mr-2" />
                    Find Nearby Mechanics
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Emergency Hotline
                  </Button>
                </div>
              </CardContent>
            </Card>

            {currentLocation && nearbyMechanics.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Nearby Mechanics</h3>
                <div className="grid gap-4">
                  {nearbyMechanics.map((mechanic: any) => (
                    <Card key={mechanic._id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{mechanic.businessName}</h4>
                              <Badge variant={mechanic.available ? "default" : "secondary"}>
                                {mechanic.available ? "Available" : "Busy"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {mechanic.rating} ({mechanic.reviewCount} reviews)
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {mechanic.address}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {mechanic.services?.map((service: string) => (
                                <Badge key={service} variant="outline" className="text-xs">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Call Now
                            </Button>
                            <Button size="sm" variant="outline">
                              <MapPin className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* My Reviews */}
          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rate Your Recent Service</CardTitle>
                <CardDescription>Help other users by sharing your experience with mechanics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Mechanic</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mechanic to review" />
                    </SelectTrigger>
                    <SelectContent>
                      {nearbyMechanics.map((mechanic: any) => (
                        <SelectItem key={mechanic._id} value={mechanic._id}>
                          {mechanic.businessName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Rating</label>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 cursor-pointer hover:fill-yellow-400 hover:text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Review</label>
                  <Textarea placeholder="Share your experience..." />
                </div>
                <Button>Submit Review</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
