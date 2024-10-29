import Head from 'next/head'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sun, Moon, Shield, Eye, Lock, Server, MessageSquare } from 'lucide-react'
import Image from 'next/image'

export default function PrivacyPolicy() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Janka Privacy Policy | Clear, Simple, and Actually Readable</title>
        <meta name="description" content="Discover Janka's commitment to your privacy. Our policy is clear, simple, and actually readable. Learn how we protect your data while revolutionizing prediction markets." />
        <meta name="keywords" content="Janka, privacy policy, data protection, prediction markets, blockchain, transparency" />
        <link rel="canonical" href="https://www.janka.com/privacy-policy" />
      </Head>

      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/janka-logo.svg" alt="Janka Logo" width={40} height={40} />
            <span className="text-xl font-bold">Janka</span>
          </div>
          <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
            <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              We know, privacy policies are usually boring. But at Janka, we believe in transparency and actually want you to read this. So we've made it as clear and engaging as possible. Let's dive in!
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">TL;DR (Too Long; Didn't Read)</CardTitle>
                <CardDescription>The quick version for those in a hurry</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We collect only what we need to provide and improve our services.</li>
                  <li>Your prediction market activities are on the blockchain and pseudonymous.</li>
                  <li>We use industry-standard security measures to protect your data.</li>
                  <li>We don't sell your personal data. Ever.</li>
                  <li>You have control over your data and can request changes or deletion.</li>
                </ul>
              </CardContent>
            </Card>

            <Tabs defaultValue="simplified" className="mb-12">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="simplified">Simplified Version</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Version</TabsTrigger>
              </TabsList>
              <TabsContent value="simplified">
                <Card>
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Eye className="mr-2" />
                            What We Collect
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          We collect your email, wallet address, and transaction data. Your predictions and market activities are recorded on the blockchain under your pseudonymous address.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Server className="mr-2" />
                            How We Use Your Data
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          We use your data to operate Janka, improve our services, and communicate with you. We analyze aggregated data to enhance our prediction markets and user experience.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Lock className="mr-2" />
                            How We Protect Your Data
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          We use encryption, secure servers, and regular security audits. Your wallet's private keys are never stored on our servers. We follow industry best practices to keep your data safe.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Shield className="mr-2" />
                            Your Rights and Choices
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          You can access, correct, or delete your personal data at any time. You can also opt-out of non-essential communications. Remember, blockchain transactions are immutable, so choose your predictions wisely!
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="detailed">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
                        <p>We collect the following types of information:</p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>Email address (for account creation and communications)</li>
                          <li>Wallet address (for transaction processing and identity verification)</li>
                          <li>Transaction data (predictions, trades, and other on-chain activities)</li>
                          <li>Usage data (how you interact with our platform)</li>
                          <li>Device and browser information (for security and optimization purposes)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">2. How We Use Your Information</h3>
                        <p>We use your information for the following purposes:</p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>To provide and maintain our services</li>
                          <li>To process transactions and manage your account</li>
                          <li>To improve and optimize our platform</li>
                          <li>To communicate with you about your account and our services</li>
                          <li>To comply with legal obligations</li>
                          <li>To detect and prevent fraud or abuse</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">3. Data Sharing and Disclosure</h3>
                        <p>We may share your information in the following circumstances:</p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>With service providers who help us operate our platform</li>
                          <li>In response to legal requests or to comply with applicable laws</li>
                          <li>To protect our rights, privacy, safety, or property</li>
                          <li>In connection with a merger, sale, or acquisition of our company</li>
                        </ul>
                        <p className="mt-2">We do not sell your personal information to third parties.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">4. Your Rights and Choices</h3>
                        <p>You have the following rights regarding your personal information:</p>
                        <ul className="list-disc pl-6 mt-2">
                          <li>Access and update your information</li>
                          <li>Request deletion of your personal data</li>
                          <li>Object to processing of your information</li>
                          <li>Data portability (receive your data in a structured format)</li>
                          <li>Withdraw consent for data processing</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">5. Data Retention and Security</h3>
                        <p>We retain your personal information for as long as necessary to provide our services and comply with legal obligations. We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">6. International Data Transfers</h3>
                        <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in these cases.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">7. Changes to This Policy</h3>
                        <p>We may update this privacy policy from time to time. We will notify you of any significant changes by email or through our platform.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="mb-6">We're here to help! Reach out to our friendly privacy team.</p>
              <Button>
                Contact Us <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Privacy Commitment</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Your Data, Your Control</CardTitle>
                </CardHeader>
                <CardContent>
                  We believe in giving you full control over your data. Access, update, or delete your information anytime.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Bank-Grade Security</CardTitle>
                </CardHeader>
                <CardContent>
                  We use state-of-the-art encryption and security measures to keep your data safe and sound.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Eye className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Transparency First</CardTitle>
                </CardHeader>
                <CardContent>
                  We're committed to being open about our data practices. No hidden agendas, no fine print.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Janka. All rights reserved.</p>
          <p className="mt-2">Protecting your privacy while revolutionizing prediction markets.</p>
          <div className="mt-4">
            <Badge variant="outline" className="mr-2">Privacy-First</Badge>
            <Badge variant="outline" className="mr-2">Blockchain-Powered</Badge>
            <Badge variant="outline">User-Centric</Badge>
          </div>
        </div>
      </footer>
    </div>
  )
}