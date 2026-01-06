export const dashboardMock = {
    stats: [
        { title: 'Total Overdue', value: '$2.4M', trend: '+12%', trendUp: true, type: 'money' },
        { title: 'Active Cases', value: '1,240', trend: '-5%', trendUp: false, type: 'users' },
        { title: 'Avg Recovery Rate', value: '78%', trend: '+2.4%', trendUp: true, type: 'percent' },
        { title: 'SLA Breaches', value: '12', trend: '+2', trendUp: false, type: 'alert' }
    ],
    charts: {
        recoveryTrend: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [65, 68, 72, 70, 75, 78]
        },
        dcaPerformance: {
            labels: ['Alpha Recovery', 'Beta Collections', 'Gamma Solutions', 'Delta Corp'],
            data: [450, 320, 280, 150]
        },
        overdueAging: {
            labels: ['0-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
            data: [35, 25, 20, 20]
        }
    },
    alerts: [
        {
            id: 1,
            title: 'SLA Breach Warning - Case #C-1021',
            message: 'Case assigned to Beta Collections has exceeded the 48-hour initial contact window.',
            time: '2h ago'
        },
        {
            id: 2,
            title: 'SLA Breach Warning - Case #C-1022',
            message: 'Case assigned to Alpha Recovery has exceeded the 48-hour initial contact window.',
            time: '3h ago'
        },
        {
            id: 3,
            title: 'SLA Breach Warning - Case #C-1023',
            message: 'Case assigned to Gamma Solutions has exceeded the 48-hour initial contact window.',
            time: '5h ago'
        }
    ]
};
