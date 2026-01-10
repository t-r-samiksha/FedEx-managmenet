// import { dashboardMock } from '../../data/admin/dashboard.mock';

// export const fetchDashboardData = async () => {
//     // Simulate API call
//     // const response = await fetch('/api/admin/dashboard');
//     // return response.json();

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(dashboardMock);
//         }, 700);
//     });
// };

export const fetchDashboardData = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/dashboard');

    if (!response.ok) {
        throw new Error('Failed to fetch dashbaord data');
    }

    const result = await response.json();

    // API returns { success, count, data }
    return result;
};