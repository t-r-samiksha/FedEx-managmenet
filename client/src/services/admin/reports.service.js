import { reportsMock } from '../../data/admin/reports.mock';

export const fetchReportsData = async () => {
    // Simulate API call
    // const response = await fetch('/api/admin/reports');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(reportsMock);
        }, 500);
    });
};
