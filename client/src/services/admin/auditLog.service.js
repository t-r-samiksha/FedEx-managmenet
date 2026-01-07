// import { auditLogMock } from '../../data/admin/auditLog.mock';

// export const fetchAuditLogs = async () => {
//     // Simulate API call
//     // const response = await fetch('/api/admin/audit-logs');
//     // return response.json();

//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(auditLogMock);
//         }, 800);
//     });
// };

export const fetchAuditLogs = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/audit');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const result = await response.json();

    // API returns { success, count, data }
    return result.data;
};
