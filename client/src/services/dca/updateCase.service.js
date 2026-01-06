import { updateCaseMock } from '../../data/dca/updateCase.mock';

export const fetchCaseForUpdate = async (caseId) => {
    // Simulate API call
    // const response = await fetch(`/api/dca/cases/${caseId}`);
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            const data = updateCaseMock[caseId] || updateCaseMock['default'];
            // Inject ID just to be consistent
            if (!updateCaseMock[caseId]) {
                data.id = caseId || data.id;
            }
            resolve(data);
        }, 500);
    });
};

export const submitCaseUpdate = async (payload) => {
    // Simulate API call
    // await fetch('/api/dca/cases/update', { method: 'POST', body: JSON.stringify(payload) });
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock API: Submitted Update", payload);
            resolve({ success: true, message: "Action recorded successfully" });
        }, 800);
    });
};
