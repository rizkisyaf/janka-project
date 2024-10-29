import { Metadata } from "next"
import EnhancedTradePage from "./client"

interface TradePageProps {
  params: Promise<{ id: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

// Metadata generation
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `Trade Details - ${resolvedParams.id}`,
    description: 'Trade details page for Janka platform',
  }
}

// The main page component
export default async function TradePage({ params }: TradePageProps) {
  const resolvedParams = await params
  return <EnhancedTradePage params={{ id: resolvedParams.id }} />
}