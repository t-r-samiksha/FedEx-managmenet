import { alertsMock } from '../../data/ops/alerts.mock';

export const fetchAlerts = async () => {
    // Simulate API call
    // const response = await fetch('/api/ops/alerts');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(alertsMock);
        }, 500);
    });
};
