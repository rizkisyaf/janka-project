export const featuredMarkets = [
    {
        id: '1',
        name: 'US GDP Growth Q3 2024',
        category: 'finance',
        type: 'threshold' as const,
        volume: '$1.2M',
        thresholds: [
            { value: '2%', options: ['above', 'below'] as const },
            { value: '4%', options: ['above', 'below'] as const }
        ]
    },
    {
        id: '2',
        name: 'Hurricane Landfall Florida 2024',
        category: 'weather',
        type: 'binary',
        probability: '30%',
        volume: '$890K'
    }
    // Add other markets as needed
] 