'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { 
  ArrowRight, 
  BarChart2, 
  Bell, 
  ChevronRight, 
  CreditCard, 
  DollarSign, 
  Home, 
  LogOut, 
  Menu, 
  Package, 
  PieChart as PieChartIcon, 
  Settings, 
  User, 
  Wallet 
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UserDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
            <span className="text-2xl font-semibold text-gray-800 dark:text-white">Janka</span>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  My Hedges
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={() => router.push('/user-profile')}
            className="flex items-center w-full text-left"
          >
            <User className="mr-2 h-4 w-4" />
            <span className="text-sm text-gray-800 dark:text-white">user@example.com</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-4 ml-auto">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-semibold mb-6">Welcome back, User</h1>
            
            {/* Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1,234.56</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Hedges</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">Across 3 categories</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$345.67</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Main dashboard sections */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="hedges">My Hedges</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>New hedge placed: US GDP Growth Q3 2024</span>
                        <span className="text-muted-foreground">2 hours ago</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Payout received: Hurricane Landfall Florida 2024</span>
                        <span className="text-muted-foreground">1 day ago</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Wallet funded: +$500</span>
                        <span className="text-muted-foreground">3 days ago</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LineChart 
                      data={[
                        { name: 'Jan', value: 100 },
                        { name: 'Feb', value: 120 },
                        { name: 'Mar', value: 110 },
                        { name: 'Apr', value: 140 },
                        { name: 'May', value: 180 },
                        { name: 'Jun', value: 200 },
                      ]} 
                      index="name"
                      categories={['value']}
                      colors={['blue']}
                      valueFormatter={(value: number) => `$${value}`}
                      className="h-[200px]"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="hedges" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Hedges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>US GDP Growth Q3 2024</span>
                        <span>$500 @ 65% probability</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Oil Price Above $80/barrel EOY</span>
                        <span>$750 @ 75% probability</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Renewable Energy Output EU Q4</span>
                        <span>$300 @ 60% probability</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                <a href="/manage-events" className="text-blue-500 hover:underline">
                    Manage Events
                  </a>
                  <Button>
                    Place New Hedge <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="wallet" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Wallet Balance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold mb-4">$1,234.56</div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button>Deposit</Button>
                      <Button variant="outline">Withdraw</Button>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle>Transaction History</CardTitle>
                    <a href="/transaction-history" className="text-blue-500 hover:underline">
                      View Details
                    </a>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex justify-between items-center">
                        <span>Deposit</span>
                        <span className="text-green-600">+$500.00</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Hedge Payout</span>
                        <span className="text-green-600">+$250.00</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>New Hedge Placed</span>
                        <span className="text-red-600">-$300.00</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Hedge Performance by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <BarChart 
                      data={[
                        { category: 'Weather', successful: 5, unsuccessful: 2 },
                        { category: 'Finance', successful: 8, unsuccessful: 3 },
                        { category: 'Politics', successful: 3, unsuccessful: 1 },
                        { category: 'Sports', successful: 6, unsuccessful: 4 },
                      ]}
                      index="category"
                      categories={['successful', 'unsuccessful']}
                      colors={['green', 'red']}
                      valueFormatter={(value: number) => `${value} hedges`}
                      className="h-[200px]"
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Profit Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PieChart 
                      data={[
                        { name: 'Weather', value: 30 },
                        { name: 'Finance', value: 40 },
                        { name: 'Politics', value: 15 },
                        { name: 'Sports', value: 15 },
                      ]}
                      index="name"
                      categories={['value']}
                      colors={['sky', 'blue', 'indigo', 'violet']}
                      valueFormatter={(value: number) => `${value}%`}
                      className="h-[200px]"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
