import { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../../lib/axios'

export function useDonationTracker() {
    const [totalDonations, setTotalDonations] = useState(0)
    const [donorCount, setDonorCount] = useState(0)
    const [notifications, setNotifications] = useState<{ id: number, type: 'donation' | 'donor', amount?: number }[]>([])
    const [notificationId, setNotificationId] = useState(0)

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
                console.log('Fetching donation data...')
                const response = await axiosInstance.get('/donations')
                console.log('Donation data response:', response.data)
                if (response.data.success) {
                    setTotalDonations(response.data.totalDonations)
                    setDonorCount(response.data.donorCount)
                }
            } catch (error) {
                console.error('Error fetching donation data:', error)
            }
        }

        fetchDonationData()
        const pollInterval = setInterval(fetchDonationData, 4 * 60 * 60 * 1000) // Every 4 hours

        return () => clearInterval(pollInterval)
    }, [])

    return {
        totalDonations,
        donorCount,
        notifications
    }
}