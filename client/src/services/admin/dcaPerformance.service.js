import { dcaPerformanceMock } from '../../data/admin/dcaPerformance.mock';

export const fetchDCAPerformance = async () => {
    // Simulate API call
    // const response = await fetch('/api/admin/dca-performance');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dcaPerformanceMock);
        }, 600);
    });
};
