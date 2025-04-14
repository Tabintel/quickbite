import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { userId, item, transactionId } = await request.json()

    // Validate input
    if (!userId || !item || !transactionId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        itemId: item.id,
        itemName: item.name,
        itemPrice: item.price,
        itemImage: item.image,
        transactionId,
        status: "completed",
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Get orders error:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
