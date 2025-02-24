"use client"

import { useCallback } from "react"
import confetti from "canvas-confetti"

export const useConfetti = () => {
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }, [])

  return triggerConfetti
}

