export const aiInsightsMock = {
    insights: [
        {
            id: '1',
            title: 'Predictive Recovery Model',
            description: 'Our AI model predicts a 15% increase in recovery if actioned within 48h for "High Risk" tier customers.',
            metric: 'Confidence Score: 92%',
            type: 'prediction' // Maps to purple styling
        },
        {
            id: '2',
            title: 'DCA Optimization',
            description: 'Beta Collections is outperforming peers in the "Retail" sector. Recommend increasing allocation by 20%.',
            metric: 'Opportunity Impact: High',
            type: 'optimization' // Maps to blue styling
        }
    ],
    featureImportance: [
        {
            id: 'f1',
            label: 'Days Overdue',
            impactLabel: '35% Impact',
            value: 35
        },
        {
            id: 'f2',
            label: 'Previous Payment History',
            impactLabel: '25% Impact',
            value: 25
        },
        {
            id: 'f3',
            label: 'Communication Responsiveness',
            impactLabel: '20% Impact',
            value: 20
        }
    ]
};
