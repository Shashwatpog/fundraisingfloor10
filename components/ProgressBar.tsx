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
          {goals.map((goal, index) => (
            <div
              key={goal.amount}
              className="flex flex-col items-center"
              style={{ left: `${(goal.amount / totalGoal) * 100}%` }}
            >
              <span className="text-sm font-bold">${goal.amount}</span>
              <span
                className={`text-xs sm:text-sm ${
                  currentAmount >= goal.amount ? "text-green-600" : "text-muted-foreground"
                }`}
              >
                {goal.label}
              </span>
              {index < goals.length - 1 && <div className="absolute top-[-24px] w-px h-4 bg-gray-300" />}
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

