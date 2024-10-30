'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sun, Moon, Download, Search, Filter, ChevronDown, ArrowUpRight, ArrowDownLeft, CreditCard, Settings, LogOut, User } from 'lucide-react'
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
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import DashboardLayout from '@/components/DashboardLayout'

export default function TransactionHistoryPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-03-15', type: 'Hedge', event: 'US GDP Growth Q3 2024', amount: '-$500', status: 'Completed' },
    { id: 2, date: '2024-03-14', type: 'Deposit', event: 'Wallet Funding', amount: '+$1000', status: 'Completed' },
    { id: 3, date: '2024-03-12', type: 'Withdrawal', event: 'Wallet Withdrawal', amount: '-$200', status: 'Completed' },
    { id: 4, date: '2024-03-10', type: 'Payout', event: 'Oil Price Above $80/barrel EOY', amount: '+$750', status: 'Completed' },
    { id: 5, date: '2024-03-08', type: 'Hedge', event: 'Renewable Energy Output EU Q4', amount: '-$600', status: 'Pending' },
  ])

  const router = useRouter()
  const [footerEmail, setFooterEmail] = useState('')

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (!router) return
  }, [router])

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
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Transaction History</h1>
        <p className="text-xl mb-12 max-w-3xl text-gray-600 dark:text-gray-400">
          View and manage your transaction history on the Janka platform. Monitor your hedges, deposits, withdrawals, and payouts all in one place.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,234.56</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Hedges</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">+3 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit/Loss</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+$450.00</div>
              <p className="text-xs text-muted-foreground">+12.5% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>A detailed list of all your transactions on the Janka platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Input type="text" placeholder="Search transactions..." className="w-64" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="hedge">Hedge</SelectItem>
                    <SelectItem value="deposit">Deposit</SelectItem>
                    <SelectItem value="withdrawal">Withdrawal</SelectItem>
                    <SelectItem value="payout">Payout</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.event}</TableCell>
                    <TableCell>
                      <span className={transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {transaction.amount.startsWith('+') ? (
                          <ArrowUpRight className="inline-block mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownLeft className="inline-block mr-1 h-4 w-4" />
                        )}
                        {transaction.amount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
