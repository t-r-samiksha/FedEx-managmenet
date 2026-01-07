// import { dcaPerformanceMock } from '../../data/admin/dcaPerformance.mock';

// export const fetchDCAPerformance = async () => {
//     // Simulate API call
//     // const response = await fetch('/api/admin/dca-performance');
//     // return response.json();

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(dcaPerformanceMock);
//         }, 600);
//     });
// };

export const fetchDCAPerformance = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/dca-performance');

    if (!response.ok) {
        throw new Error('Failed to fetch Dca performance');
    }

    const result = await response.json();

    // API returns { success, count, data }
    return result;
};