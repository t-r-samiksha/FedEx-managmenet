import { MOCK_CASES, DCAS, MOCK_LOGS } from '../data/mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    cases: {
        getAll: async () => {
            // await delay(500); // Simulate network
            // return axios.get('/api/cases');
            return [...MOCK_CASES];
        },
        getById: async (id) => {
            // return axios.get(`/api/cases/${id}`);
            return MOCK_CASES.find(c => c.id === id);
        },
        update: async (id, data) => {
            // return axios.put(`/api/cases/${id}`, data);
            console.log(`Updated case ${id}`, data);
            return { success: true };
        },
        assign: async (caseId, dcaId) => {
            // return axios.post(`/api/cases/${caseId}/assign`, { dcaId });
            console.log(`Assigned case ${caseId} to DCA ${dcaId}`);
            return { success: true };
        }
    },
    dcas: {
        getAll: async () => {
            return [...DCAS];
        }
    },
    analytics: {
        getStats: async () => {
            return {
                totalOverdue: 1540000,
                recoveryRate: 68,
                activeCases: 42,
                slaBreaches: 3
            };
        }
    }
};
