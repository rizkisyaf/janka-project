'use client'

import Head from 'next/head'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Sun, Moon, Cookie, Shield, Zap, Settings, MessageSquare, Trash2, ToggleLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function CookiesPolicy() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Janka Cookies Policy | Clear, Transparent, and Actually Digestible</title>
        <meta name="description" content="Discover Janka's Cookies Policy. We've made it clear, transparent, and actually digestible. Understand how we use cookies to enhance your experience on our revolutionary prediction market platform." />
        <meta name="keywords" content="Janka, cookies policy, user privacy, prediction markets, blockchain, transparency" />
        <link rel="canonical" href="https://janka-project.vercel.app/legal/cookies-policy" />
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Cookies Policy</h1>
            <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              We know, cookies sounds delicious, but we are not talking about the edible kind. Lets break down how Janka uses digital cookies to enhance your experience, in a way that is actually digestible!
            </p>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">TL;DR (Too Long; Did not Read)</CardTitle>
                <CardDescription>The quick version for those in a hurry</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We use cookies to make Janka work better for you.</li>
                  <li>Some cookies are essential for the site to function properly.</li>
                  <li>We use analytics cookies to understand how you use our site.</li>
                  <li>You can control which non-essential cookies you accept.</li>
                  <li>We never sell your cookie data to third parties.</li>
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
                            <Cookie className="mr-2" />
                            What Are Cookies?
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and how you use it, making your next visit easier and the site more useful to you.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Zap className="mr-2" />
                            How We Use Cookies
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          We use cookies to remember your preferences, keep you logged in, understand how you use Janka, and improve our services. Some cookies are essential for the site to work properly, while others are optional but help us serve you better.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Shield className="mr-2" />
                            Your Privacy and Choices
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          We respect your privacy. You can control which non-essential cookies you accept through your browser settings or our cookie preferences center. Refusing some cookies may impact your experience on our site.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <div className="flex items-center">
                            <Settings className="mr-2" />
                            Managing Your Cookie Preferences
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          You can change your cookie preferences at any time. Visit our cookie preferences center or adjust your browser settings. Remember, some cookies are essential for Janka to function properly and can not be disabled.
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
                        <h3 className="text-lg font-semibold mb-2">1. Introduction</h3>
                        <p>This Cookies Policy explains how Janka (we, us, our) uses cookies and similar technologies to recognize you when you visit our website at https://janka-project.vercel.app (Website). It explains what these technologies are and why we use them, as well as your rights to control our use of them.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">2. What are cookies?</h3>
                        <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">3. Why do we use cookies?</h3>
                        <p>We use first party and third party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as essential or strictly necessary cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">4. Types of cookies we use</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li><strong>Essential cookies:</strong> These are cookies that are required for the operation of our Website. They include, for example, cookies that enable you to log into secure areas of our Website or use our prediction market platform.</li>
                          <li><strong>Analytical/performance cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our Website when they are using it. This helps us to improve the way our Website works, for example, by ensuring that users are finding what they are looking for easily.</li>
                          <li><strong>Functionality cookies:</strong> These are used to recognize you when you return to our Website. This enables us to personalize our content for you, greet you by name and remember your preferences (for example, your choice of language or region).</li>
                          <li><strong>Targeting cookies:</strong> These cookies record your visit to our Website, the pages you have visited and the links you have followed. We will use this information to make our Website and the advertising displayed on it more relevant to your interests.</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">5. How can you control cookies?</h3>
                        <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner or through our cookie preferences center.</p>
                        <p>You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">6. How often will we update this Cookies Policy?</h3>
                        <p>We may update this Cookies Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookies Policy regularly to stay informed about our use of cookies and related technologies.</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">7. Where can you get further information?</h3>
                        <p>If you have any questions about our use of cookies or other technologies, please email us at privacy@janka.com or use the contact form on our website.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Want to adjust your cookie preferences?</h2>
              <p className="mb-6">You can customize your cookie settings at any time. It is quick and easy!</p>
              <Button>
                Open Cookie Preferences <Settings className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Our Cookie Commitment</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Shield className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  We prioritize your privacy. We only use cookies that are necessary or significantly improve your experience.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <ToggleLeft className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>You are in Control</CardTitle>
                </CardHeader>
                <CardContent>
                  We give you the power to control your cookie preferences. You decide what non-essential cookies to accept.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Trash2 className="h-12 w-12 mb-4 mx-auto text-primary" />
                  <CardTitle>Regular Clean-up</CardTitle>
                </CardHeader>
                <CardContent>
                  We regularly review and clean up our cookies to ensure we are only collecting what is necessary to improve your experience.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Janka. All rights reserved.</p>
          <p className="mt-2">Ensuring transparency in our use of cookies and your data.</p>
          <div className="mt-4">
            <Badge variant="outline" className="mr-2">Privacy-Focused</Badge>
            <Badge variant="outline" className="mr-2">User Control</Badge>
            <Badge variant="outline">Transparency</Badge>
          </div>
          <div className="mt-6">
            <Link href="/legal/privacy-policy" className="text-sm hover:underline mr-4">Privacy Policy</Link>
            <Link href="/legal/terms-of-service" className="text-sm hover:underline mr-4">Terms of Service</Link>
            <Link href="/legal/cookies-policy" className="text-sm hover:underline">Cookies Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}