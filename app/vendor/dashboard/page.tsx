"use client"

import type React from "react"

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
import { Label } from "@/components/ui/label"
import { Car, Plus, Edit, Calendar, DollarSign, TrendingUp, Users, Settings, LogOut, Star, Eye } from "lucide-react"
import Link from "next/link"

export default function VendorDashboard() {
  const [vehicles, setVehicles] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    description: "",
    features: "",
    fuelType: "petrol",
    transmission: "manual",
  })

  const fetchVehicles = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/vehicles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newVehicle,
          features: newVehicle.features.split(",").map((f) => f.trim()),
          year: Number.parseInt(newVehicle.year),
          price: Number.parseFloat(newVehicle.price),
        }),
      })
      const data = await response.json()
      if (data.success) {
        alert("Vehicle added successfully!")
        setNewVehicle({
          name: "",
          type: "",
          brand: "",
          model: "",
          year: "",
          price: "",
          description: "",
          features: "",
          fuelType: "petrol",
          transmission: "manual",
        })
        fetchVehicles()
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Error adding vehicle:", error)
    }
  }

  useEffect(() => {
    fetchVehicles()
    fetchBookings()
    setLoading(false)
  }, [])

  const totalRevenue = bookings.reduce((sum: number, booking: any) => sum + booking.totalPrice, 0)
  const totalBookings = bookings.length
  const averageRating =
    vehicles.reduce((sum: number, vehicle: any) => sum + (vehicle.rating || 0), 0) / vehicles.length || 0

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
              <Car className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">Vendor Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
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
          <p className="text-gray-600">Manage your vehicle fleet and track bookings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-blue-600">{totalBookings}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Vehicles</p>
                  <p className="text-2xl font-bold text-purple-600">{vehicles.length}</p>
                </div>
                <Car className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vehicles">My Vehicles</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* My Vehicles */}
          <TabsContent value="vehicles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Vehicle Fleet</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Vehicle</DialogTitle>
                    <DialogDescription>Add a new vehicle to your rental fleet</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddVehicle} className="space-y-4">
                    <div>
                      <Label htmlFor="vehicle-name">Vehicle Name</Label>
                      <Input
                        id="vehicle-name"
                        placeholder="e.g., Toyota Camry 2023"
                        value={newVehicle.name}
                        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vehicle-brand">Brand</Label>
                        <Input
                          id="vehicle-brand"
                          placeholder="Toyota"
                          value={newVehicle.brand}
                          onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicle-model">Model</Label>
                        <Input
                          id="vehicle-model"
                          placeholder="Camry"
                          value={newVehicle.model}
                          onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vehicle-year">Year</Label>
                        <Input
                          id="vehicle-year"
                          type="number"
                          placeholder="2023"
                          value={newVehicle.year}
                          onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="vehicle-price">Daily Price ($)</Label>
                        <Input
                          id="vehicle-price"
                          type="number"
                          placeholder="45"
                          value={newVehicle.price}
                          onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="vehicle-type">Type</Label>
                      <Select onValueChange={(value) => setNewVehicle({ ...newVehicle, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="hatchback">Hatchback</SelectItem>
                          <SelectItem value="truck">Truck</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="vehicle-description">Description</Label>
                      <Textarea
                        id="vehicle-description"
                        placeholder="Describe your vehicle..."
                        value={newVehicle.description}
                        onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vehicle-features">Features (comma separated)</Label>
                      <Input
                        id="vehicle-features"
                        placeholder="GPS, AC, Bluetooth"
                        value={newVehicle.features}
                        onChange={(e) => setNewVehicle({ ...newVehicle, features: e.target.value })}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Add Vehicle
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle: any) => (
                <Card key={vehicle._id}>
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
                        {vehicle.available ? "Available" : "Rented"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Daily Rate:</span>
                        <span className="font-semibold">${vehicle.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rating:</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {vehicle.rating || 0}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings" className="space-y-6">
            <h3 className="text-xl font-semibold">Recent Bookings</h3>
            <div className="grid gap-4">
              {bookings.map((booking: any) => (
                <Card key={booking._id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{booking.vehicle?.name}</h4>
                        <p className="text-gray-600">Customer: {booking.user?.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(booking.startDate).toLocaleDateString()} to{" "}
                            {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                          <span className="font-semibold text-green-600">${booking.totalPrice}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={booking.status === "active" ? "default" : "secondary"}>{booking.status}</Badge>
                        <Button size="sm" variant="outline">
                          Contact Customer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-xl font-semibold">Performance Analytics</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Revenue Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Revenue chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Booking Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Month:</span>
                      <span className="font-semibold">
                        {bookings.filter((b: any) => new Date(b.createdAt).getMonth() === new Date().getMonth()).length}{" "}
                        bookings
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Revenue:</span>
                      <span className="font-semibold text-green-600">${totalRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Rating:</span>
                      <span className="font-semibold">{averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
