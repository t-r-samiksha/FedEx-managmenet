import { dcaDashboardMock } from '../../data/dca/dashboard.mock';

export const fetchDCADashboardData = async () => {
    // Simulate API call
    // const response = await fetch('/api/dca/dashboard');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dcaDashboardMock);
        }, 600);
    });
};
