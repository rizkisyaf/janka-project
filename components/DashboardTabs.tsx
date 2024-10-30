'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUpRight, ArrowDownLeft, Filter, Search } from 'lucide-react'
import { DatePickerWithRange, DateRange } from "@/components/ui/date-range-picker"
import { useState } from 'react'

export default function DashboardTabs() {
  const router = useRouter()

  // Sample data - in production, this would come from your data source
  const recentEvents = [
    { id: 1, name: 'US GDP Growth Q3 2024', category: 'Finance', probability: '65%', stake: '$500', status: 'Active' },
    { id: 2, name: 'Hurricane Landfall Florida 2024', category: 'Weather', probability: '30%', stake: '$750', status: 'Pending' },
  ]

  const recentTransactions = [
    { id: 1, date: '2024-03-15', type: 'Hedge', amount: '-$500', status: 'Completed' },
    { id: 2, date: '2024-03-14', type: 'Deposit', amount: '+$1000', status: 'Completed' },
  ]

  const [performanceData, setPerformanceData] = useState([
    { date: '2024-01-01', accuracy: 65, profit: 1200, volume: 5000 },
    { date: '2024-02-01', accuracy: 70, profit: 1500, volume: 5500 },
    { date: '2024-03-01', accuracy: 68, profit: 1400, volume: 6000 }
  ])

  const [categoryDistribution, setCategoryDistribution] = useState([
    { name: 'Politics', value: 30 },
    { name: 'Sports', value: 25 },
    { name: 'Finance', value: 20 },
    { name: 'Technology', value: 15 },
    { name: 'Entertainment', value: 10 }
  ])

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="hedges">My Hedges</TabsTrigger>
        <TabsTrigger value="wallet">Wallet</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={[
                  { date: "Jan", value: 100 },
                  { date: "Feb", value: 120 },
                  { date: "Mar", value: 110 }
                ]}
                index="date"
                categories={["value"]}
              />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{event.name}</p>
                      <p className="text-sm text-muted-foreground">{event.category}</p>
                    </div>
                    <div className="text-sm">{event.stake}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="hedges">
        <Card>
          <CardHeader>
            <CardTitle>Active Hedges Summary</CardTitle>
            <CardDescription>
              Your current hedge positions
              <Button 
                variant="link" 
                className="ml-2"
                onClick={() => router.push('/manage-events')}
              >
                View All →
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Probability</TableHead>
                  <TableHead>Stake</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEvents.map(event => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.category}</TableCell>
                    <TableCell>{event.probability}</TableCell>
                    <TableCell>{event.stake}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="wallet" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button>Deposit</Button>
              <Button variant="outline">Withdraw</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Recent Transactions</CardTitle>
            <Button 
              variant="link"
              onClick={() => router.push('/transaction-history')}
            >
              View All →
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map(tx => (
                  <TableRow key={tx.id}>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>
                      <span className={tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                        {tx.amount.startsWith('+') ? (
                          <ArrowUpRight className="inline-block mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownLeft className="inline-block mr-1 h-4 w-4" />
                        )}
                        {tx.amount}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Your performance metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart 
                data={[
                  { date: "Jan", value: 100 },
                  { date: "Feb", value: 120 },
                  { date: "Mar", value: 110 }
                ]}
                index="date"
                categories={["value"]}
              />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Category Distribution</CardTitle>
              <CardDescription>Breakdown by market category</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart 
                data={[
                  { category: "Finance", value: 40 },
                  { category: "Weather", value: 30 },
                  { category: "Politics", value: 30 }
                ]}
                index="category"
                categories={["value"]}
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
} 