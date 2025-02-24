"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface DonationFormProps {
  onDonate: (donorName: string, amount: number, message: string) => void
  loading: boolean
}

const DonationForm: React.FC<DonationFormProps> = ({ onDonate, loading }) => {
  const [donorName, setDonorName] = useState("")
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount")
      return
    }
    onDonate(donorName, Number(amount), message)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Your Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <Input
              type="number"
              id="amount"
              placeholder="Donation Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              step="0.01"
              className="w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message (optional)
            </label>
            <Textarea
              id="message"
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Processing..." : "Donate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default DonationForm

