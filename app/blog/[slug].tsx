import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { ArrowRight, Sun, Moon, Search, Facebook, Twitter, Linkedin } from 'lucide-react'
import RSS from 'rss'
import fs from 'fs'
import path from 'path'

// Mock data for blog posts (in a real application, this would come from a database or CMS)
const blogPosts = [
  {
    id: 1,
    title: "Understanding Prediction Markets: A Beginner's Guide",
    excerpt: "Dive into the world of prediction markets and learn how they work, their benefits, and how you can participate.",
    author: "Jane Doe",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "/blog/prediction-markets-guide.jpg",
    slug: "understanding-prediction-markets",
    content: "Full content of the blog post goes here..."
  },
  {
    id: 2,
    title: "The Role of Blockchain in Decentralized Finance",
    excerpt: "Explore how blockchain technology is revolutionizing the financial industry and enabling new forms of decentralized markets.",
    author: "John Smith",
    date: "2024-03-10",
    readTime: "7 min read",
    image: "/blog/blockchain-defi.jpg",
    slug: "blockchain-in-defi",
    content: "Full content of the blog post goes here..."
  },
  {
    id: 3,
    title: "Janka's Approach to Market Liquidity",
    excerpt: "Learn about Janka's innovative strategies for ensuring market liquidity and fair pricing in prediction markets.",
    author: "Alice Johnson",
    date: "2024-03-05",
    readTime: "6 min read",
    image: "/blog/janka-liquidity.jpg",
    slug: "janka-market-liquidity",
    content: "Full content of the blog post goes here..."
  },
  // Add more blog posts as needed
]

// Target keywords for Janka
const targetKeywords = [
  "prediction markets",
  "decentralized finance",
  "blockchain technology",
  "market liquidity",
  "smart contracts",
  "cryptocurrency trading",
  "financial forecasting",
  "risk management",
  "event contracts",
  "decentralized platforms"
]

interface BlogPageProps {
  posts: typeof blogPosts
  currentPage: number
  totalPages: number
}

export const getStaticProps: GetStaticProps<BlogPageProps> = async () => {
  // In a real application, you would fetch posts from a database or CMS here
  const postsPerPage = 6
  const currentPage = 1
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

  // Generate sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.janka.com/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      ${blogPosts.map(post => `
        <url>
          <loc>https://www.janka.com/blog/${post.slug}</loc>
          <lastmod>${new Date(post.date).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `).join('')}
    </urlset>`

  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap)

  // Generate RSS feed
  const feed = new RSS({
    title: 'Janka Blog',
    description: 'Insights and updates on prediction markets, decentralized finance, and blockchain technology from the Janka team.',
    feed_url: 'https://www.janka.com/rss.xml',
    site_url: 'https://www.janka.com',
    image_url: 'https://www.janka.com/logo.png',
    language: 'en',
    pubDate: new Date(),
  })

  blogPosts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://www.janka.com/blog/${post.slug}`,
      date: new Date(post.date),
      author: post.author,
    })
  })

  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), feed.xml())

  return {
    props: {
      posts: blogPosts.slice(0, postsPerPage),
      currentPage,
      totalPages,
    },
  }
}

export default function BlogPage({ posts, currentPage, totalPages }: BlogPageProps) {
  const [darkMode, setDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, posts])

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Janka Blog",
    "description": "Insights and updates on prediction markets, decentralized finance, and blockchain technology from the Janka team.",
    "url": "https://www.janka.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Janka",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.janka.com/logo.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": post.date,
      "image": `https://www.janka.com${post.image}`,
      "url": `https://www.janka.com/blog/${post.slug}`
    }))
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Janka Blog: Insights on Prediction Markets and DeFi</title>
        <meta name="description" content="Explore the latest insights on prediction markets, decentralized finance, and blockchain technology from the Janka team." />
        <meta name="keywords" content={targetKeywords.join(', ')} />
        <meta property="og:title" content="Janka Blog: Insights on Prediction Markets and DeFi" />
        <meta property="og:description" content="Explore the latest insights on prediction markets, decentralized finance, and blockchain technology from the Janka team." />
        <meta property="og:image" content="https://www.janka.com/og-image.jpg" />
        <meta property="og:url" content="https://www.janka.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.janka.com/blog" />
        <link rel="alternate" type="application/rss+xml" title="Janka Blog RSS Feed" href="https://www.janka.com/rss.xml" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>

      <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image src="/janka-logo.svg" alt="Janka Logo" width={40} height={40} />
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Home</Link>
              <Link href="/explore-markets" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Explore Markets</Link>
              <Link href="/how-it-works" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">How it Works</Link>
              <Link href="/blog" className="text-sm font-medium text-primary">Blog</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline">Connect Wallet</Button>
          </div>
        </div>
      </header>

      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Janka Blog</h1>
            <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-gray-600 dark:text-gray-400">
              Insights and updates on prediction markets, decentralized finance, and blockchain technology from the Janka team.
            </p>

            <div className="mb-8 relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search blog posts..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      width={400} 
                      height={200} 
                      className="rounded-t-lg"
                      loading="lazy"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="mb-2">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>{post.author} • {post.date}</p>
                      <p>{post.readTime}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://www.janka.com/blog/${post.slug}`, '_blank')}>
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Share on Facebook</span>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => window.open(`https://twitter.com/intent/tweet?url=https://www.janka.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`, '_blank')}>
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Share on Twitter</span>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://www.janka.com/blog/${post.slug}&title=${encodeURIComponent(post.title)}`, '_blank')}>
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">Share on LinkedIn</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href={`/blog?page=${currentPage - 1}`} />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href={`/blog?page=${i + 1}`} isActive={currentPage === i + 1}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext href={`/blog?page=${currentPage + 1}`} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Janka Target Keywords</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {targetKeywords.map((keyword, index) => (
                <span key={index} className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div  className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated with Janka</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest insights on prediction markets and decentralized finance.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <Input type="email" placeholder="Enter your email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Janka</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-gray-300">Our Story</Link></li>
                <li><Link href="/team" className="hover:text-gray-300">Team</Link></li>
                <li><Link href="/careers" className="hover:text-gray-300">Careers</Link></li>
                <li><Link href="/press" className="hover:text-gray-300">Press Kit</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/documentation" className="hover:text-gray-300">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-gray-300">API Reference</Link></li>
                <li><Link href="/community" className="hover:text-gray-300">Community Forum</Link></li>
                <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-300">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-gray-300">Cookie Policy</Link></li>
                <li><Link href="/compliance" className="hover:text-gray-300">Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="https://facebook.com/janka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://twitter.com/janka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </a>
                <a href="https://linkedin.com/company/janka" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
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
            <p>&copy; {new Date().getFullYear()} Janka. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}