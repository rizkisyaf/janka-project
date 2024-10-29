import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

export default function JankaTeams() {
  const teamMembers = [
    {
      name: "Your Name",
      role: "Founder",
      image: "/janka-logo.svg?height=300&width=300",
      bio: "Experienced entrepreneur with a background in cafe management. Passionate about leveraging blockchain technology to revolutionize the insurance industry.",
      social: {
        twitter: "https://twitter.com/founder",
        linkedin: "https://linkedin.com/in/founder",
        github: "https://github.com/founder"
      }
    },
    {
      name: "Designer Name",
      role: "UI/UX Designer",
      image: "/janka-logo.svg?height=300&width=300",
      bio: "Creative designer with a keen eye for user-centric interfaces. Dedicated to making Janka's platform intuitive and visually appealing.",
      social: {
        twitter: "https://twitter.com/designer",
        linkedin: "https://linkedin.com/in/designer"
      }
    },
    {
      name: "Mentor Name",
      role: "Early Supporter & Mentor",
      image: "/janka-logo.svg?height=300&width=300",
      bio: "Seasoned industry veteran providing invaluable guidance and support to the Janka team. Committed to helping realize the vision of decentralized, event-based insurance.",
      social: {
        linkedin: "https://linkedin.com/in/mentor"
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/janka-logo.svg?height=40&width=40" alt="Janka Logo" className="h-10 w-10" />
            <span className="text-xl font-bold">Janka</span>
          </div>
          <Button>Get Started</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The passionate individuals behind Janka, working to revolutionize event-based insurance through blockchain technology.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-2xl mb-2">{member.name}</CardTitle>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="mb-4">{member.bio}</p>
                <div className="flex space-x-4">
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We are always looking for passionate individuals to help us shape the future of insurance. If you are excited about blockchain and insurtech, we do love to hear from you!
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground">
            View Open Positions
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