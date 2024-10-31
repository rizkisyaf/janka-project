import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useDonationQueue } from './useDonationQueue'

export function useDonationTracker() {
    const [totalDonations, setTotalDonations] = useState(0)
    const [donorCount, setDonorCount] = useState(0)
    const [notifications, setNotifications] = useState<{id: number, type: 'donation' | 'donor', amount?: number}[]>([])
    const [notificationId, setNotificationId] = useState(0)
    const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
    const { queue, addToQueue, processQueue, isProcessing } = useDonationQueue()

    const addNotification = useCallback((type: 'donation' | 'donor', amount?: number) => {
        const newId = notificationId + 1
        setNotificationId(newId)
        setNotifications(prev => [...prev, { id: newId, type, amount }])

        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== newId))
        }, 3000)
    }, [notificationId])

    useEffect(() => {
        const fetchDonationData = async () => {
            try {
                const response = await axios.get('/api/donations')
                setTotalDonations(response.data.totalDonations)
                setDonorCount(response.data.donorCount)
            } catch (error) {
                console.error('Error fetching donation data:', error)
            }
        }

        fetchDonationData()
        const pollInterval = setInterval(fetchDonationData, 30000)

        return () => clearInterval(pollInterval)
    }, [])

    const connectToWebSocket = useCallback(() => {
        const ws = new WebSocket('wss://janka-project.vercel.app')

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                if (data.type === 'donation') {
                    setTotalDonations(prev => prev + data.amount)
                    addNotification('donation', data.amount)
                } else if (data.type === 'donor') {
                    setDonorCount(prev => prev + 1)
                    addNotification('donor')
                }
            } catch (error) {
                console.error('Error processing message:', error)
            }
        }

        return ws
    }, [addNotification])

    return {
        totalDonations,
        donorCount,
        notifications,
        connectToWebSocket,
        wsStatus
    }
}