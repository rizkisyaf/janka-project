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
import DashboardLayout from '@/components/DashboardLayout'
import DashboardTabs from '@/components/DashboardTabs'

export default function UserDashboard() {
  const router = useRouter()

  return (
    <DashboardLayout>
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
        
        {/* Buy Another Contract */}
        <div className="flex justify-start mb-6">
          <Button 
            onClick={() => router.push('/explore-market')}
            className="bg-primary hover:bg-primary/90"
          >
            Buy Another Contract
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {/* Dashboard Tabs */}
        <DashboardTabs />
      </div>
    </DashboardLayout>
  )
}
