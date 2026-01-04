import { format, subDays, addDays } from 'date-fns';

// Constants
export const STATUSES = {
    NEW: 'New',
    ASSIGNED: 'Assigned',
    IN_PROGRESS: 'In Progress',
    PROMISE_TO_PAY: 'PTP',
    PAID: 'Paid',
    UNREACHABLE: 'Unreachable',
    ESCALATED: 'Escalated',
};

export const DCAS = [
    { id: 'dca1', name: 'Alpha Recovery', performanceScore: 92, recoveryRate: 78, tier: 'Gold' },
    { id: 'dca2', name: 'Beta Collections', performanceScore: 85, recoveryRate: 72, tier: 'Silver' },
    { id: 'dca3', name: 'Gamma Solutions', performanceScore: 65, recoveryRate: 55, tier: 'Bronze' },
];

export const PRIORITY_CONFIG = {
    CRITICAL: { min: 80, label: 'Critical', color: 'critical' },
    HIGH: { min: 60, label: 'High', color: 'warning' },
    MEDIUM: { min: 40, label: 'Medium', color: 'secondary' },
    LOW: { min: 0, label: 'Low', color: 'success' },
};

// Dummy Case Generator
const generateCases = (count) => {
    const cases = [];
    for (let i = 1; i <= count; i++) {
        const overdueDays = Math.floor(Math.random() * 90) + 10;
        const amount = Math.floor(Math.random() * 50000) + 1000;

        // Simple priority logic for initial generation
        let score = Math.min(100, (overdueDays * 0.5) + (amount / 1000));
        if (score > 100) score = 100;

        cases.push({
            id: `C-${1000 + i}`,
            customerName: `Customer ${i}`,
            amount: amount,
            overdueDays: overdueDays,
            dueDate: format(subDays(new Date(), overdueDays), 'yyyy-MM-dd'),
            status: i % 5 === 0 ? STATUSES.NEW : STATUSES.ASSIGNED,
            priorityScore: Math.round(score),
            assignedDcaId: i % 5 === 0 ? null : DCAS[i % 3].id,
            deadline: format(addDays(new Date(), 5), 'yyyy-MM-dd'),
            aiProbability: Math.floor(Math.random() * 100),
            lastAction: 'Email Sent',
            notes: 'Customer promised to call back.',
        });
    }
    return cases.sort((a, b) => b.priorityScore - a.priorityScore);
};

export const MOCK_CASES = generateCases(50);

export const MOCK_LOGS = [
    { id: 1, action: 'Login', user: 'Admin User', role: 'admin', timestamp: new Date().toISOString() },
    { id: 2, action: 'Case Assigned', user: 'Ops Manager', role: 'ops_manager', timestamp: subDays(new Date(), 1).toISOString() },
];
