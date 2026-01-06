import { myPerformanceMock } from '../../data/dca/myPerformance.mock';

export const fetchMyPerformance = async () => {
    // Simulate API call
    // const response = await fetch('/api/dca/my-performance');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(myPerformanceMock);
        }, 500);
    });
};
