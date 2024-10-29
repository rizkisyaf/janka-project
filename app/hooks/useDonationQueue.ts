import { useState, useCallback } from 'react'

interface DonationQueueItem {
  id: string;
  amount: number;
  message?: string;
  timestamp: number;
}

export function useDonationQueue() {
  const [queue, setQueue] = useState<DonationQueueItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  const addToQueue = useCallback((donation: Omit<DonationQueueItem, 'id' | 'timestamp'>) => {
    const queueItem: DonationQueueItem = {
      id: crypto.randomUUID(),
      ...donation,
      timestamp: Date.now()
    }
    setQueue(prev => [...prev, queueItem])
  }, [])

  const processQueue = useCallback(async (processDonation: (item: DonationQueueItem) => Promise<void>) => {
    if (isProcessing || queue.length === 0) return

    setIsProcessing(true)
    try {
      const item = queue[0]
      await processDonation(item)
      setQueue(prev => prev.slice(1))
    } catch (error) {
      console.error('Error processing donation:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing, queue])

  return {
    queue,
    addToQueue,
    processQueue,
    isProcessing
  }
} 