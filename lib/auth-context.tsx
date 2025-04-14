"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id?: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (user: User) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<User>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const register = async (name: string, email: string, password: string): Promise<User> => {
    try {
      // In a production app, this would call your API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Registration failed")
      }

      const userData = await response.json()

      // For demo purposes, we'll also log the user in
      await login(userData)

      return userData
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const login = async (userData: User) => {
    // In a real app, you would validate credentials with your backend
    // For demo purposes, we'll just store the user in localStorage
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = async () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
