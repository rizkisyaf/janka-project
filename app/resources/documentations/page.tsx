'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sun, Moon, ChevronDown, Search, Book, Lightbulb, DollarSign, BarChart2, HelpCircle, Shield, Zap, User, CreditCard, Settings, LogOut } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

export default function DocumentationPage() {
    const [darkMode, setDarkMode] = useState(false)
    const router = useRouter()
    const [footerEmail, setFooterEmail] = useState('')
    const docSections = [
        {
            title: "Getting Started",
            icon: <Book className="h-5 w-5" />,
            content: [
                { title: "What is Janka?", content: "Janka is a cutting-edge prediction market platform that allows users to trade on the outcomes of future events. It leverages blockchain technology to ensure transparency and security in all transactions." },
                { title: "Creating an Account", content: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. You'll need to provide a valid email address and create a strong password. After registration, you'll need to verify your email address to activate your account." },
                { title: "Navigating the Platform", content: "The Janka platform consists of several key areas: the Dashboard, Explore Markets, Trade, and Community Forum. Each section is designed to provide you with the tools and information you need to participate in prediction markets effectively." },
            ]
        },
        {
            title: "Understanding Prediction Markets",
            icon: <Lightbulb className="h-5 w-5" />,
            content: [
                { title: "What are Prediction Markets?", content: "Prediction markets are speculative platforms where users can trade on the probability of future events. They function similarly to traditional financial markets but deal in 'shares' of potential outcomes rather than company stocks." },
                { title: "How Janka's Markets Work", content: "On Janka, each market represents a question about a future event. Users can buy shares representing different possible outcomes. The price of these shares reflects the market's collective estimate of the probability of each outcome occurring." },
                { title: "Types of Markets on Janka", content: "Janka offers various types of markets, including binary markets (yes/no outcomes), scalar markets (range of possible outcomes), and categorical markets (multiple distinct outcomes)." },
            ]
        },
        {
            title: "Trading on Janka",
            icon: <DollarSign className="h-5 w-5" />,
            content: [
                { title: "How to Place a Trade", content: "To place a trade, navigate to the 'Trade' page, select a market, choose the outcome you want to bet on, enter the number of shares you want to buy, and confirm your transaction. Make sure you have sufficient funds in your account before trading." },
                { title: "Understanding Contract Prices", content: "Contract prices on Janka range from 0 to 1 (or 0% to 100%), representing the probability of an outcome. A price of 0.75 means the market estimates a 75% chance of that outcome occurring." },
                { title: "Managing Your Portfolio", content: "You can view and manage your open positions in the 'Portfolio' section of your dashboard. Here, you can monitor your current trades, close positions, and view your trading history." },
            ]
        },
        {
            title: "Market Analysis",
            icon: <BarChart2 className="h-5 w-5" />,
            content: [
                { title: "Reading Market Charts", content: "Janka provides detailed charts for each market, showing price movements over time. You can use these charts to identify trends and make informed trading decisions." },
                { title: "Using Janka's Analytics Tools", content: "Janka offers various analytics tools, including volume indicators, price trend analysis, and market sentiment gauges. These tools can help you better understand market dynamics and improve your trading strategy." },
                { title: "Community Insights", content: "The Janka community forum is a valuable resource for market analysis. Here, users share insights, discuss market trends, and debate the likelihood of various outcomes." },
            ]
        },
        {
            title: "Account Management",
            icon: <HelpCircle className="h-5 w-5" />,
            content: [
                { title: "Depositing Funds", content: "To deposit funds, go to the 'Wallet' section of your account and select 'Deposit'. Janka supports various payment methods, including credit/debit cards and cryptocurrency transfers." },
                { title: "Withdrawing Funds", content: "To withdraw funds, navigate to the 'Wallet' section and select 'Withdraw'. Enter the amount you wish to withdraw and select your preferred withdrawal method. Please note that withdrawal times may vary depending on the method chosen." },
                { title: "Security Settings", content: "Janka takes security seriously. In your account settings, you can enable two-factor authentication, set up email notifications for account activity, and manage your API keys if you're using Janka's API for trading." },
            ]
        },
        {
            title: "Platform Security",
            icon: <Shield className="h-5 w-5" />,
            content: [
                { title: "How Janka Protects Your Data", content: "Janka uses state-of-the-art encryption to protect your personal and financial data. All sensitive information is stored securely and is never shared with third parties without your explicit consent." },
                { title: "Smart Contract Security", content: "Janka's prediction markets are powered by audited smart contracts on the blockchain. This ensures that all trades and outcomes are executed fairly and transparently, without the possibility of manipulation." },
                { title: "Reporting Security Concerns", content: "If you notice any suspicious activity or potential security issues, please contact our security team immediately at security@janka.com. We take all reports seriously and investigate them thoroughly." },
            ]
        },
        {
            title: "Advanced Features",
            icon: <Zap className="h-5 w-5" />,
            content: [
                { title: "Using the Janka API", content: "For advanced users, Janka offers a robust API that allows for programmatic trading and data analysis. To get started with the API, visit the API documentation section and generate your API keys in your account settings." },
                { title: "Creating Custom Markets", content: "Qualified users can create custom markets on Janka. To apply for market creation privileges, go to the 'Create Market' section and follow the application process. Note that all custom markets are subject to review before being listed." },
                { title: "Janka's Liquidity Provision Program", content: "Janka offers a liquidity provision program for experienced traders. By providing liquidity to markets, you can earn additional rewards. Visit the 'Liquidity Provision' section in your dashboard to learn more and apply." },
            ]
        },
    ]

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
                            <Link href="/" passHref>
                                <a className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</a>
                            </Link>
                            <Link href="/explore-markets" passHref>
                                <a className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Explore Markets</a>
                            </Link>
                            <Link href="/documentations" passHref>
                                <a className="text-sm font-medium text-primary">Documentations</a>
                            </Link>
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
                        <h1 className="text-3xl font-bold">Janka Documentation</h1>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input className="pl-10" placeholder="Search documentation..." />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        <Card className="md:col-span-1">
                            <CardHeader>
                                <CardTitle>Table of Contents</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[calc(100vh-200px)]">
                                    <ul className="space-y-2">
                                        {docSections.map((section, index) => (
                                            <li key={index}>
                                                <Button variant="ghost" className="w-full justify-start">
                                                    {section.icon}
                                                    <span className="ml-2">{section.title}</span>
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                            </CardContent>
                        </Card>

                        <Card className="md:col-span-3">
                            <CardHeader>
                                <CardTitle>Documentation</CardTitle>
                                <CardDescription>Learn how to use Janka effectively</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[calc(100vh-200px)]">
                                    <Accordion type="single" collapsible className="w-full">
                                        {docSections.map((section, sectionIndex) => (
                                            <AccordionItem value={`section-${sectionIndex}`} key={sectionIndex}>
                                                <AccordionTrigger>
                                                    <div className="flex items-center">
                                                        {section.icon}
                                                        <span className="ml-2">{section.title}</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <Accordion type="single" collapsible className="w-full">
                                                        {section.content.map((item, itemIndex) => (
                                                            <AccordionItem value={`item-${sectionIndex}-${itemIndex}`} key={itemIndex}>
                                                                <AccordionTrigger>{item.title}</AccordionTrigger>
                                                                <AccordionContent>
                                                                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.content}</p>
                                                                </AccordionContent>
                                                            </AccordionItem>
                                                        ))}
                                                    </Accordion>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </div>
                </div>
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
