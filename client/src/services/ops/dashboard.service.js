import { opsDashboardMock } from '../../data/ops/dashboard.mock';

export const fetchOpsDashboardData = async () => {
    // Simulate API call
    // const response = await fetch('/api/ops/dashboard');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(opsDashboardMock.cases);
        }, 500);
    });
};
