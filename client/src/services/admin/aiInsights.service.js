import { aiInsightsMock } from '../../data/admin/aiInsights.mock';

export const fetchAIInsights = async () => {
    // Simulate API call
    // const response = await fetch('/api/admin/ai-insights');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(aiInsightsMock);
        }, 500);
    });
};
