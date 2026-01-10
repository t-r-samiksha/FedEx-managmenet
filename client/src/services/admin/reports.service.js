// import { reportsMock } from '../../data/admin/reports.mock';

// export const fetchReportsData = async () => {
//     // Simulate API call
//     // const response = await fetch('/api/admin/reports');
//     // return response.json();

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(reportsMock);
//         }, 500);
//     });
// };

export const fetchReportsData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/reports`);

    if (!response.ok) {
        throw new Error('Failed to fetch reports data');
    }

    const result = await response.json();

    // API returns { success, count, data }
    return result;
};