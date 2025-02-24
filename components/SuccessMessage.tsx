"use client"

import type React from "react"

import { motion } from "framer-motion"

interface SuccessMessageProps {
  message: string
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50"
    >
      {message}
    </motion.div>
  )
}

