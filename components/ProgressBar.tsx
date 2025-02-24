"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Goal {
  amount: number
  label: string
}

interface ProgressBarProps {
  currentAmount: number
  goals: Goal[]
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentAmount, goals }) => {
  const totalGoal = goals[goals.length - 1].amount
  const progress = Math.min((currentAmount / totalGoal) * 100, 100)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <Progress value={progress} className="w-full h-4" />

        <div className="flex justify-between mt-2">
          {goals.map((goal) => (
            <div key={goal.amount} className="flex flex-col items-center">
              <span className="text-sm font-bold flex items-center gap-1">
                ${goal.amount} {currentAmount >= goal.amount && <span>✅</span>}
              </span>
              <span
                className={`text-xs sm:text-sm ${
                  currentAmount >= goal.amount ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                {goal.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center mt-6 text-base sm:text-lg font-semibold">
          ${currentAmount.toLocaleString()} raised of ${totalGoal.toLocaleString()} goal
        </p>
      </CardContent>
    </Card>
  )
}

export default ProgressBar
