export const updateCaseMock = {
    "C-1012": {
        id: "CASE-1012",
        customer: {
            name: "Acme Logistics Pvt Ltd"
        },
        financials: {
            totalDue: 875000
        },
        priority: {
            label: "High"
        },
        sla: {
            status: "Due Soon"
        },
        status: "In Progress"
    },
    // Default fallback
    "default": {
        id: "CASE-DEFAULT",
        customer: {
            name: "Global Tech Solutions"
        },
        financials: {
            totalDue: 125000
        },
        priority: {
            label: "Low"
        },
        sla: {
            status: "On Track"
        },
        status: "New"
    }
};
