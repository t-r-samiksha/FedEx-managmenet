export const opsCaseDetailsMock = {
    "C-1001": {
        id: "C-1001",
        customerName: "Tech Corp International",
        status: "New",
        amount: 45000,
        overdueDays: 92,
        priorityScore: 85,
        aiProbability: 78,
        history: [
            {
                action: "Email Sent",
                date: "Today, 10:00 AM",
                description: "Automated payment reminder sent to customer.",
                type: "system"
            },
            {
                action: "Case Created",
                date: "Yesterday, 2:30 PM",
                description: "Case automatically created due to overdue balance.",
                type: "system"
            }
        ],
        sla: {
            remaining: "23h 45m"
        }
    },
    // Fallback/Default
    "default": {
        id: "C-DEFAULT",
        customerName: "Sample Customer",
        status: "In Progress",
        amount: 15000,
        overdueDays: 30,
        priorityScore: 60,
        aiProbability: 65,
        history: [
            {
                action: "Case Assigned",
                date: "Today, 9:00 AM",
                description: "Case assigned to agent.",
                type: "system"
            }
        ],
        sla: {
            remaining: "48h 00m"
        }
    }
};
