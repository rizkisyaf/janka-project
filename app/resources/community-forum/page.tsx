'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sun, Moon, ChevronDown, MessageSquare, ThumbsUp, Eye, Search, PlusCircle, User, CreditCard, Settings, LogOut } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

export default function CommunityForumPage() {
    const [darkMode, setDarkMode] = useState(false)
    const router = useRouter()

    useEffect(() => {
        // Ensure this code runs only on the client side
        if (!router) return
    }, [router])

    const forumCategories = [
        { name: "General Discussion", description: "Talk about anything related to Janka", threads: 152, posts: 1243 },
        { name: "Market Analysis", description: "Share your insights on market trends", threads: 89, posts: 567 },
        { name: "Trading Strategies", description: "Discuss and share trading strategies", threads: 201, posts: 1876 },
        { name: "Platform Support", description: "Get help with using the Janka platform", threads: 45, posts: 321 },
    ]

    const recentThreads = [
        { title: "How to analyze market volatility?", author: "JohnDoe", replies: 23, views: 456, likes: 18, category: "Market Analysis" },
        { title: "Best practices for risk management", author: "TradeMaster", replies: 45, views: 789, likes: 32, category: "Trading Strategies" },
        { title: "Janka mobile app not loading", author: "NewTrader", replies: 12, views: 234, likes: 5, category: "Platform Support" },
        { title: "Introducing myself to the community", author: "JankaNewbie", replies: 8, views: 123, likes: 10, category: "General Discussion" },
    ]

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <img src="/placeholder.svg?height=40&width=40" alt="Janka Logo" className="h-10 w-10" />
                        <nav className="hidden md:flex space-x-4">
                            <a href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
                            <a href="/explore-markets" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Explore Markets</a>
                            <a href="/documentations" className="text-sm font-medium text-primary">Documentations</a>
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
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Janka Community Forum</h1>
                        <div className="flex space-x-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input className="pl-10" placeholder="Search forums..." />
                            </div>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                New Thread
                            </Button>
                        </div>
                    </div>

                    <Tabs defaultValue="categories">
                        <TabsList className="mb-4">
                            <TabsTrigger value="categories">Categories</TabsTrigger>
                            <TabsTrigger value="recent">Recent Discussions</TabsTrigger>
                        </TabsList>
                        <TabsContent value="categories">
                            <div className="grid gap-6 md:grid-cols-2">
                                {forumCategories.map((category, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle>{category.name}</CardTitle>
                                            <CardDescription>{category.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                                <span>{category.threads} threads</span>
                                                <span>{category.posts} posts</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant="outline" className="w-full">View Threads</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="recent">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Discussions</CardTitle>
                                    <CardDescription>Stay up to date with the latest community conversations</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {recentThreads.map((thread, index) => (
                                            <li key={index}>
                                                <div className="flex items-start space-x-4">
                                                    <Avatar>
                                                        <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${thread.author.charAt(0)}`} />
                                                        <AvatarFallback>{thread.author.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="flex items-center space-x-2">
                                                            <h3 className="text-lg font-semibold">{thread.title}</h3>
                                                            <Badge variant="secondary">{thread.category}</Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Started by {thread.author}</p>
                                                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="flex items-center">
                                                                <MessageSquare className="mr-1 h-4 w-4" />
                                                                {thread.replies} replies
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Eye className="mr-1 h-4 w-4" />
                                                                {thread.views} views
                                                            </span>
                                                            <span className="flex items-center">
                                                                <ThumbsUp className="mr-1 h-4 w-4" />
                                                                {thread.likes} likes
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {index < recentThreads.length - 1 && <Separator className="my-4" />}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button variant="outline" className="w-full">View All Discussions</Button>
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
                                <li><a href="/about/janka-story" className="hover:text-gray-300">Our Story</a></li>
                                <li><a href="/about/janka-teams" className="hover:text-gray-300">Team</a></li>
                                <li><a href="/about/janka-careers" className="hover:text-gray-300">Careers</a></li>
                                <li><a href="/about/janka-press-kit" className="hover:text-gray-300">Press Kit</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="/resources/documentations" className="hover:text-gray-300">Documentation</a></li>
                                <li><a href="#" className="hover:text-gray-300">API Reference</a></li>
                                <li><a href="/resources/community-forum" className="hover:text-gray-300">Community Forum</a></li>
                                <li><a href="#" className="hover:text-gray-300">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-gray-300">Cookie Policy</a></li>
                                <li><a href="#" className="hover:text-gray-300">Compliance</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Connect</h4>
                            <div className="flex space-x-4 mb-4">
                                <a href="#" className="text-white hover:text-gray-300">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-gray-300">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a href="#" className="text-white hover:text-gray-300">
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07  1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </a>
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