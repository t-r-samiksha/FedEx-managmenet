import { myCasesMock } from '../../data/dca/myCases.mock';

export const fetchMyCases = async () => {
    // Simulate API call
    // const response = await fetch('/api/dca/my-cases');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(myCasesMock);
        }, 500);
    });
};
