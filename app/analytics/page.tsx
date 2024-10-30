'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange, DateRange } from "@/components/ui/date-range-picker"
import { LineChart, BarChart, PieChart, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, Activity, BarChart2 } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'

const initialPerformanceData = [
  { date: '2024-01-01', accuracy: 65, profit: 1200, volume: 5000 },
  { date: '2024-02-01', accuracy: 70, profit: 1500, volume: 5500 },
  { date: '2024-03-01', accuracy: 68, profit: 1400, volume: 6000 },
  { date: '2024-04-01', accuracy: 72, profit: 1800, volume: 6200 },
  { date: '2024-05-01', accuracy: 75, profit: 2000, volume: 6500 },
  { date: '2024-06-01', accuracy: 73, profit: 1900, volume: 6800 },
]

const initialCategoryDistribution = [
  { name: 'Politics', value: 30 },
  { name: 'Sports', value: 25 },
  { name: 'Finance', value: 20 },
  { name: 'Technology', value: 15 },
  { name: 'Entertainment', value: 10 },
]

const contractTypes = [
  { name: 'Binary', value: 60 },
  { name: 'Scalar', value: 25 },
  { name: 'Categorical', value: 15 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date()
  })
  const [selectedMarket, setSelectedMarket] = useState('all')
  const [performanceData, setPerformanceData] = useState(initialPerformanceData)
  const [categoryDistribution, setCategoryDistribution] = useState(initialCategoryDistribution)

  useEffect(() => {
    if (selectedMarket === 'all') {
      setPerformanceData(initialPerformanceData)
      setCategoryDistribution(initialCategoryDistribution)
    } else {
      const filteredPerformance = initialPerformanceData.map(item => ({
        ...item,
        accuracy: Math.round(item.accuracy * (0.8 + Math.random() * 0.4)),
        profit: Math.round(item.profit * (0.8 + Math.random() * 0.4)),
        volume: Math.round(item.volume * (0.8 + Math.random() * 0.4))
      }))
      setPerformanceData(filteredPerformance)

      const filteredCategory = [
        { name: selectedMarket, value: 100 },
        { name: 'Others', value: Math.round(Math.random() * 50) }
      ]
      setCategoryDistribution(filteredCategory)
    }
  }, [selectedMarket])

  const handleMarketChange = (value: string) => {
    setSelectedMarket(value)
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Analytics Dashboard</h1>
        
        <div className="flex justify-between items-center mb-8">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Select value={selectedMarket} onValueChange={handleMarketChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Markets</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,345.67</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">73.5%</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">36,085 SOL</div>
              <p className="text-xs text-muted-foreground">
                +12.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Markets</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">283</div>
              <p className="text-xs text-muted-foreground">
                +35 new markets this month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Over Time</CardTitle>
                <CardDescription>Your accuracy, profit, and trading volume trends</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#8884d8" name="Accuracy (%)" />
                    <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit (SOL)" />
                    <Line yAxisId="right" type="monotone" dataKey="volume" stroke="#ffc658" name="Volume (SOL)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="distribution" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Breakdown of your predictions by category</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Contract Type Distribution</CardTitle>
                  <CardDescription>Breakdown of contract types you've participated in</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contractTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        dataKey="value"
                        label
                      >
                        {contractTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Market Liquidity Trends</CardTitle>
                <CardDescription>Average liquidity across different market categories</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Average Liquidity (SOL)">
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}