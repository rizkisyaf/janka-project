'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Coins, Users, Sun, Moon, MessageCircle, Target, CheckCircle2, Rocket, BarChart2, Shield } from 'lucide-react'
import Image from 'next/image'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey, Transaction } from '@solana/web3.js'
import { createTransferInstruction } from '@solana/spl-token'
import axios from 'axios'
import Link from 'next/link'

interface Notification {
  id: number;
  type: 'donation' | 'donor';
  amount?: number;
}

function DonationTracker() {
  const [totalDonations, setTotalDonations] = useState(0)
  const [donorCount, setDonorCount] = useState(0)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [notificationId, setNotificationId] = useState(0)

  const addNotification = useCallback((type: 'donation' | 'donor', amount?: number) => {
    const newId = notificationId + 1
    setNotificationId(newId)
    setNotifications(prev => [...prev, { id: newId, type, amount }])

    // Remove notification after animation
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newId))
    }, 3000)
  }, [notificationId])

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/donations');
        setTotalDonations(response.data.totalDonations);
        setDonorCount(response.data.donorCount);
      } catch (error) {
        console.error('Error fetching donation data:', error);
      }
    };

    fetchDonationData();

    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'donation') {
        setTotalDonations(prev => prev + data.amount);
        addNotification('donation', data.amount);
      } else if (data.type === 'donor') {
        setDonorCount(prev => prev + 1);
        addNotification('donor');
      }
    };

    return () => {
      ws.close();
    };
  }, [addNotification]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Live Donation Tracker</CardTitle>
        <CardDescription>
          Watch our community grow in real-time as we work towards our goal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <p className="text-sm text-muted-foreground">Total Donations</p>
            <p className="text-2xl font-bold">${totalDonations.toFixed(2)}</p>
            {notifications.map(notification =>
              notification.type === 'donation' && (
                <span
                  key={notification.id}
                  className="absolute -right-4 -top-4 text-green-500 animate-float-up"
                >
                  +${notification.amount?.toFixed(2)}
                </span>
              )
            )}
          </div>
          <div className="relative">
            <p className="text-sm text-muted-foreground">Number of Donors</p>
            <p className="text-2xl font-bold">{donorCount}</p>
            {notifications.map(notification =>
              notification.type === 'donor' && (
                <span
                  key={notification.id}
                  className="absolute -right-4 -top-4 text-blue-500 animate-float-up"
                >
                  +1
                </span>
              )
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min((totalDonations / 30000) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {totalDonations < 30000
            ? `${(30000 - totalDonations).toFixed(2)} to go to reach our $30,000 goal!`
            : 'Goal reached! Thank you for your support!'}
        </p>
      </CardContent>
    </Card>
  )
}

export default function WaitlistPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [email, setEmail] = useState('')
  const [donationAmount, setDonationAmount] = useState('')
  const [message, setMessage] = useState('')
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const handleJoinWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/waitlist', { email })
      console.log('Joined waitlist:', response.data)
      // Add user to newsletter
      await axios.post('/api/newsletter', { email })
      alert('You have successfully joined the waitlist and subscribed to our newsletter!')
    } catch (error) {
      console.error('Error joining waitlist:', error)
      alert('There was an error joining the waitlist. Please try again.')
    }
  }

  const handleJoinTelegram = () => {
    window.open('https://t.me/+mrbJewOGK_ZiOTI1', '_blank')
  }

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    try {
      // Process the donation transaction on Solana
      const transaction = new Transaction();
      const recipientPublicKey = new PublicKey('4TSJPLqvzfejeh2fPdXnUs8sFnfSQ2qSs2N4WYzA9usK');
      const transferInstruction = createTransferInstruction(
        publicKey,
        recipientPublicKey,
        publicKey,
        BigInt(Math.floor(Number(donationAmount) * 1e9))
      );
      transaction.add(transferInstruction);

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      console.log('Donation successful:', signature);

      // Send donation data to the backend server
      await axios.post('http://localhost:3000/api/donations', {
        amount: Number(donationAmount),
        message
      });

      alert('Thank you for your donation!');
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('There was an error processing your donation. Please try again.');
    }
  };


  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .animate-float-up {
          animation: floatUp 3s ease-out;
        }
      `}</style>
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
          </div>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="py-20 bg-gradient-to-b from-primary/20 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join the Janka Revolution</h1>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              Be part of the future of decentralized hedging. Your support is crucial for demonstrating public demand and securing regulatory approval.
            </p>
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Sign Up for Early Access</CardTitle>
                <CardDescription>Join our waitlist to be notified when we launch</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoinWaitlist}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Join Waitlist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Investor Relations</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-6 w-6" />
                    Join Our Community
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Connect with the founders in our Telegram group. Stay updated on our progress and provide valuable feedback.</p>
                  <Button onClick={handleJoinTelegram} className="w-full">
                    Join Telegram Group <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 h-6 w-6" />
                    Founder&apos;s Commitment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>As the founder of Janka, I am fully committed to delivering on our promises. Our team is dedicated to building a revolutionary platform that will transform the world of decentralized hedging.</p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Transparent development process
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Regular progress updates
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                      Open communication with investors
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Janka Roadmap</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary"></div>
                {[
                  { icon: Rocket, title: "Phase 1: MVP Development", description: "Develop core functionality, smart contracts, and basic UI" },
                  { icon: Users, title: "Phase 2: Beta Testing", description: "Invite early adopters to test the platform and gather feedback" },
                  { icon: ArrowRight, title: "Phase 3: Iteration and Improvement", description: "Refine the platform based on user feedback and market demands" },
                  { icon: Shield, title: "Phase 4: Security Audits", description: "Conduct thorough security audits and stress tests" },
                  { icon: BarChart2, title: "Phase 5: Market Expansion", description: "Expand to new markets and increase liquidity" },
                ].map((phase, index) => (
                  <div key={index} className={`relative z-10 mb-8 flex items-center w-full ${index % 2 === 0 ? 'right-timeline' : 'flex-row-reverse left-timeline'}`}>
                    <div className="order-1 w-5/12"></div>
                    <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                      <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
                    </div>
                    <div className="order-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-5/12 px-6 py-4">
                      <h3 className="mb-3 font-bold text-primary text-xl flex items-center">
                        <phase.icon className="mr-2 h-5 w-5" />
                        {phase.title}
                      </h3>
                      <p className="text-sm leading-snug tracking-wide text-gray-600 dark:text-gray-400">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Support Janka&apos;s Development</h2>
            <div className="max-w-3xl mx-auto">
              <DonationTracker />
              <Card>
                <CardHeader>
                  <CardTitle>Donate to Our Independent Project</CardTitle>
                  <CardDescription>
                    Janka is an independent project with no VC backing. Your donations directly support our development and operations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonation}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="amount">Donation Amount (SOL)</Label>
                        <Input
                          id="amount"
                          placeholder="Enter amount"
                          type="number"
                          value={donationAmount}

                          onChange={(e) => setDonationAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                          id="message"
                          placeholder="Leave a message with your donation"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <WalletMultiButton className="w-full" />
                  <Button type="submit" className="w-full" onClick={handleDonation} disabled={!publicKey}>
                    Donate <Coins className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Governance Token and Share Structure</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              Janka will launch a governance token directly connected to real-world shares in our company (PT Janka Assurance Dynamics).
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Token-Share Correlation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Each governance token represents 1 share in the company, creating a direct link between digital assets and real-world equity.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Initial Share Release</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>20% of shares will be released initially. The price will be determined by the total donations received, ensuring fair valuation based on community support.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Be Part of the Janka Revolution</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our waitlist, support our development, and help shape the future of decentralized hedging.
            </p>
            <Button size="lg" variant="secondary">
              Join Waitlist Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
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