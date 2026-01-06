export const opsDashboardMock = {
    cases: [
        {
            id: 'C-1001',
            customerName: 'Tech Corp International',
            amount: 45000,
            overdueDays: 92,
            status: 'Escalated',
            priorityScore: 95,
            assignedDcaId: null
        },
        {
            id: 'C-1002',
            customerName: 'Global Logistics',
            amount: 15000,
            overdueDays: 45,
            status: 'New',
            priorityScore: 75,
            assignedDcaId: 'DCA-001'
        },
        {
            id: 'C-1003',
            customerName: 'Acme Supplies',
            amount: 8500,
            overdueDays: 35,
            status: 'Active',
            priorityScore: 60,
            assignedDcaId: 'DCA-002'
        },
        {
            id: 'C-1004',
            customerName: 'Beta Industries',
            amount: 25000,
            overdueDays: 60,
            status: 'Escalated',
            priorityScore: 88,
            assignedDcaId: null
        },
        {
            id: 'C-1005',
            customerName: 'Gamma Rays Inc',
            amount: 12000,
            overdueDays: 20,
            status: 'New',
            priorityScore: 40,
            assignedDcaId: null
        }
    ]
};

export const PRIORITY_CONFIG_MOCK = {
    CRITICAL: { min: 80, label: 'Critical', color: 'red-500' },
    HIGH: { min: 60, label: 'High', color: 'orange-500' },
    MEDIUM: { min: 40, label: 'Medium', color: 'yellow-500' },
    LOW: { min: 0, label: 'Low', color: 'green-500' }
};
