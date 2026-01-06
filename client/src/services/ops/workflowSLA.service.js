import { workflowSLAMock } from '../../data/ops/workflowSLA.mock';

export const fetchWorkflowConfig = async () => {
    // Simulate API call
    // const response = await fetch('/api/ops/workflow-config');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(workflowSLAMock);
        }, 500);
    });
};

export const saveWorkflowConfig = async (config) => {
    // Simulate API save
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Saved config:", config);
            resolve({ success: true });
        }, 800);
    });
};
