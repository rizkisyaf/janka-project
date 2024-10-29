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

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (!router) return
  }, [router])

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
