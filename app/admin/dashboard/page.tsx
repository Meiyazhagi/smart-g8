"use client"

import { useState, useEffect } from "react"
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
  const [users, setUsers] = useState([])
  const [mechanics, setMechanics] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalMechanics: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    activeRentals: 0,
  })

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setUsers(data.users)
      }
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/mechanics", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setMechanics(data.mechanics)
      }
    } catch (error) {
      console.error("Error fetching mechanics:", error)
    }
  }

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/admin/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error("Error fetching reviews:", error)
    }
  }

  const approveMechanic = async (mechanicId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/mechanics/${mechanicId}/approve`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        fetchMechanics()
      }
    } catch (error) {
      console.error("Error approving mechanic:", error)
    }
  }

  const rejectMechanic = async (mechanicId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/admin/mechanics/${mechanicId}/reject`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        fetchMechanics()
      }
    } catch (error) {
      console.error("Error rejecting mechanic:", error)
    }
  }

  useEffect(() => {
    fetchUsers()
    fetchMechanics()
    fetchReviews()
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
                  <p className="text-xl font-bold text-blue-600">{users.length}</p>
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
                  <p className="text-xl font-bold text-green-600">
                    {users.filter((u: any) => u.role === "vendor").length}
                  </p>
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
                  <p className="text-xl font-bold text-orange-600">{mechanics.length}</p>
                </div>
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Reviews</p>
                  <p className="text-xl font-bold text-purple-600">{reviews.length}</p>
                </div>
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Pending</p>
                  <p className="text-xl font-bold text-yellow-600">
                    {mechanics.filter((m: any) => m.status === "pending").length}
                  </p>
                </div>
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Approved</p>
                  <p className="text-xl font-bold text-green-600">
                    {mechanics.filter((m: any) => m.status === "approved").length}
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-600" />
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
              {mechanics.map((mechanic: any) => (
                <Card key={mechanic._id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{mechanic.businessName}</h4>
                          <Badge
                            variant={
                              mechanic.status === "approved"
                                ? "default"
                                : mechanic.status === "pending"
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
                              <strong>Owner:</strong> {mechanic.user?.name}
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
                              <strong>Location:</strong> {mechanic.address}
                            </p>
                            <p>
                              <strong>Joined:</strong> {new Date(mechanic.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>
                                {mechanic.rating} ({mechanic.reviewCount} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {mechanic.services?.map((service: string) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {mechanic.status === "pending" && (
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveMechanic(mechanic._id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => rejectMechanic(mechanic._id)}>
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
                      {users.map((user: any) => (
                        <tr key={user._id}>
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
                            <Badge variant={user.isActive ? "default" : "secondary"}>
                              {user.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
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
                  <SelectItem value="pending">Pending Reviews</SelectItem>
                  <SelectItem value="approved">Approved Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4">
              {reviews.map((review: any) => (
                <Card key={review._id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold">{review.mechanic?.businessName}</h4>
                        <p className="text-sm text-gray-600">
                          Reviewed by {review.user?.name} on {new Date(review.createdAt).toLocaleDateString()}
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
                            review.status === "approved"
                              ? "default"
                              : review.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {review.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">"{review.comment}"</p>
                    {review.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
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
                      <span>Total Users:</span>
                      <span className="font-semibold">{users.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Vendors:</span>
                      <span className="font-semibold">
                        {users.filter((u: any) => u.role === "vendor" && u.isActive).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved Mechanics:</span>
                      <span className="font-semibold">
                        {mechanics.filter((m: any) => m.status === "approved").length}
                      </span>
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
