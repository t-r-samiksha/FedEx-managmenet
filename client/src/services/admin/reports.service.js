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
    const response = await fetch('http://127.0.0.1:8000/api/admin/reports');

    if (!response.ok) {
        throw new Error('Failed to fetch reports data');
    }

    const result = await response.json();

    // API returns { success, count, data }
    return result;
};