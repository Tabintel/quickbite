"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Order {
  id: string | number
  item: {
    id: string
    name: string
    price: number
    image: string
  }
  date: string
  status: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }

    // In a real app, you would fetch this from your backend
    // For demo purposes, we'll use local storage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrders(savedOrders)
  }, [user, isLoading, router])

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-600">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || "User"}!</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push("/menu")}>
          Order Food
        </Button>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="mb-6">
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>View your order history and status</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                    <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => router.push("/menu")}>
                      Browse Menu
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden">
                            <img
                              src={order.item.image || "/placeholder.svg"}
                              alt={order.item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{order.item.name}</h3>
                            <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                            <div className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              {order.status}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">₦{order.item.price.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Order #{String(order.id).slice(0, 8)}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs mt-1 h-7 px-2 text-orange-600"
                            onClick={() => viewOrderDetails(order)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p>{user?.name || "Demo User"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p>{user?.email || "user@example.com"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Complete information about your order</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-md overflow-hidden">
                  <img
                    src={selectedOrder.item.image || "/placeholder.svg"}
                    alt={selectedOrder.item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{selectedOrder.item.name}</h3>
                  <p className="font-bold text-orange-600">₦{selectedOrder.item.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Order ID:</p>
                  <p className="text-sm">{String(selectedOrder.id).slice(0, 12)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Date:</p>
                  <p className="text-sm">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Time:</p>
                  <p className="text-sm">{new Date(selectedOrder.date).toLocaleTimeString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Status:</p>
                  <p className="text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {selectedOrder.status}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Payment Method:</p>
                  <p className="text-sm">Flutterwave</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Delivery Address:</p>
                  <p className="text-sm">123 Demo Street, City</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Subtotal:</p>
                  <p className="text-sm">₦{selectedOrder.item.price.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Delivery Fee:</p>
                  <p className="text-sm">₦500</p>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <p>Total:</p>
                  <p>₦{(selectedOrder.item.price + 500).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
