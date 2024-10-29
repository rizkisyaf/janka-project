'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BarChart2, Lock, Zap, Sun, Moon, Play, DollarSign, Shield, Briefcase, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import axios from 'axios'

export default function ComprehensiveLandingPage() {
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: false,
    functional: false,
  })
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()
  const [footerEmail, setFooterEmail] = useState('')

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent')
    if (savedConsent) {
      setShowCookieConsent(false)
      setCookiePreferences(JSON.parse(savedConsent))
    }
  }, [])

  const handleCookiePreferenceChange = (type: 'essential' | 'performance' | 'functional') => {
    const newPreferences = { 
      ...cookiePreferences, 
      [type]: !cookiePreferences[type] 
    }
    setCookiePreferences(newPreferences)
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences))
  }

  const acceptAllCookies = () => {
    const allAccepted = { 
      essential: true, 
      performance: true, 
      functional: true 
    }
    setCookiePreferences(allAccepted)
    setShowCookieConsent(false)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
  }

  const savePreferences = () => {
    setShowCookieConsent(false)
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences))
  }

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
              <a href="#how-it-works" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">How it Works</a>
              <a href="#features" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Features</a>
              <a href="#pricing" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">FAQ</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline">Connect Wallet</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="relative py-20 flex items-center justify-center overflow-hidden">
          {/* Dynamic Background */}
          <div className="hero-bg"></div>
          <svg className="absolute inset-0 w-full h-full hero-bg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="rgba(255,255,255,0.05)" d="M0,64L40,69.3C80,75,160,85,240,96C320,107,400,117,480,122.7C560,128,640,128,720,144C800,160,880,192,960,186.7C1040,181,1120,139,1200,112C1280,85,1360,75,1400,69.3L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
          </svg>

          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Hedge Against Real-World Events with Precision and Transparency
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              Protect your assets against unexpected events. Access objective data, tailored contracts, and automated payouts.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground w-full sm:w-auto"
                onClick={() => router.push('/waitlist')}
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-primary w-full sm:w-auto">
                Watch Demo <Play className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How Janka Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Explore Events", description: "Browse our marketplace of real-world events across various categories such as weather, commodities, and economic indicators." },
                { title: "Select Probability", description: "Choose your confidence level and stake amount. Our smart contracts automatically calculate potential payouts based on current market conditions." },
                { title: "Earn Payouts", description: "When the event concludes, Pyth Network's oracle data verifies the outcome. If your prediction is correct, receive instant payouts directly to your wallet." },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Janka</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Lock className="h-8 w-8 mb-4" />, title: "Transparent & Verifiable", description: "Every contract is secured on Solana blockchain and validated by Pyth Network's decentralized oracles." },
                { icon: <BarChart2 className="h-8 w-8 mb-4" />, title: "Tailored Contracts", description: "Customize your hedge with flexible probability ranges and stake amounts to match your risk profile." },
                { icon: <Zap className="h-8 w-8 mb-4" />, title: "Instant Auto-Payouts", description: "Smart contracts ensure immediate, trustless payouts upon event verification, eliminating delays and disputes." },
                { icon: <Shield className="h-8 w-8 mb-4" />, title: "Risk Management", description: "Protect your assets against unforeseen events and market volatility with our innovative hedging platform." },
              ].map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feature.icon}
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>


        <section id="pricing" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { title: "Basic", price: "Free", features: ["Access to public events", "Basic analytics", "Manual payouts", "Community support"] },
                { title: "Pro", price: "$49/month", features: ["All Basic features", "Custom event creation", "Advanced analytics", "Priority support", "Automated payouts"] },
                { title: "Enterprise", price: "Custom", features: ["All Pro features", "Dedicated account manager", "Custom integrations", "On-chain governance voting", "Bespoke risk management"] },
              ].map((plan, index) => (
                <Card key={index} className={`text-center ${index === 1 ? 'border-primary' : ''}`}>
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <div className="text-4xl font-bold my-4">{plan.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center justify-center">
                          <Check className="mr-2 h-4 w-4 text-green-500" /> {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={index === 1 ? 'bg-primary text-primary-foreground' : ''}>
                      {index === 2 ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                  <TabsTrigger value="legal">Legal & Compliance</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                  <Card>
                    <CardContent className="space-y-4 pt-6">
                      <div>
                        <h3 className="font-semibold">What is Janka?</h3>
                        <p>Janka is a decentralized platform for hedging against real-world events using blockchain technology and smart contracts.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">How do I get started?</h3>
                        <p>Sign up for an account, connect your Solana wallet, and explore available events to start hedging.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="technical">
                  <Card>
                    <CardContent className="space-y-4 pt-6">
                      <div>
                        <h3 className="font-semibold">What blockchain does Janka use?</h3>
                        <p>Janka operates on the Solana blockchain for fast, low-cost transactions and smart contract execution.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">How are event outcomes verified?</h3>
                        <p>We use Pyth Network&apos;s decentralized oracle system to provide reliable, tamper-proof data for event verification.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="legal">
                  <Card>
                    <CardContent className="space-y-4 pt-6">
                      <div>
                        <h3 className="font-semibold">Is Janka regulated?</h3>
                        <p>Janka operates in compliance with applicable laws and regulations. We continuously work with legal experts to ensure our platform meets all necessary requirements.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">How is my data protected?</h3>
                        <p>We employ industry-standard encryption and security measures to protect your personal and financial data. For more details, please refer to our Privacy Policy.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Secure Your Assets?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust Janka for transparent, decentralized hedging against real-world events.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground"
              onClick={() => router.push('/waitlist')}
            >
              Get Started Now <ArrowRight className="ml-2" />
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
                  <Link href="/blog/${post.slug}/${post.slug}/${post.slug}/${post.slug}/${post.slug}/${post.slug}/${post.slug}" legacyBehavior>
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
                  <Link href="#" legacyBehavior>
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

      {showCookieConsent && (
        <Dialog open={showCookieConsent} onOpenChange={setShowCookieConsent}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cookie Preferences</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking Accept All, you consent to our use of cookies.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Essential Cookies</span>
                  <Switch checked={cookiePreferences.essential} onCheckedChange={() => handleCookiePreferenceChange('essential')} disabled />
                </div>
                <div className="flex items-center justify-between">
                  <span>Performance Cookies</span>
                  <Switch checked={cookiePreferences.performance} onCheckedChange={() => handleCookiePreferenceChange('performance')} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Functional Cookies</span>
                  <Switch checked={cookiePreferences.functional} onCheckedChange={() => handleCookiePreferenceChange('functional')} />
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={savePreferences}>Save Preferences</Button>
                <Button onClick={acceptAllCookies}>Accept All</Button>
              </div>
              <div className="text-sm text-gray-500">
                <a href="#" className="underline">Privacy Policy</a> | <a href="#" className="underline">Terms of Use</a>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
