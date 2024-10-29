'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Sun, Moon, Plus, Edit, Trash2, Search, Filter, ChevronDown, User, CreditCard, Settings, LogOut } from 'lucide-react'
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
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link';

export default function ManageEventsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [events, setEvents] = useState([
    { id: 1, name: 'US GDP Growth Q3 2024', category: 'Finance', probability: '65%', stake: '$500', status: 'Active' },
    { id: 2, name: 'Hurricane Landfall Florida 2024', category: 'Weather', probability: '30%', stake: '$750', status: 'Pending' },
    { id: 3, name: 'Oil Price Above $80/barrel EOY', category: 'Commodities', probability: '75%', stake: '$1000', status: 'Active' },
    { id: 4, name: 'Renewable Energy Output EU Q4', category: 'Energy', probability: '60%', stake: '$600', status: 'Completed' },
  ])

  const router = useRouter()

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (!router) return
  }, [router])

  const handleCreateEvent = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle event creation logic here
  }

  const handleEditEvent = (id: number) => {
    // Handle event editing logic here
  }

  const handleDeleteEvent = (id: number) => {
    // Handle event deletion logic here
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
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
            <nav className="hidden md:flex space-x-4">
              <Link href="/" passHref>
                <a className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
              </Link>
              <Link href="/explore-market" passHref>
                <a className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Explore Markets</a>
              </Link>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Manage Your Events</h1>
            <p className="text-xl mb-12 max-w-3xl text-gray-600 dark:text-gray-400">
              Create, edit, and track your hedging events all in one place. Stay on top of your risk management strategy with ease.
            </p>

            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="active">Active Events</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="create">Create New</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Events</CardTitle>
                    <CardDescription>Manage your currently active hedging events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Input type="text" placeholder="Search events..." className="w-64" />
                        <Button variant="outline" size="icon">
                          <Search className="h-4 w-4" />
                          <span className="sr-only">Search</span>
                        </Button>
                      </div>
                      <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                      </Button>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Probability</TableHead>
                          <TableHead>Stake</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.filter(event => event.status === 'Active').map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.category}</TableCell>
                            <TableCell>{event.probability}</TableCell>
                            <TableCell>{event.stake}</TableCell>
                            <TableCell>{event.status}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Events</CardTitle>
                    <CardDescription>View and manage your pending hedging events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Probability</TableHead>
                          <TableHead>Stake</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.filter(event => event.status === 'Pending').map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.category}</TableCell>
                            <TableCell>{event.probability}</TableCell>
                            <TableCell>{event.stake}</TableCell>
                            <TableCell>{event.status}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Events</CardTitle>
                    <CardDescription>Review your past hedging events and outcomes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Probability</TableHead>
                          <TableHead>Stake</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Outcome</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.filter(event => event.status === 'Completed').map((event) => (
                          <TableRow key={event.id}>
                            <TableCell>{event.name}</TableCell>
                            <TableCell>{event.category}</TableCell>
                            <TableCell>{event.probability}</TableCell>
                            <TableCell>{event.stake}</TableCell>
                            <TableCell>{event.status}</TableCell>
                            <TableCell>Won</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="create">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                    <CardDescription>Set up a new hedging event to manage your risk.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateEvent}>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Event Name</Label>
                          <Input id="name" placeholder="Enter event name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="category">Category</Label>
                          <Select>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="weather">Weather</SelectItem>
                              <SelectItem value="commodities">Commodities</SelectItem>
                              <SelectItem value="energy">Energy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="probability">Probability</Label>
                          <Input id="probability" placeholder="Enter probability (%)" type="number" min="0" max="100" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="stake">Stake Amount</Label>
                          <Input id="stake" placeholder="Enter stake amount" type="number" min="0" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="description">Event Description</Label>
                          <Textarea id="description" placeholder="Provide a detailed description of the event" />
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">Create Event</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Janka</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about/janka-story" passHref>
                    <a className="hover:text-gray-300">Our Story</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about/janka-teams" passHref>
                    <a className="hover:text-gray-300">Team</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about/janka-careers" passHref>
                    <a className="hover:text-gray-300">Careers</a>
                  </Link>
                </li>
                <li>
                  <Link href="/about/janka-press-kit" passHref>
                    <a className="hover:text-gray-300">Press Kit</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/resources/documentations" passHref>
                    <a className="hover:text-gray-300">Documentation</a>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/janka-api-reference" passHref>
                    <a className="hover:text-gray-300">API Reference</a>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/community-forum" passHref>
                    <a className="hover:text-gray-300">Community Forum</a>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/janka-blog" passHref>
                    <a className="hover:text-gray-300">Blog</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" passHref>
                    <a className="hover:text-gray-300">Privacy Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    <a className="hover:text-gray-300">Terms of Service</a>
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    <a className="hover:text-gray-300">Cookie Policy</a>
                  </Link>
                </li>
                <li>
                  <Link href="#" passHref>
                    <a className="hover:text-gray-300">Compliance</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <Link href="#" passHref>
                  <a className="text-white hover:text-gray-300">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                </Link>
                <Link href="#" passHref>
                  <a className="text-white hover:text-gray-300">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </Link>
                <Link href="#" passHref>
                  <a className="text-white hover:text-gray-300">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                </Link>
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
    </div>
  )
}
