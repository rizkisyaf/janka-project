import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Users } from 'lucide-react'
import Image from 'next/image'

export default function JankaPressKit() {
  const pressReleases = [
    { title: "Janka Launches Revolutionary Blockchain-Based Insurance Platform", date: "2024-03-15", url: "#" },
    { title: "Janka Secures $5M in Seed Funding to Expand Operations", date: "2024-02-01", url: "#" },
    { title: "Janka Partners with Major Weather Data Provider to Enhance Event Predictions", date: "2024-01-10", url: "#" },
  ]

  const mediaAssets = [
    { name: "Janka Logo (PNG)", url: "#", size: "2.5 MB" },
    { name: "Janka Logo (SVG)", url: "#", size: "156 KB" },
    { name: "Founder Headshot", url: "#", size: "3.2 MB" },
    { name: "Product Screenshots (ZIP)", url: "#", size: "15 MB" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/janka-logo.svg"
              alt="Janka Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-bold">Janka</span>
          </div>
          <Button>Contact Us</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Janka Press Kit</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Welcome to the Janka press kit. Here you'll find everything you need to accurately represent our brand and mission.
          </p>
        </section>

        <Tabs defaultValue="about" className="mb-16">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="about">About Janka</TabsTrigger>
            <TabsTrigger value="facts">Key Facts</TabsTrigger>
            <TabsTrigger value="releases">Press Releases</TabsTrigger>
            <TabsTrigger value="assets">Media Assets</TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About Janka</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Janka is a revolutionary blockchain-based insurance platform that allows businesses to hedge against real-world events with precision and transparency. Founded in 2024, Janka leverages the power of smart contracts on the Solana blockchain and data from the Pyth Network to provide customizable, event-based insurance solutions.
                </p>
                <p className="mb-4">
                  Our mission is to democratize access to financial protection against unpredictable events, empowering businesses of all sizes to manage risk more effectively and affordably.
                </p>
                <Button className="mt-4">
                  <FileText className="mr-2 h-4 w-4" /> Download Full Company Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="facts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Facts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Founded in 2024 by [Your Name], a former cafe owner</li>
                  <li>Headquartered in [City, Country]</li>
                  <li>Raised $5M in seed funding</li>
                  <li>Utilizes Solana blockchain for fast, low-cost transactions</li>
                  <li>Partners with Pyth Network for reliable, decentralized data</li>
                  <li>Offers coverage for weather events, local incidents, and market fluctuations</li>
                  <li>Provides instant, automated payouts via smart contracts</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="releases" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Press Releases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {pressReleases.map((release, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{release.title}</p>
                        <p className="text-sm text-gray-500">{release.date}</p>
                      </div>
                      <Button variant="outline" asChild>
                        <a href={release.url} target="_blank" rel="noopener noreferrer">Read More</a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="assets" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Media Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {mediaAssets.map((asset, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{asset.name}</p>
                        <p className="text-sm text-gray-500">{asset.size}</p>
                      </div>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full">
                  <Image className="mr-2 h-4 w-4" src={''} alt={''} /> Download All Assets (ZIP)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Need More Information?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            If you're a member of the press and need additional information or would like to schedule an interview, please don't hesitate to reach out.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground">
            <Users className="mr-2 h-4 w-4" /> Contact Our PR Team
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 dark:bg-gray-900 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Janka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}