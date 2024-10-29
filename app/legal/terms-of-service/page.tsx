'use client'

import Head from 'next/head'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sun, Moon, Scale, Zap, Users, AlertTriangle, MessageSquare, Scroll, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function TermsOfService() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Janka Terms of Service | Clear, Fair, and Actually Readable</title>
        <meta name="description" content="Discover Janka's Terms of Service. We've made them clear, fair, and actually readable. Understand your rights and responsibilities while using our revolutionary prediction market platform." />
        <meta name="keywords" content="Janka, terms of service, user agreement, prediction markets, blockchain, transparency" />
        <link rel="canonical" href="https://janka-project.vercel.app/legal/terms-of-service" />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Terms of Service</h1>
            <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              We know, legal documents are usually a snooze-fest. But at Janka, we believe in clarity and fairness. So we have made our Terms of Service as clear and engaging as possible. Let&apos;s dive in!
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">TL;DR (Too Long; Did not Read)</CardTitle>
                <CardDescription>The quick version for those in a hurry</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must be 18+ to use Janka.</li>
                  <li>Be responsible and respectful when using our platform.</li>
                  <li>Your predictions and trades are your responsibility.</li>
                  <li>We are not liable for your losses or gains.</li>
                  <li>Do not do anything illegal or manipulative on our platform.</li>
                  <li>We can terminate your account if you violate these terms.</li>
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
                            <Users className="mr-2" />
                            Who Can Use Janka
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          You must be at least 18 years old and not barred from using cryptocurrency services in your jurisdiction. By using Janka, you are confirming that you meet these requirements.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Zap className="mr-2" />
                            Your Responsibilities
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          You are responsible for maintaining the security of your account, making informed predictions, and ensuring you have the necessary funds for your trades. Do not engage in any fraudulent or manipulative activities.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Scale className="mr-2" />
                            Our Responsibilities
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          We strive to provide a fair, transparent, and secure platform for prediction markets. However, we are not responsible for your trading decisions or any losses you might incur. We reserve the right to modify or terminate services as needed.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <AlertTriangle className="mr-2" />
                            Termination
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          We can suspend or terminate your account if you violate these terms or engage in any activity that we believe is harmful to Janka or other users. You can also choose to close your account at any time.
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
                        <h3 className="text-lg font-semibold mb-2">1. Acceptance of Terms</h3>
                        <p>By accessing or using Janka, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">2. Eligibility</h3>
                        <p>You must be at least 18 years old and not barred from using cryptocurrency services in your jurisdiction to use Janka. By using our services, you represent and warrant that you meet all eligibility requirements.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">3. Account Registration and Security</h3>
                        <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must immediately notify Janka of any unauthorized use of your account.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">4. Use of Services</h3>
                        <p>You agree to use Janka&apos;s services only for lawful purposes and in accordance with these Terms. You are prohibited from using the platform to engage in any fraudulent, manipulative, or illegal activities.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">5. Prediction Markets and Trading</h3>
                        <p>All predictions and trades made on Janka are your sole responsibility. We do not provide financial advice, and you should conduct your own research before making any decisions. You acknowledge that trading in prediction markets involves risk, and you may lose your invested funds.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">6. Intellectual Property</h3>
                        <p>The Janka platform, including all content, features, and functionality, is owned by Janka and protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">7. Limitation of Liability</h3>
                        <p>Janka and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">8. Modifications to the Service</h3>
                        <p>Janka reserves the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. You agree that Janka shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">9. Termination</h3>
                        <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the service will immediately cease.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">10. Governing Law</h3>
                        <p>These Terms shall be governed and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Have questions about our terms?</h2>
              <p className="mb-6">Our legal team is here to help clarify any points. Reach out anytime!</p>
              <Button>
                Contact Legal Team <MessageSquare className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment to You</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Scale className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Fair and Transparent</CardTitle>
                </CardHeader>
                <CardContent>
                  We are committed to providing a level playing field for all users. Our terms are designed to protect both you and the integrity of our platform.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ShieldCheck className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Your Security First</CardTitle>
                </CardHeader>
                <CardContent>
                  We have implemented robust security measures to protect your account and funds. Your safety is our top priority.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Scroll className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Clear Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  We believe in clear, jargon-free communication. If something&apos;s not clear, we&apos;re always here to explain.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Janka. All rights reserved.</p>
          <p className="mt-2">Revolutionizing prediction markets with fairness and transparency.</p>
          <div className="mt-4">
            <Badge variant="outline" className="mr-2">User-Centric</Badge>
            <Badge variant="outline" className="mr-2">Blockchain-Powered</Badge>
            <Badge variant="outline">Fair Play</Badge>
          </div>
          <div className="mt-6">
            <Link href="/legal/privacy-policy" className="text-sm hover:underline mr-4">Privacy Policy</Link>
            <Link href="/legal/terms-of-service" className="text-sm hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}