'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { Bell, Home, Menu, Package, User, Wallet, BarChart2 } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col justify-between`}>
        <div>
          <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
            <Button 
              variant="ghost" 
              className="text-2xl font-semibold text-gray-800 dark:text-white hover:bg-transparent"
              onClick={() => router.push('/')}
            >
              Janka
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/user-dashboard')}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/manage-events')}>
                  <Package className="mr-2 h-4 w-4" />
                  My Hedges
                  <div className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded">7 Active</div>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start" onClick={() => router.push('/transaction-history')}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet
                  <div className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded">$1,234.56</div>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => router.push('/analytics')}
                >
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Analytics
                  <div className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    View Stats
                  </div>
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t dark:border-gray-700">
          <button onClick={() => router.push('/user-profile')} className="flex items-center w-full text-left">
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

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  )
} 