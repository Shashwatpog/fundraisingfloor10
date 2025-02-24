"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Donation {
  _id: string
  donorName: string
  amount: number
  message?: string
}

export default function Leaderboard() {
  const [donations, setDonations] = useState<Donation[]>([])

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard")
        const data = await response.json()
        setDonations(data)
      } catch (error) {
        console.error("Error fetching leaderboard data:", error)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <ul className="space-y-4">
          {donations.map((donation, index) => (
            <li key={donation._id} className="border-b last:border-b-0 pb-3 last:pb-0">
              <div className="flex justify-between items-center text-sm sm:text-base mb-1">
                <span className="font-semibold">
                  {index + 1}. {donation.donorName || "Anonymous"}
                </span>
                <span className="font-bold text-primary">${donation.amount.toFixed(2)}</span>
              </div>
              {donation.message && (
                <p className="text-xs sm:text-sm text-muted-foreground italic">"{donation.message}"</p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

