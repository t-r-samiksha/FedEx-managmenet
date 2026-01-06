import { caseDetailsMock } from '../../data/dca/caseDetails.mock';

export const fetchCaseDetails = async (caseId) => {
    // Simulate API call
    // const response = await fetch(`/api/dca/cases/${caseId}`);
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            const data = caseDetailsMock[caseId] || caseDetailsMock['default'];
            // Inject the ID if falling back to default, just to make it look real
            if (!caseDetailsMock[caseId]) {
                data.id = caseId || data.id;
            }
            resolve(data);
        }, 500);
    });
};
