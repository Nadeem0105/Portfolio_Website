"use client"

import { motion } from "framer-motion"
import { useState, useCallback } from "react"
import Preloader from "@/components/ui/preloader"

const DemoOne = () => {
  const [showPreloader, setShowPreloader] = useState(true)

  const handleComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  const handleReplay = useCallback(() => {
    setShowPreloader(true)
  }, [])

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <main className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-4">
        <motion.div
          className="text-center space-y-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-cream font-display">Welcome</h1>
          <p className="text-xl text-on-surface-variant font-sans">
            Your content has loaded successfully. The preloader animation has completed.
          </p>
          <button
            onClick={handleReplay}
            className="px-6 py-3 mt-6 text-base font-medium text-white bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 cursor-pointer font-sans"
          >
            Replay Preloader
          </button>
        </motion.div>
      </main>
    </>
  )
}

export { DemoOne }
