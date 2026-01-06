import { assignmentsMock } from '../../data/ops/assignments.mock';

export const fetchPendingAssignments = async () => {
    // Simulate API call
    // const response = await fetch('/api/ops/assignments/pending');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(assignmentsMock);
        }, 500);
    });
};
