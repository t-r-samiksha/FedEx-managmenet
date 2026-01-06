import { opsCaseDetailsMock } from '../../data/ops/caseDetails.mock';

export const fetchCaseDetails = async (caseId) => {
    // Simulate API call
    // const response = await fetch(`/api/ops/cases/${caseId}`);
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            const data = opsCaseDetailsMock[caseId] || opsCaseDetailsMock['default'];
            // Inject ID if fallback
            if (!opsCaseDetailsMock[caseId]) {
                data.id = caseId || "C-DEFAULT";
            }
            resolve(data);
        }, 500);
    });
};
