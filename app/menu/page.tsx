"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
import { toast } from "sonner"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"
import { useAuth } from "@/lib/auth-context"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export default function MenuPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [paymentConfig, setPaymentConfig] = useState<any>(null)

  const menuItems: MenuItem[] = [
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

  const handlePayment = useCallback(
    (item: MenuItem) => {
      if (!user) {
        toast.error("Please log in to place an order")
        router.push("/auth/login")
        return
      }

      setSelectedItem(item)
      setIsProcessing(true)

      // Create config with the selected item's price
      const config = {
        public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || "FLWPUBK_TEST-b8bf15c0c8d88321574ccaecee9d1e63-X",
        tx_ref: Date.now().toString(),
        amount: item.price,
        currency: "NGN",
        payment_options: "card,ussd,banktransfer",
        customer: {
          email: user?.email || "user@example.com",
          phone_number: "070XXXXXXXX",
          name: user?.name || "Demo User",
        },
        customizations: {
          title: "QuickBite Food Order",
          description: `Payment for ${item.name}`,
          logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
        },
      }

      setPaymentConfig(config)
    },
    [user, router],
  )

  const handleFlutterPayment = useFlutterwave(paymentConfig)

  const initiatePayment = useCallback(() => {
    if (selectedItem && paymentConfig) {
      handleFlutterPayment({
        callback: (response) => {
          console.log(response)
          closePaymentModal()
          if (response.status === "successful") {
            // Save order to local storage
            const orders = JSON.parse(localStorage.getItem("orders") || "[]")
            orders.push({
              id: String(response.transaction_id || `TX${Date.now()}`), // Ensure ID is a string
              item: selectedItem,
              date: new Date().toISOString(),
              status: "completed",
            })
            localStorage.setItem("orders", JSON.stringify(orders))

            // Redirect to success page
            router.push(
              `/payment/success?item=${selectedItem.id}&tx_id=${response.transaction_id || `TX${Date.now()}`}`,
            )
          } else {
            toast.error("Payment was not completed")
            setIsProcessing(false)
          }
        },
        onClose: () => {
          toast.info("Payment canceled")
          setIsProcessing(false)
        },
      })
    }
  }, [handleFlutterPayment, selectedItem, paymentConfig, router])

  useEffect(() => {
    if (paymentConfig) {
      initiatePayment()
    }
  }, [paymentConfig, initiatePayment])

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8 px-20">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Our Menu</h1>
          <p className="text-gray-600">Select your favorite dish and place your order</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video w-full bg-gray-100">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <span className="font-bold text-orange-600">₦{item.price.toLocaleString()}</span>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  onClick={() => handlePayment(item)}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Order Now"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Toaster position="top-center" />
    </main>
  )
}
