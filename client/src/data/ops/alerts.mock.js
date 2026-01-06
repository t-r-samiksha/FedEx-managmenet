export const alertsMock = [
    {
        id: 1,
        severity: 'critical',
        title: 'SLA Breach: First Contact Missed',
        caseId: 'C-1041',
        description: 'Case #C-1041 assigned to Beta Collections has not been actioned within 48 hours.',
        breachTime: '2 hours ago',
        severityLabel: 'Critical'
    },
    {
        id: 2,
        severity: 'warning',
        title: 'High Risk Account',
        caseId: 'C-1042',
        description: 'Account marked as high risk. Immediate attention required.',
        breachTime: '5 hours ago',
        severityLabel: 'High'
    },
    {
        id: 3,
        severity: 'warning',
        title: 'Payment Default',
        caseId: 'C-1043',
        description: 'Scheduled payment for Case #C-1043 missed.',
        breachTime: '1 day ago',
        severityLabel: 'High'
    },
    {
        id: 4,
        severity: 'warning',
        title: 'DCA Inactivity',
        caseId: 'C-1044',
        description: 'No activity logged by Delta Recovery Services for 5 days.',
        breachTime: '2 days ago',
        severityLabel: 'Medium'
    }
];
