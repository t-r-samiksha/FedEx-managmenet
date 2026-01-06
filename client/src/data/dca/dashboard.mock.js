export const dcaDashboardMock = {
    stats: {
        active: 12,
        resolved: 45,
        commission: '$3,400',
        pendingActions: 4
    },
    upcomingDeadlines: [
        {
            id: 'C-1001',
            customerName: 'Tech Corp International',
            priorityScore: 85,
            deadline: '2026-02-15',
            status: 'Assigned',
            priorityColor: 'warning',
            priorityLabel: 'High',
            slaText: 'Due in 5 days',
            slaColor: 'text-gray-500'
        },
        {
            id: 'C-1005',
            customerName: 'Global Logistics',
            priorityScore: 92,
            deadline: '2026-02-12',
            status: 'PTP',
            priorityColor: 'critical',
            priorityLabel: 'Critical',
            slaText: 'Due in 2 days',
            slaColor: 'text-warning'
        },
        {
            id: 'C-1012',
            customerName: 'Acme Solutions',
            priorityScore: 65,
            deadline: '2026-03-01',
            status: 'In Progress',
            priorityColor: 'secondary',
            priorityLabel: 'Medium',
            slaText: 'Due in 19 days',
            slaColor: 'text-gray-500'
        },
        {
            id: 'C-1018',
            customerName: 'Retail Giants Ltd',
            priorityScore: 40,
            deadline: '2026-03-10',
            status: 'New',
            priorityColor: 'success',
            priorityLabel: 'Low',
            slaText: 'Due in 28 days',
            slaColor: 'text-gray-500'
        }
    ]
};
