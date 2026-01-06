export const auditLogMock = [
    {
        id: '1',
        action: 'Login',
        user: 'Admin User',
        role: 'admin',
        timestamp: new Date().toISOString(),
        details: 'IP: 192.168.1.1'
    },
    {
        id: '2',
        action: 'Case Assigned',
        user: 'Ops Manager',
        role: 'ops_manager',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        details: 'IP: 192.168.1.1'
    },
    {
        id: '3',
        action: 'Policy Update',
        user: 'System Admin',
        role: 'super_admin',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        details: 'IP: 10.0.0.5'
    },
    {
        id: '4',
        action: 'User Suspended',
        user: 'Security Officer',
        role: 'admin',
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        details: 'IP: 192.168.1.20'
    }
];
