"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Car, MapPin, Star, Shield, Users, Wrench, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        // Redirect based on role
        if (data.user.role === "admin") {
          window.location.href = "/admin/dashboard"
        } else if (data.user.role === "vendor") {
          window.location.href = "/vendor/dashboard"
        } else {
          window.location.href = "/user/dashboard"
        }
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      })
      const data = await response.json()
      if (data.success) {
        alert("Registration successful! Please login.")
      }
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">SmartRental</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Login</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login to SmartRental</DialogTitle>
                    <DialogDescription>Enter your credentials to access your account</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Sign Up</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Account</DialogTitle>
                    <DialogDescription>Join SmartRental today</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                    <select
                      className="w-full p-2 border rounded-md"
                      value={registerForm.role}
                      onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                      <option value="mechanic">Mechanic</option>
                    </select>
                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Rental System with <span className="text-blue-600">GPS Support</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience intelligent vehicle rentals with real-time GPS tracking and emergency mechanic support. Perfect
            for urban and rural areas with 24/7 breakdown assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Renting Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SmartRental?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform combines modern technology with practical solutions for seamless vehicle rentals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>GPS Mechanic Locator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Find verified mechanics instantly using GPS technology, especially useful in rural areas where service
                  is limited.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>Community Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rate and review mechanics to help other users make informed decisions. Build trust through
                  transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Car className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Smart Fleet Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced booking system with real-time vehicle tracking and comprehensive fleet management tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Everyone</h2>
            <p className="text-gray-600">Different portals for different needs</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-10 w-10 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Users</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Browse & book vehicles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Emergency support
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Rate mechanics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Car className="h-10 w-10 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Manage vehicle fleet
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Track bookings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Analytics dashboard
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Wrench className="h-10 w-10 text-orange-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Mechanics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Receive service requests
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Update availability
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Build reputation
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-10 w-10 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    System oversight
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Approve mechanics
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Moderate reviews
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Access Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Try Our Demo</h2>
          <p className="text-xl mb-8 opacity-90">Experience different user roles with our demo accounts</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/user/dashboard">
              <Button variant="secondary" size="lg" className="w-full">
                <Users className="mr-2 h-5 w-5" />
                User Demo
              </Button>
            </Link>
            <Link href="/vendor/dashboard">
              <Button variant="secondary" size="lg" className="w-full">
                <Car className="mr-2 h-5 w-5" />
                Vendor Demo
              </Button>
            </Link>
            <Link href="/admin/dashboard">
              <Button variant="secondary" size="lg" className="w-full">
                <Shield className="mr-2 h-5 w-5" />
                Admin Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-lg font-bold">SmartRental</span>
              </div>
              <p className="text-gray-400">Intelligent vehicle rentals with GPS support and emergency assistance.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>GPS Mechanic Locator</li>
                <li>Real-time Tracking</li>
                <li>Community Reviews</li>
                <li>Emergency Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Business</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Vendor Portal</li>
                <li>Fleet Management</li>
                <li>Analytics Dashboard</li>
                <li>Mechanic Network</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Emergency Hotline</li>
                <li>Documentation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SmartRental. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
