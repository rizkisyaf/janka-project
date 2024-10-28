import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Coffee, CloudRain, Shield, Zap } from 'lucide-react'

export default function JankaStory() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg?height=40&width=40" alt="Janka Logo" className="h-10 w-10" />
            <span className="text-xl font-bold">Janka</span>
          </div>
          <Button>Get Started</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">The Janka Story</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            How a simple cafe experience led to a revolutionary blockchain-based insurance platform
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">The Spark</h2>
            <p className="text-lg mb-4">
              Three years ago, as a cafe owner, I experienced firsthand how unexpected events like bad weather could significantly impact daily revenue. Despite services like Gojek, my business suffered.
            </p>
            <p className="text-lg">
              This experience wasn't unique. Many customers shared similar stories of how unpredictable events affected their livelihoods, and traditional insurance couldn't adequately cover these scenarios.
            </p>
          </div>
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <Coffee className="h-16 w-16 mb-4 text-primary" />
              <CardTitle className="text-2xl mb-2">The Cafe Experience</CardTitle>
              <p className="text-center">A simple cafe became the birthplace of a revolutionary idea in insurance.</p>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <Card>
            <CardContent className="flex flex-col items-center p-6">
              <CloudRain className="h-16 w-16 mb-4 text-primary" />
              <CardTitle className="text-2xl mb-2">Weather Woes</CardTitle>
              <p className="text-center">Bad weather highlighted the need for more flexible, event-based insurance options.</p>
            </CardContent>
          </Card>
          <div>
            <h2 className="text-3xl font-bold mb-4">The Problem</h2>
            <p className="text-lg mb-4">
              Traditional insurance often falls short in covering specific, short-term risks that businesses face daily. Weather changes, local events, or sudden market shifts can all have immediate impacts that aren't typically insured.
            </p>
            <p className="text-lg">
              Moreover, the insurance industry itself seemed stuck in old ways, not leveraging modern technology to provide more responsive and tailored solutions.
            </p>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The Janka Solution</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Janka was born from these experiences and observations. Our platform leverages blockchain technology to offer:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Shield className="h-12 w-12 mb-4 text-primary" />
                <CardTitle className="text-xl mb-2">Event-Based Coverage</CardTitle>
                <p>Protect your business against specific, short-term risks with customizable smart contracts.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Zap className="h-12 w-12 mb-4 text-primary" />
                <CardTitle className="text-xl mb-2">Instant Payouts</CardTitle>
                <p>Automated, blockchain-powered payouts ensure you receive compensation without delays.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">The Journey Ahead</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            After three years of ideation and development, Janka is ready to revolutionize the way businesses protect themselves against unexpected events. We're excited to bring this solution to you and continue innovating in the insurance space.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground">
            Join the Revolution <ArrowRight className="ml-2" />
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Janka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}