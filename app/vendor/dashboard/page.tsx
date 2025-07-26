"use client"

import { useState } from "react"
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
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: "Toyota Camry 2023",
      type: "Sedan",
      price: 45,
      status: "Available",
      bookings: 12,
      revenue: 540,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Honda CR-V 2023",
      type: "SUV",
      price: 65,
      status: "Rented",
      bookings: 8,
      revenue: 520,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const [bookings] = useState([
    {
      id: 1,
      vehicle: "Toyota Camry 2023",
      customer: "John Doe",
      startDate: "2024-01-15",
      endDate: "2024-01-18",
      status: "Active",
      total: 135,
      phone: "+1234567890",
    },
    {
      id: 2,
      vehicle: "Honda CR-V 2023",
      customer: "Jane Smith",
      startDate: "2024-01-10",
      endDate: "2024-01-12",
      status: "Completed",
      total: 130,
      phone: "+1234567891",
    },
  ])

  const [newVehicle, setNewVehicle] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    features: "",
  })

  const totalRevenue = vehicles.reduce((sum, vehicle) => sum + vehicle.revenue, 0)
  const totalBookings = vehicles.reduce((sum, vehicle) => sum + vehicle.bookings, 0)
  const averageRating = vehicles.reduce((sum, vehicle) => sum + vehicle.rating, 0) / vehicles.length

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Mike!</h2>
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
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="vehicle-name">Vehicle Name</Label>
                      <Input
                        id="vehicle-name"
                        placeholder="e.g., Toyota Camry 2023"
                        value={newVehicle.name}
                        onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                      />
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
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="vehicle-price">Daily Price ($)</Label>
                      <Input
                        id="vehicle-price"
                        type="number"
                        placeholder="45"
                        value={newVehicle.price}
                        onChange={(e) => setNewVehicle({ ...newVehicle, price: e.target.value })}
                      />
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
                    <Button className="w-full">Add Vehicle</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <div className="aspect-video bg-gray-200">
                    <img
                      src={vehicle.image || "/placeholder.svg"}
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
                      <Badge variant={vehicle.status === "Available" ? "default" : "secondary"}>{vehicle.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span>Daily Rate:</span>
                        <span className="font-semibold">${vehicle.price}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Bookings:</span>
                        <span className="font-semibold">{vehicle.bookings}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Revenue:</span>
                        <span className="font-semibold text-green-600">${vehicle.revenue}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Rating:</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {vehicle.rating}
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
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{booking.vehicle}</h4>
                        <p className="text-gray-600">Customer: {booking.customer}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.startDate} to {booking.endDate}
                          </span>
                          <span className="font-semibold text-green-600">${booking.total}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={booking.status === "Active" ? "default" : "secondary"}>{booking.status}</Badge>
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
                      <span className="font-semibold">15 bookings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month:</span>
                      <span className="font-semibold">12 bookings</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth:</span>
                      <span className="font-semibold text-green-600">+25%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vehicle Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{vehicle.name}</h4>
                        <p className="text-sm text-gray-600">{vehicle.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${vehicle.revenue}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{vehicle.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
