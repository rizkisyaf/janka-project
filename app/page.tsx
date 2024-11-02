'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, BarChart2, Lock, Zap, Sun, Moon, Play, DollarSign, Shield, Briefcase, Check, ChevronDown, Globe, Cpu, Users, Umbrella, TrendingUp, AlertTriangle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
]

const lifeActivities = [
  { value: "employment", label: "Regular Employment" },
  { value: "self-employment", label: "Self-Employment or Freelancing" },
  { value: "retirement", label: "Retirement" },
  { value: "student", label: "Student" },
  { value: "homemaker", label: "Homemaker" },
  { value: "job-seeking", label: "Job Seeking" },
  { value: "travel", label: "Frequent Travel" },
  { value: "health-issues", label: "Managing Health Issues" },
  { value: "caregiving", label: "Caregiving for Family" },
  { value: "real-estate", label: "Real Estate Ownership" },
  { value: "investing", label: "Active Investing" },
  { value: "small-business", label: "Running a Small Business" },
]

export default function AdvancedLandingPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [showCookieConsent, setShowCookieConsent] = useState(true)
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    performance: false,
    functional: false,
  })
  const [footerEmail, setFooterEmail] = useState('')
  const [selectedRiskCategory, setSelectedRiskCategory] = useState('weather')
  const [currentActivity, setCurrentActivity] = useState('')
  const [riskAnalysis, setRiskAnalysis] = useState('')
  const router = useRouter()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setCookiePreferences(prev => ({ ...prev, [type]: !prev[type] }))
  }

  const acceptAllCookies = () => {
    const allAccepted = { essential: true, performance: true, functional: true }
    setCookiePreferences(allAccepted)
    setShowCookieConsent(false)
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted))
  }

  const savePreferences = () => {
    setShowCookieConsent(false)
    localStorage.setItem('cookieConsent', JSON.stringify(cookiePreferences))
  }

  const handleFooterSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
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

  const analyzeRisk = () => {
    if (!currentActivity) {
      setRiskAnalysis('Please select your current life situation to analyze risk.')
      return
    }

    const riskAnalyses = {
      "employment": "Regular employment provides stability, but consider risks like job loss, wage stagnation, or industry disruptions. Income protection insurance and building an emergency fund can help mitigate these risks.",
      "self-employment": "Self-employment offers flexibility but comes with income instability and potential business risks. Consider business insurance, income protection, and maintaining a diverse client base to manage risk.",
      "retirement": "Retirees face risks such as outliving savings, healthcare costs, and inflation. A diversified investment portfolio and long-term care insurance can help manage these risks.",
      "student": "Students may face risks related to future job market conditions, student loan debt, and potential changes in education costs. Consider income protection insurance for the future and start building an emergency fund early.",
      "homemaker": "Homemakers may face risks related to financial dependency, gaps in employment history, and lack of retirement savings. Life insurance for the earning spouse and developing marketable skills can help mitigate these risks.",
      "job-seeking": "Job seekers face immediate income risk and potential long-term career impacts. Temporary income protection, networking, and skill development can help manage these risks.",
      "travel": "Frequent travelers face risks such as trip cancellations, lost luggage, and medical emergencies in foreign locations. Comprehensive travel insurance can provide protection against these risks.",
      "health-issues": "Those managing health issues face risks related to medical costs, potential loss of income, and long-term care needs. Health insurance, disability insurance, and long-term care insurance are crucial for risk management.",
      "caregiving": "Caregivers may face risks related to lost income, personal health issues due to stress, and future employment challenges. Respite care services and support groups can help manage these risks.",
      "real-estate": "Real estate ownership involves risks such as property damage, liability claims, and market value fluctuations. Proper insurance coverage and diversification can help manage these risks.",
      "investing": "Active investing carries market risks, potential for capital loss, and liquidity risks. Diversification, thorough research, and possibly seeking professional advice can help manage these risks.",
      "small-business": "Running a small business involves various risks including market changes, cash flow issues, and liability concerns. Business insurance, diversification of products/services, and building an emergency fund are crucial risk management strategies."
    }

    setRiskAnalysis(riskAnalyses[currentActivity as keyof typeof riskAnalyses] || "Based on the selected life situation, we couldn't determine specific risks. For a more accurate analysis, please consult with a financial advisor or insurance professional.")
  }

  return (
    <div className={`min-h-screen ${mounted ? (darkMode ? 'dark' : '') : ''}`}>
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/janka-logo.svg" alt="Janka Logo" width={40} height={40} priority />
            <span className="text-xl font-bold">Janka</span>
            <nav className="hidden md:flex space-x-4">
              <a href="#how-it-works" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">How it Works</a>
              <a href="#features" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Precision Hedging for the Digital Age
              </motion.h1>
              <motion.p
                className="text-xl mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Protect your assets with blockchain-powered, data-driven risk management solutions.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button size="lg" className="bg-primary text-primary-foreground w-full sm:w-auto" onClick={() => router.push('/waitlist')}>
                  Get Started <ArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-primary w-full sm:w-auto">
                  Watch Demo <Play className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Understanding Janka: Your Shield Against Uncertainty</h2>

            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg mb-4">
                Imagine if you could protect yourself from bad things happening in the world, just like how an umbrella protects you from rain. That&apos;s what Janka does, but for grown-up problems!
              </p>
              <p className="text-lg mb-4">
                Janka is not a place for gambling or playing games with money. Instead, it&apos;s a smart tool that helps people and businesses stay safe when unexpected things happen in the real world.
              </p>
            </div>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-primary" />
                  How Janka Works: A Simple Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Let&apos;s say you&apos;re a farmer growing apples. You&apos;re worried it might not rain enough this year, which could hurt your apple trees. Here&apos;s how Janka could help:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>You come to Janka and say, &quot;I want protection if it doesn&apos;t rain enough this summer.&quot;</li>
                  <li>Janka creates a special agreement just for this.</li>
                  <li>Other people who think it will rain can take the other side of this agreement.</li>
                  <li>If it doesn&apos;t rain enough, you get money to help with your farm. If it rains plenty, you don&apos;t get money, but your apples grow well!</li>
                </ol>
                <p className="mt-4">This way, you&apos;re protected no matter what happens with the rain. It&apos;s like a safety net for your farm.</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="business" className="mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="business">For Businesses</TabsTrigger>
                <TabsTrigger value="individual">For Individuals</TabsTrigger>
              </TabsList>
              <TabsContent value="business">
                <Card>
                  <CardHeader>
                    <CardTitle>Protecting Your Business with Janka</CardTitle>
                    <CardDescription>Real-world examples of how businesses can use Janka</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Umbrella className="mr-2 h-5 w-5 text-primary mt-1" />
                        <div>
                          <strong>Event Planning Company:</strong> Protect against unexpected weather cancellations for outdoor events.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary mt-1" />
                        <div>
                          <strong>Import/Export Business:</strong> Guard against currency exchange rate fluctuations.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="mr-2 h-5 w-5 text-primary mt-1" />
                        <div>
                          <strong>Tech Startup:</strong> Safeguard against delays in product launch due to supply chain issues.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="individual">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Protection with Janka</CardTitle>
                    <CardDescription>How individuals can benefit from Janka&apos;s platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <Umbrella className="mr-2 h-5 w-5 text-primary mt-1" />
                        <div>
                          <strong>Vacation Planning:</strong> Protect your beach vacation investment against unexpected rainy weather.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary mt-1" />
                        <div>
                          <strong>Homeowners:</strong> Guard against unexpected increases in property taxes or utility costs.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <AlertTriangle className="mr-2 h-5 w-5 text-primary mt-1" />
                        <div>
                          <strong>Gig Workers:</strong> Protect your income against potential changes in platform policies or market conditions.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-primary" />
                  Janka: Insurance, Not Gambling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">What Janka Is:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>A platform for protecting against real-world risks</li>
                      <li>Based on verifiable events and data</li>
                      <li>Designed to provide financial security</li>
                      <li>Regulated and transparent</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What Janka Is Not:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Not a place for betting on random outcomes</li>
                      <li>Not based on chance or luck</li>
                      <li>Not designed for entertainment or thrill-seeking</li>
                      <li>Not an unregulated or opaque platform</li>
                    </ul>
                  </div>
                </div>

              </CardContent>
            </Card>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How Janka Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: <Globe className="h-12 w-12 mb-4 text-primary" />, title: "Identify Risk", description: "Select from a wide range of real-world events across various categories such as weather, commodities, and economic indicators." },
                { icon: <Cpu className="h-12 w-12 mb-4 text-primary" />, title: "Smart Contract Creation", description: "Our AI-powered system generates a tailored smart contract based on your specific risk parameters and chosen event." },
                { icon: <Shield className="h-12 w-12 mb-4 text-primary" />, title: "Automated Protection", description: "When the event concludes, Pyth Network's oracle data verifies the outcome, triggering instant payouts if conditions are met." },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-full p-6 inline-block mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Advanced Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Lock className="h-8 w-8 mb-4 text-primary" />, title: "Blockchain Security", description: "Every contract is secured on Solana blockchain, ensuring transparency and immutability." },
                { icon: <BarChart2 className="h-8 w-8 mb-4 text-primary" />, title: "Real-time Analytics", description: "Access comprehensive dashboards with real-time data on your risk exposure and contract performance." },
                { icon: <Zap className="h-8 w-8 mb-4 text-primary" />, title: "Instant Settlements", description: "Smart contracts enable immediate, trustless payouts upon event verification." },
                { icon: <Users className="h-8 w-8 mb-4 text-primary" />, title: "Multi-party Hedging", description: "Collaborate with partners to create shared risk management strategies." },
                { icon: <Cpu className="h-8 w-8 mb-4 text-primary" />, title: "AI-Driven Insights", description: "Leverage machine learning algorithms to optimize your hedging strategies." },
                { icon: <Globe className="h-8 w-8 mb-4 text-primary" />, title: "Global Event Coverage", description: "Access a wide range of international events and indicators for comprehensive risk management." },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {feature.icon}
                        <span className="ml-2">{feature.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Explore Risk Categories</h2>
            <div className="max-w-4xl mx-auto">
              <Select value={selectedRiskCategory} onValueChange={setSelectedRiskCategory}>
                <SelectTrigger className="w-full mb-8">
                  <SelectValue placeholder="Select a risk category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weather">Weather Events</SelectItem>
                  <SelectItem value="financial">Financial Indicators</SelectItem>
                  <SelectItem value="geopolitical">Geopolitical Events</SelectItem>
                  <SelectItem value="commodity">Commodity Prices</SelectItem>
                </SelectContent>
              </Select>
              <Card>
                <CardHeader>
                  <CardTitle>Risk Exposure Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Risk Analyzer</h2>
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Analyze Your Current Risk</CardTitle>
                  <CardDescription>Select your current life situation to get a risk analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Select value={currentActivity} onValueChange={setCurrentActivity}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your current situation" />
                      </SelectTrigger>
                      <SelectContent>
                        {lifeActivities.map((activity) => (
                          <SelectItem key={activity.value} value={activity.value}>
                            {activity.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={analyzeRisk} className="w-full">Analyze Risk</Button>
                    {riskAnalysis && (
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle>Risk Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{riskAnalysis}</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Flexible Pricing Plans</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { title: "Basic", price: "Free", features: ["Access to public events", "Basic analytics", "Manual payouts", "Community support"] },
                { title: "Pro", price: "$49/month", features: ["All Basic features", "Custom event creation", "Advanced analytics", "Priority support", "Automated payouts"] },
                { title: "Enterprise", price: "Custom", features: ["All Pro features", "Dedicated account manager", "Custom integrations", "On-chain governance voting", "Bespoke risk management"] },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <Card className={`text-center ${index === 1 ? 'border-primary' : ''}`}>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900">
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
                        <p>Janka is an advanced insurtech platform that uses blockchain technology and smart contracts to provide precise hedging solutions against real-world events.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">How does Janka differ from traditional insurance?</h3>
                        <p>Janka offers more flexibility, transparency, and efficiency than traditional insurance. Our smart contracts automate payouts based on verifiable data, eliminating the need for claims processing.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="technical">
                  <Card>
                    <CardContent className="space-y-4 pt-6">
                      <div>
                        <h3 className="font-semibold">What blockchain does Janka use?</h3>
                        <p>Janka operates on the Solana blockchain, chosen for its high speed, low cost, and robust smart contract capabilities.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">How are event outcomes verified?</h3>
                        <p>We use Pyth Network&apos;s decentralized oracle system to provide reliable, tamper-proof data for event verification, ensuring the integrity of our smart contracts.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="legal">
                  <Card>
                    <CardContent className="space-y-4 pt-6">
                      <div>
                        <h3 className="font-semibold">Is Janka regulated?</h3>
                        <p>Janka operates in compliance with applicable laws and regulations. We work closely with legal experts and regulatory bodies to ensure our platform meets all necessary requirements.</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">How is my data protected?</h3>
                        <p>We employ industry-standard encryption and security measures to protect your personal and financial data. Our use of blockchain technology also adds an extra layer of security and transparency.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Revolutionize Your Risk Management?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of forward-thinking businesses and individuals who trust Janka for precise, transparent, and efficient hedging against real-world events.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
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
                <li><Link href="/about" className="hover:text-gray-300 transition-colors">Our Story</Link></li>
                <li><Link href="/team" className="hover:text-gray-300 transition-colors">Team</Link></li>
                <li><Link href="/careers" className="hover:text-gray-300 transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-gray-300 transition-colors">Press Kit</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/docs" className="hover:text-gray-300 transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-gray-300 transition-colors">API Reference</Link></li>
                <li><Link href="/community" className="hover:text-gray-300 transition-colors">Community Forum</Link></li>
                <li><Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-gray-300 transition-colors">Cookie Policy</Link></li>
                <li><Link href="/compliance" className="hover:text-gray-300 transition-colors">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
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
            <p>&copy; {new Date().getFullYear()} Janka. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showCookieConsent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5"
          >
            <div className="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="p-2 rounded-lg bg-primary shadow-lg sm:p-3">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="w-0 flex-1 flex items-center">
                    <p className="ml-3 font-medium text-white truncate">
                      <span className="md:hidden">We use cookies</span>
                      <span className="hidden md:inline">We use cookies to enhance your browsing experience.</span>
                    </p>
                  </div>
                  <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                    <Button onClick={acceptAllCookies} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary bg-white hover:bg-primary-foreground">
                      Accept All
                    </Button>
                  </div>
                  <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
                    <Button onClick={() => setShowCookieConsent(false)} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-foreground hover:bg-primary-foreground/90">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}