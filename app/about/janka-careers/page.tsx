import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, Briefcase, Users, Zap, Coffee } from 'lucide-react'
import Image from 'next/image'

export default function JankaCareers() {
  const jobOpenings = [
    {
      title: "Blockchain Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "We're looking for an experienced blockchain developer to help build and maintain our Solana-based smart contracts and integrate with Pyth Network oracles."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Hybrid",
      type: "Full-time",
      description: "Join our product team to help shape the future of decentralized insurance products and drive Janka's product strategy."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "We're seeking a talented UX/UI designer to create intuitive and engaging user experiences for our web and mobile applications."
    },
    {
      title: "Marketing Specialist",
      department: "Marketing",
      location: "On-site",
      type: "Full-time",
      description: "Help us spread the word about Janka's innovative insurance solutions and grow our user base through creative marketing campaigns."
    },
  ]

  const benefits = [
    "Competitive salary and equity package",
    "Remote-first work environment",
    "Flexible working hours",
    "Health, dental, and vision insurance",
    "Professional development budget",
    "Regular team retreats and events",
    "Opportunity to shape the future of decentralized finance"
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
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
            <span className="text-xl font-bold">Janka</span>
          </div>
          <Button>Apply Now</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Join the Janka Team</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Help us revolutionize the insurance industry with blockchain technology and create a more secure future for businesses worldwide.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Work at Janka?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Zap className="h-8 w-8 mb-4" />, title: "Innovative Technology", description: "Work with cutting-edge blockchain and DeFi technologies." },
              { icon: <Users className="h-8 w-8 mb-4" />, title: "Collaborative Culture", description: "Join a diverse team of passionate problem-solvers." },
              { icon: <Briefcase className="h-8 w-8 mb-4" />, title: "Career Growth", description: "Opportunities for rapid advancement and skill development." },
              { icon: <Coffee className="h-8 w-8 mb-4" />, title: "Work-Life Balance", description: "Flexible schedules and remote-first environment." },
            ].map((perk, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle>{perk.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {perk.icon}
                  <p>{perk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
              <TabsTrigger value="all">All Departments</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
            </TabsList>
            {["all", "engineering", "product", "design", "marketing"].map((dept) => (
              <TabsContent key={dept} value={dept}>
                <div className="grid gap-4">
                  {jobOpenings
                    .filter((job) => dept === "all" || job.department.toLowerCase() === dept)
                    .map((job, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle>{job.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2"><strong>Department:</strong> {job.department}</p>
                          <p className="mb-2"><strong>Location:</strong> {job.location}</p>
                          <p className="mb-4"><strong>Type:</strong> {job.type}</p>
                          <p className="mb-4">{job.description}</p>
                          <Button>
                            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Benefits & Perks</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the hiring process like at Janka?</AccordionTrigger>
              <AccordionContent>
                Our hiring process typically involves an initial application review, a phone screen, one or two technical or role-specific interviews, and a final culture fit interview. We aim to make decisions quickly and keep candidates informed throughout the process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do you offer internship opportunities?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer internship opportunities in various departments throughout the year. Please check our job listings or reach out to our HR team for current availability.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What is your remote work policy?</AccordionTrigger>
              <AccordionContent>
                Janka is a remote-first company. While we have a physical office, most of our team works remotely. We believe in giving our employees the flexibility to work from where they are most productive.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How does Janka support professional development?</AccordionTrigger>
              <AccordionContent>
                We provide a yearly budget for each employee to use for conferences, courses, books, or other learning resources. We also encourage internal knowledge sharing through regular tech talks and workshops.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in our mission to revolutionize the insurance industry with blockchain technology. Apply now and be part of something extraordinary.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground">
            View All Openings <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 dark:bg-gray-900 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Janka. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}