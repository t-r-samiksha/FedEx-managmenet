import { dashboardMock } from '../../data/admin/dashboard.mock';

export const fetchDashboardData = async () => {
    // Simulate API call
    // const response = await fetch('/api/admin/dashboard');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dashboardMock);
        }, 700);
    });
};
