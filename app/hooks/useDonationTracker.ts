import { useState, useEffect, useCallback } from 'react'
import axiosInstance from '../../lib/axios'
import { useDonationQueue } from './useDonationQueue'

export function useDonationTracker() {
    const [totalDonations, setTotalDonations] = useState(0)
    const [donorCount, setDonorCount] = useState(0)
    const [notifications, setNotifications] = useState<{ id: number, type: 'donation' | 'donor', amount?: number }[]>([])
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
                console.log('Fetching donation data...');
                const response = await axiosInstance.get('/donations');
                console.log('Donation data response:', response.data);
                if (response.data.success) {
                    setTotalDonations(response.data.totalDonations);
                    setDonorCount(response.data.donorCount);
                }
            } catch (error) {
                console.error('Error fetching donation data:', error);
            }
        };

        fetchDonationData();
        const pollInterval = setInterval(fetchDonationData, 4 * 60 * 60 * 1000);

        return () => clearInterval(pollInterval);
    }, []);

    const connectToWebSocket = useCallback(() => {
        setWsStatus('connecting');
        const wsUrl = process.env.NEXT_PUBLIC_WS_URL ||
            (process.env.NODE_ENV === 'production'
                ? 'wss://janka-project.vercel.app/ws'
                : 'ws://localhost:3000/ws');

        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            setWsStatus('connected');
            console.log('WebSocket connected successfully');
        };

        ws.onclose = () => {
            setWsStatus('disconnected');
            console.log('WebSocket disconnected, attempting to reconnect...');
            setTimeout(() => connectToWebSocket(), 5000); // Reconnect after 5 seconds
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setWsStatus('disconnected');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'donation') {
                    setTotalDonations(prev => prev + data.amount);
                    addNotification('donation', data.amount);
                } else if (data.type === 'donor') {
                    setDonorCount(prev => prev + 1);
                    addNotification('donor');
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        };

        return ws;
    }, [addNotification]);

    return {
        totalDonations,
        donorCount,
        notifications,
        connectToWebSocket,
        wsStatus
    }
}