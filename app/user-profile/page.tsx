'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, CreditCard, Lock, Sun, Moon, ChevronDown, User, Settings, Bell, LogOut } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function UserProfilePage() {
    const [darkMode, setDarkMode] = useState(false)
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
                            <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                Home
                            </Link>
                            <Link href="/explore-market" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                Explore Markets
                            </Link>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
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
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">User Profile</h1>

                    <Tabs defaultValue="profile" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="billing">Billing</TabsTrigger>
                            <TabsTrigger value="security">Security</TabsTrigger>
                            <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        </TabsList>

                        <TabsContent value="profile">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                                    <CardDescription>Update your personal information and profile settings.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage src="/janka-logo.svg?height=80&width=80" alt="User Avatar" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <Button>Change Avatar</Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="fullName">Full Name</Label>
                                            <Input id="fullName" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="username">Username</Label>
                                            <Input id="username" placeholder="johndoe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" type="email" placeholder="john@example.com" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea id="bio" placeholder="Tell us about yourself" />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Changes</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="billing">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Billing Information</CardTitle>
                                    <CardDescription>Manage your subscription and payment methods.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Current Plan</h3>
                                        <p>Pro Plan - $49.99/month</p>
                                        <Button variant="outline">Upgrade Plan</Button>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Payment Method</h3>
                                        <div className="flex items-center space-x-2">
                                            <CreditCard className="h-6 w-6" />
                                            <span>Visa ending in 1234</span>
                                        </div>
                                        <Button variant="outline">Update Payment Method</Button>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Billing History</h3>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-left">Date</th>
                                                    <th className="text-left">Amount</th>
                                                    <th className="text-left">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2023-06-01</td>
                                                    <td>$49.99</td>
                                                    <td>Paid</td>
                                                </tr>
                                                <tr>
                                                    <td>2023-05-01</td>
                                                    <td>$49.99</td>
                                                    <td>Paid</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="security">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Security Settings</CardTitle>
                                    <CardDescription>Manage your account security and privacy settings.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Change Password</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="currentPassword">Current Password</Label>
                                                <Input id="currentPassword" type="password" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <Input id="newPassword" type="password" />
                                            </div>
                                        </div>
                                        <Button>Update Password</Button>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                                        <div className="flex items-center space-x-2">
                                            <Switch id="2fa" />
                                            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Login History</h3>
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-left">Date</th>
                                                    <th className="text-left">IP Address</th>
                                                    <th className="text-left">Device</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>2023-06-15 10:30 AM</td>
                                                    <td>192.168.1.1</td>
                                                    <td>Chrome on Windows</td>
                                                </tr>
                                                <tr>
                                                    <td>2023-06-14 2:15 PM</td>
                                                    <td>192.168.1.2</td>
                                                    <td>Safari on iPhone</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="notifications">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Notification Preferences</CardTitle>
                                    <CardDescription>Manage how you receive notifications from Janka.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Email Notifications</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Switch id="marketUpdates" />
                                                <Label htmlFor="marketUpdates">Market Updates</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="tradeConfirmations" />
                                                <Label htmlFor="tradeConfirmations">Trade Confirmations</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="accountActivity" />
                                                <Label htmlFor="accountActivity">Account Activity</Label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold">Push Notifications</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <Switch id="priceAlerts" />
                                                <Label htmlFor="priceAlerts">Price Alerts</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Switch id="newsAlerts" />
                                                <Label htmlFor="newsAlerts">News Alerts</Label>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Save Preferences</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>

            <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-lg font-semibold mb-4">About Janka</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about/janka-story" legacyBehavior>
                                        <a className="hover:text-gray-300">Our Story</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about/janka-teams" legacyBehavior>
                                        <a className="hover:text-gray-300">Team</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about/janka-careers" legacyBehavior>
                                        <a className="hover:text-gray-300">Careers</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about/janka-press-kit" legacyBehavior>
                                        <a className="hover:text-gray-300">Press Kit</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/resources/documentations" legacyBehavior>
                                        <a className="hover:text-gray-300">Documentation</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resources/janka-api-reference" legacyBehavior>
                                        <a className="hover:text-gray-300">API Reference</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/resources/community-forum" legacyBehavior>
                                        <a className="hover:text-gray-300">Community Forum</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog/${post.slug}/${post.slug}" legacyBehavior>
                                        <a className="hover:text-gray-300">Blog</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/legal/privacy-policy" legacyBehavior>
                                        <a className="hover:text-gray-300">Privacy Policy</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/terms-of-service" legacyBehavior>
                                        <a className="hover:text-gray-300">Terms of Service</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/cookies-policy" legacyBehavior>
                                        <a className="hover:text-gray-300">Cookie Policy</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/legal/compliance" legacyBehavior>
                                        <a className="hover:text-gray-300">Compliance</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4 mb-4">
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:text-gray-300">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:text-gray-300">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:text-gray-300">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                            <p className="text-sm">Stay updated with our newsletter</p>
                            <form onSubmit={handleFooterSubscribe} className="mt-2 flex">
                                <Input
                                    type="email"
                                    value={footerEmail}
                                    onChange={(e) => setFooterEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Button
                                    type="submit"
                                    className="bg-primary text-primary-foreground rounded-l-none"
                                >
                                    Subscribe
                                </Button>
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