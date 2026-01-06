export const workflowSLAMock = {
    slaThresholds: [
        {
            id: 'first_contact',
            label: 'First Contact',
            description: 'Time to action new cases',
            options: ['24 Hours', '48 Hours'],
            value: '24 Hours'
        },
        {
            id: 'follow_up',
            label: 'Follow-up Frequency',
            description: 'Time between actions',
            options: ['3 Days', '5 Days'],
            value: '3 Days'
        }
    ],
    autoAssignmentRules: [
        {
            id: 'high_priority',
            label: 'High Priority Routing',
            description: 'Score > 80 assigned to Top Tier DCAs',
            enabled: true,
            icon: 'GitBranch'
        },
        {
            id: 'risk_escalation',
            label: 'Risk Escalation',
            description: 'Auto-escalate after 2 SLA breaches',
            enabled: true,
            icon: 'ShieldAlert'
        }
    ]
};
