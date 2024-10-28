'use client'

import { useState, useEffect, use } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Sun, Moon, ChevronDown, AlertTriangle, User, CreditCard, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'
import confetti from 'canvas-confetti'
import { useRouter } from 'next/navigation'

// Add this type for the params
type Props = {
  params: Promise<{
    id: string
  }>
}

// Add eventDetails type
interface EventDetails {
  id: string
  name: string
  description: string
  maxSupply: number
  currentSupply: number
  expirationDate: string
}

// Modify the component to accept params
export default function EnhancedTradePage({ params }: Props) {
  // Unwrap params using React.use()
  const { id } = use(params)

  const [darkMode, setDarkMode] = useState(false)
  const [tradeAmount, setTradeAmount] = useState(100)
  const [selectedProbability, setSelectedProbability] = useState(0.5)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    id: id, // Use unwrapped id here
    name: 'Loading...', // Default values
    description: 'Loading...',
    maxSupply: 0,
    currentSupply: 0,
    expirationDate: 'TBD'
  })

  const router = useRouter()

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (!router) return
  }, [router])

  // Add useEffect to fetch event details
  useEffect(() => {
    // In production, replace this with actual API call
    // For now, simulate loading event details
    const mockEventDetails = {
      id: id, // Use unwrapped id here
      name: 'US GDP Growth Q3 2024',
      description: 'This contract pays out if US GDP growth exceeds 2.5% in Q3 2024.',
      maxSupply: 1000000,
      currentSupply: 250000,
      expirationDate: 'September 30, 2024'
    }
    setEventDetails(mockEventDetails)
  }, [id]) // Use unwrapped id in dependency array

  const [probabilityVolumes, setProbabilityVolumes] = useState([
    { probability: 0.1, volume: 50000 },
    { probability: 0.3, volume: 75000 },
    { probability: 0.5, volume: 100000 },
    { probability: 0.7, volume: 15000 },
    { probability: 0.9, volume: 10000 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setProbabilityVolumes(prevVolumes =>
        prevVolumes.map(item => ({
          ...item,
          volume: Math.max(0, item.volume + Math.floor(Math.random() * 1000) - 500)
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPurchaseModal(true)
  }

  const calculatePayout = (probability: number) => {
    return 10 * (1 - probability)
  }

  const confirmPurchase = () => {
    setIsPurchasing(true)
    setTimeout(() => {
      setIsPurchasing(false)
      setShowPurchaseModal(false)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })

      // Delay navigation to allow confetti to finish
      setTimeout(() => {
        router.push('/user-dashboard')
      }, 3000) // Adjust the delay as needed for the confetti duration
    }, 2000)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg?height=40&width=40" alt="Janka Logo" className="h-10 w-10" />
            <nav className="hidden md:flex space-x-4">
              <a href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
              <a href="/explore-market" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Explore Markets</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline">Connect Wallet</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">My Account <ChevronDown className="ml-2 h-4 w-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/user-profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Trade: {eventDetails.name}</h1>
            <p className="text-xl mb-12 max-w-3xl text-gray-600 dark:text-gray-400">
              Purchase contracts based on the probability of this event occurring. Higher probability means lower potential payout.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Event Overview</CardTitle>
                  <CardDescription>Current market conditions and contract details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Current Probability:</span>
                      <span className="font-bold">{selectedProbability * 100}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Potential Payout:</span>
                      <span className="font-bold">{calculatePayout(selectedProbability).toFixed(2)}x</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Max Supply:</span>
                      <span>{eventDetails.maxSupply.toLocaleString()} contracts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Current Supply:</span>
                      <span>{eventDetails.currentSupply.toLocaleString()} contracts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Expiration Date:</span>
                      <span>{eventDetails.expirationDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Purchase Contracts</CardTitle>
                  <CardDescription>Set your trade parameters</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleTrade}>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="tradeAmount">Number of Contracts</Label>
                        <Input
                          id="tradeAmount"
                          type="number"
                          value={tradeAmount}
                          onChange={(e) => setTradeAmount(Number(e.target.value))}
                          min="1"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="probability">Probability</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            id="probability"
                            min={0}
                            max={1}
                            step={0.01}
                            value={[selectedProbability]}
                            onValueChange={(value) => setSelectedProbability(value[0])}
                          />
                          <span className="font-bold">{(selectedProbability * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total Cost:</span>
                        <span className="font-bold">${(tradeAmount * selectedProbability * 10).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Potential Payout:</span>
                        <span className="font-bold">${(tradeAmount * 10).toFixed(2)}</span>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" onClick={handleTrade}>
                    Purchase Contracts <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Real-Time Probability Volumes</CardTitle>
                  <CardDescription>Live trading volumes at different probability levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={probabilityVolumes}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="probability"
                          tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        <YAxis />
                        <RechartsTooltip
                          formatter={(value, name, props) => [`${value.toLocaleString()} contracts`, `Probability: ${(props.payload.probability * 100).toFixed(0)}%`]}
                        />
                        <Line type="monotone" dataKey="volume" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Probability</TableHead>
                        <TableHead>Volume</TableHead>
                        <TableHead>Payout</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {probabilityVolumes.map((item) => (
                        <TableRow key={item.probability}>
                          <TableCell>{(item.probability * 100).toFixed(0)}%</TableCell>
                          <TableCell>{item.volume.toLocaleString()} contracts</TableCell>
                          <TableCell>{calculatePayout(item.probability).toFixed(2)}x</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Contract Description</h2>
            <p className="mb-6">{eventDetails.description}</p>

            <h2 className="text-2xl font-bold mb-4">Disclaimer and Risks</h2>
            <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-200 p-4 mb-6">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-6 w-6 mr-2" />
                <p className="font-bold">Important Risk Information</p>
              </div>
              <p>Trading in event contracts involves substantial risk and is not suitable for all investors. You can lose more than your initial investment. Please ensure you fully understand the risks involved and seek independent advice if necessary.</p>
            </div>
            <ul className="list-disc pl-6 space-y-2">
              <li>The payout for this contract is based on the occurrence of the specified event by the expiration date.</li>
              <li>If the event occurs, contracts purchased at any probability level will pay out $10 per contract.</li>
              <li>If the event does not occur, all contracts will expire worthless.</li>
              <li>The price of contracts may fluctuate based on market demand and new information affecting the likelihood of the event.</li>
              <li>Once purchased, contracts cannot be sold back to Janka, but may be traded with other users on our secondary market.</li>
              <li>Janka does not provide investment advice. All trading decisions are made solely by the user.</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Janka</h4>
              <ul className="space-y-2">
                <li><a href="/about/janka-story" className="hover:text-gray-300">Our Story</a></li>
                <li><a href="/about/janka-teams" className="hover:text-gray-300">Team</a></li>
                <li><a href="/about/janka-careers" className="hover:text-gray-300">Careers</a></li>
                <li><a href="/about/janka-press-kit" className="hover:text-gray-300">Press Kit</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/resources/documentations" className="hover:text-gray-300">Documentation</a></li>
                <li><a href="/resources/janka-api-reference" className="hover:text-gray-300">API Reference</a></li>
                <li><a href="/resources/community-forum" className="hover:text-gray-300">Community Forum</a></li>
                <li><a href="/resources/janka-blog" className="hover:text-gray-300">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                <li><a href="#" className="hover:text-gray-300">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <p className="text-sm">Stay updated with our newsletter</p>
              <form className="mt-2 flex">
                <Input type="email" placeholder="Enter your email" className="bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary" />
                <Button type="submit" className="bg-primary text-primary-foreground rounded-l-none">Subscribe</Button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Janka. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Dialog open={showPurchaseModal} onOpenChange={setShowPurchaseModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Purchase</DialogTitle>
            <DialogDescription>
              Please review the details of your contract purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Number of Contracts:</span>
                <span className="font-semibold">{tradeAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Probability:</span>
                <span className="font-semibold">{(selectedProbability * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Total Cost:</span>
                <span className="font-semibold">${(tradeAmount * selectedProbability * 10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Potential Payout:</span>
                <span className="font-semibold">${(tradeAmount * 10).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPurchaseModal(false)}>Cancel</Button>
            <Button onClick={confirmPurchase} disabled={isPurchasing}>
              {isPurchasing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Confirm Purchase'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
