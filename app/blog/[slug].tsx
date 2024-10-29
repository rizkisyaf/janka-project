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
        <loc>https://janka-project.vercel.app/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      ${blogPosts.map(post => `
        <url>
          <loc>https://janka-project.vercel.app/blog/${post.slug}</loc>
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
    feed_url: 'https://janka-project.vercel.app/rss.xml',
    site_url: 'https://janka-project.vercel.app',
    image_url: 'https://janka-project.vercel.app/logo.png',
    language: 'en',
    pubDate: new Date(),
  })

  blogPosts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `https://janka-project.vercel.app/blog/${post.slug}`,
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
    "url": "https://janka-project.vercel.app/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Janka",
      "logo": {
        "@type": "ImageObject",
        "url": "https://janka-project.vercel.app/logo.png"
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
      "image": `https://janka-project.vercel.app${post.image}`,
      "url": `https://janka-project.vercel.app/blog/${post.slug}`
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
        <meta property="og:image" content="https://janka-project.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://janka-project.vercel.app/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://janka-project.vercel.app/blog" />
        <link rel="alternate" type="application/rss+xml" title="Janka Blog RSS Feed" href="https://janka-project.vercel.app/rss.xml" />
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
                      <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=https://janka-project.vercel.app/blog/${post.slug}`, '_blank')}>
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Share on Facebook</span>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => window.open(`https://twitter.com/intent/tweet?url=https://janka-project.vercel.app/blog/${post.slug}&text=${encodeURIComponent(post.title)}`, '_blank')}>
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Share on Twitter</span>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https://janka-project.vercel.app/blog/${post.slug}&title=${encodeURIComponent(post.title)}`, '_blank')}>
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
          <div className="container mx-auto px-4 text-center">
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