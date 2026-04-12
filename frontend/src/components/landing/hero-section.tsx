"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, X } from "lucide-react"

export function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Modern healthcare facility"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        {/* Glassmorphism Card */}
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-10 sm:p-16 shadow-2xl border border-white/40">
          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-tight tracking-tight text-balance mb-6">
            REMOTE CARE FOR YOUR
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LOVED ONES
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-light tracking-wide mb-4">
            Anytime, Anywhere
          </p>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Monitor health, detect risks, stay connected
          </p>

          {/* Play Button */}
          <button
            onClick={() => setShowVideo(true)}
            className="group relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-10 flex items-center justify-center"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-30 blur-lg group-hover:opacity-50 group-hover:blur-xl transition-all duration-500" />
            
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary p-[3px]">
              <div className="w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-white transition-all duration-300">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 text-primary ml-1 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
              </div>
            </div>
            
            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 animate-ping" />
          </button>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            {/* Placeholder for video - replace with actual video embed */}
            <div className="w-full h-full flex items-center justify-center text-white/60">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Video Player Placeholder</p>
                <p className="text-sm opacity-60">Replace with your demo video</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
