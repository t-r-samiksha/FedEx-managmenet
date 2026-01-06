export const caseDetailsMock = {
    "C-1012": {
        id: "CASE-1012",
        customer: {
            name: "Acme Logistics Pvt Ltd",
            type: "Business",
            region: "South India",
            email: "acme@****.com",
            phone: "+91-98****321"
        },
        financials: {
            totalDue: 875000,
            overdueDays: 42,
            lastPaymentDate: "2025-11-18",
            outstandingBalance: 875000
        },
        assignment: {
            dcaName: "Delta Recovery Services",
            assignedDate: "2025-11-01"
        },
        sla: {
            deadline: "2026-01-06T18:00:00",
            status: "Due Soon"
        },
        priority: {
            score: 78,
            label: "High"
        },
        status: "In Progress",
        activityTimeline: [
            {
                date: "2025-11-01",
                action: "Case assigned to DCA",
                actor: "System"
            },
            {
                date: "2025-11-05",
                action: "Call attempted",
                actor: "DCA Agent"
            },
            {
                date: "2025-11-10",
                action: "Reminder email sent",
                actor: "System"
            }
        ],
        internalNotes: "Customer requested additional time due to internal reconciliation delays."
    },
    "C-1027": {
        id: "CASE-1027",
        customer: {
            name: "Nova Retail Group",
            type: "Enterprise",
            region: "West India",
            email: "nova@****.com",
            phone: "+91-97****654"
        },
        financials: {
            totalDue: 450000,
            overdueDays: 18,
            lastPaymentDate: "2025-12-01",
            outstandingBalance: 450000
        },
        assignment: {
            dcaName: "Prime Recovery Solutions",
            assignedDate: "2025-12-10"
        },
        sla: {
            deadline: "2026-01-12T18:00:00",
            status: "On Track"
        },
        priority: {
            score: 62,
            label: "Medium"
        },
        status: "Open",
        activityTimeline: [
            {
                date: "2025-12-10",
                action: "Case assigned to DCA",
                actor: "System"
            }
        ],
        internalNotes: "Initial outreach pending. Customer recently onboarded."
    },
    "default": {
        id: "CASE-DEFAULT",
        customer: {
            name: "Global Tech Solutions",
            type: "Enterprise",
            region: "North India",
            email: "contact@globaltech.com",
            phone: "+91-99****111"
        },
        financials: {
            totalDue: 125000,
            overdueDays: 15,
            lastPaymentDate: "2025-12-15",
            outstandingBalance: 125000
        },
        assignment: {
            dcaName: "Alpha Recovery",
            assignedDate: "2025-12-20"
        },
        sla: {
            deadline: "2026-01-20T18:00:00",
            status: "On Track"
        },
        priority: {
            score: 45,
            label: "Low"
        },
        status: "New",
        activityTimeline: [
            {
                date: "2025-12-20",
                action: "Case assigned",
                actor: "System"
            }
        ],
        internalNotes: "Standard overdue case."
    }
};
