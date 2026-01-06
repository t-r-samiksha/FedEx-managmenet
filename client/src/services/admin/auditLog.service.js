import { auditLogMock } from '../../data/admin/auditLog.mock';

export const fetchAuditLogs = async () => {
    // Simulate API call
    // const response = await fetch('/api/admin/audit-logs');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(auditLogMock);
        }, 800);
    });
};
