'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, Search, Filter } from 'lucide-react'
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
import axios from 'axios'
import DashboardLayout from '@/components/DashboardLayout'

export default function ManageEventsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [footerEmail, setFooterEmail] = useState('')
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

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!footerEmail || !footerEmail.includes('@')) {
        alert('Please enter a valid email address')
        return
      }

      const response = await axios.post('/api/newsletter', { email: footerEmail })
      if (response.data.success) {
        alert('Thank you for subscribing to our newsletter!')
        setFooterEmail('')
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error)
      alert('There was an error subscribing to the newsletter. Please try again.')
    }
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
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
    </DashboardLayout>
  )
}
