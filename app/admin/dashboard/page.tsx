"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  Car,
  Wrench,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  LogOut,
  Star,
  Eye,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [users] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active", joinDate: "2024-01-10" },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Vendor",
      status: "Active",
      joinDate: "2024-01-05",
    },
  ])

  const [mechanics, setMechanics] = useState([
    {
      id: 1,
      name: "Mike's Auto Repair",
      owner: "Mike Wilson",
      email: "mike@autorepair.com",
      phone: "+1234567890",
      location: "Downtown Area",
      services: ["Engine Repair", "Brake Service", "Oil Change"],
      rating: 4.8,
      reviews: 156,
      status: "Approved",
      joinDate: "2024-01-01",
    },
    {
      id: 2,
      name: "Rural Fix Station",
      owner: "Sarah Brown",
      email: "sarah@ruralfix.com",
      phone: "+1234567891",
      location: "Rural Highway 101",
      services: ["Tire Repair", "Battery Service", "Towing"],
      rating: 4.5,
      reviews: 89,
      status: "Pending",
      joinDate: "2024-01-20",
    },
  ])

  const [reviews] = useState([
    {
      id: 1,
      user: "John Doe",
      mechanic: "Mike's Auto Repair",
      rating: 5,
      comment: "Excellent service! Fixed my car quickly and the price was fair.",
      date: "2024-01-12",
      status: "Approved",
    },
    {
      id: 2,
      user: "Jane Smith",
      mechanic: "Rural Fix Station",
      rating: 1,
      comment: "Terrible service, overcharged me!",
      date: "2024-01-18",
      status: "Flagged",
    },
  ])

  const [systemStats] = useState({
    totalUsers: 1250,
    totalVendors: 45,
    totalMechanics: 89,
    totalBookings: 2340,
    monthlyRevenue: 45600,
    activeRentals: 156,
  })

  const approveMechanic = (mechanicId: number) => {
    setMechanics(
      mechanics.map((mechanic) => (mechanic.id === mechanicId ? { ...mechanic, status: "Approved" } : mechanic)),
    )
  }

  const rejectMechanic = (mechanicId: number) => {
    setMechanics(
      mechanics.map((mechanic) => (mechanic.id === mechanicId ? { ...mechanic, status: "Rejected" } : mechanic)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">System Overview</h2>
          <p className="text-gray-600">Monitor and manage the entire rental platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Users</p>
                  <p className="text-xl font-bold text-blue-600">{systemStats.totalUsers}</p>
                </div>
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Vendors</p>
                  <p className="text-xl font-bold text-green-600">{systemStats.totalVendors}</p>
                </div>
                <Car className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Mechanics</p>
                  <p className="text-xl font-bold text-orange-600">{systemStats.totalMechanics}</p>
                </div>
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total Bookings</p>
                  <p className="text-xl font-bold text-purple-600">{systemStats.totalBookings}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Revenue</p>
                  <p className="text-xl font-bold text-green-600">${systemStats.monthlyRevenue}</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Active Rentals</p>
                  <p className="text-xl font-bold text-blue-600">{systemStats.activeRentals}</p>
                </div>
                <Car className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mechanics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mechanics">Mechanic Approvals</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="reviews">Review Moderation</TabsTrigger>
            <TabsTrigger value="analytics">System Analytics</TabsTrigger>
          </TabsList>

          {/* Mechanic Approvals */}
          <TabsContent value="mechanics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Mechanic Registration Requests</h3>
              <div className="flex gap-2">
                <Input placeholder="Search mechanics..." className="w-64" />
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {mechanics.map((mechanic) => (
                <Card key={mechanic.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{mechanic.name}</h4>
                          <Badge
                            variant={
                              mechanic.status === "Approved"
                                ? "default"
                                : mechanic.status === "Pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {mechanic.status}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <p>
                              <strong>Owner:</strong> {mechanic.owner}
                            </p>
                            <p>
                              <strong>Email:</strong> {mechanic.email}
                            </p>
                            <p>
                              <strong>Phone:</strong> {mechanic.phone}
                            </p>
                          </div>
                          <div>
                            <p>
                              <strong>Location:</strong> {mechanic.location}
                            </p>
                            <p>
                              <strong>Joined:</strong> {mechanic.joinDate}
                            </p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>
                                {mechanic.rating} ({mechanic.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mechanic.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {mechanic.status === "Pending" && (
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveMechanic(mechanic.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectMechanic(mechanic.id)}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">User Management</h3>
              <div className="flex gap-2">
                <Input placeholder="Search users..." className="w-64" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Join Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline">{user.role}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant={user.status === "Active" ? "default" : "secondary"}>{user.status}</Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Review Moderation */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Review Moderation</h3>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="flagged">Flagged Reviews</SelectItem>
                  <SelectItem value="approved">Approved Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{review.mechanic}</h4>
                        <p className="text-sm text-gray-600">
                          Reviewed by {review.user} on {review.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <Badge
                          variant={
                            review.status === "Approved"
                              ? "default"
                              : review.status === "Flagged"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {review.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">"{review.comment}"</p>
                    {review.status === "Flagged" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                        <Button size="sm" variant="outline">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Investigate
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* System Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h3 className="text-xl font-semibold">System Analytics</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Platform Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Growth analytics chart would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Daily Active Users:</span>
                      <span className="font-semibold">450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Active Users:</span>
                      <span className="font-semibold">1,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Active Users:</span>
                      <span className="font-semibold">3,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>User Retention Rate:</span>
                      <span className="font-semibold text-green-600">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Mechanics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mechanics
                      .filter((m) => m.status === "Approved")
                      .map((mechanic) => (
                        <div key={mechanic.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{mechanic.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-600">{mechanic.rating}</span>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{mechanic.reviews} reviews</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Urban Areas:</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Rural Areas:</span>
                      <span className="font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Coverage Growth:</span>
                      <span className="font-semibold text-green-600">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Server Uptime:</span>
                      <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">API Response Time:</span>
                      <Badge className="bg-green-100 text-green-800">120ms</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Error Rate:</span>
                      <Badge className="bg-green-100 text-green-800">0.1%</Badge>
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
