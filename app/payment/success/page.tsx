"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<{
    item: MenuItem
    id: string
  } | null>(null)
  const [progress, setProgress] = useState(0)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const itemId = searchParams.get("item")
  const txId = searchParams.get("tx_id")

  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // For demo purposes, we'll use local storage and hardcoded data
    const menuItems = [
      {
        id: "jollof-rice",
        name: "Jollof Rice",
        description: "Delicious West African rice dish cooked with tomatoes, peppers, and spices",
        price: 1500,
        image: "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?q=80&w=1974&auto=format&fit=crop",
      },
      {
        id: "beef-burger",
        name: "Beef Burger",
        description: "Juicy beef patty with fresh vegetables and special sauce",
        price: 2000,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
      },
      {
        id: "chicken-suya",
        name: "Chicken Suya",
        description: "Grilled chicken skewers marinated in spicy peanut mix",
        price: 1800,
        image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?q=80&w=2070&auto=format&fit=crop",
      },
    ]

    if (itemId) {
      const item = menuItems.find((item) => item.id === itemId)
      if (item) {
        setOrderDetails({
          item,
          id: txId || "TX" + Math.floor(Math.random() * 1000000),
        })
      }
    }

    // Start progress animation
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        return oldProgress + 4
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [itemId, txId])

  // Redirect to dashboard after progress completes
  useEffect(() => {
    if (progress === 100 && !isRedirecting) {
      setIsRedirecting(true)
      const redirectTimer = setTimeout(() => {
        router.push("/dashboard")
      }, 1500) // Wait 1.5 seconds after progress completes

      return () => clearTimeout(redirectTimer)
    }
  }, [progress, router, isRedirecting])

  if (!orderDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <p>Loading order details...</p>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-orange-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">Payment Successful!</CardTitle>
          <CardDescription>Your order has been placed successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-md overflow-hidden">
              <img
                src={orderDetails.item.image || "/placeholder.svg"}
                alt={orderDetails.item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{orderDetails.item.name}</h3>
              <p className="text-sm text-gray-500">{orderDetails.item.description}</p>
              <p className="font-bold text-orange-600">₦{orderDetails.item.price.toLocaleString()}</p>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-gray-500">
              Transaction ID: <span className="font-medium">{orderDetails.id}</span>
            </p>
            <p className="text-sm text-gray-500">
              Date: <span className="font-medium">{new Date().toLocaleString()}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Your order will be delivered within 30-45 minutes. Thank you for choosing QuickBite!
            </p>
          </div>
          <div className="pt-2">
            <p className="text-sm text-gray-500 mb-2">Redirecting to dashboard{isRedirecting ? "..." : ""}</p>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => router.push("/menu")}>
            Order More Food
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
            View Order History
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
