export const MOCK_USERS = [
    {
        id: 'u1',
        email: 'admin@fedex.com',
        password: 'Admin@123',
        name: 'Admin User',
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=4D148C&color=fff'
    },
    {
        id: 'u2',
        email: 'ops@fedex.com',
        password: 'Ops@123',
        name: 'Operations Manager',
        role: 'ops_manager',
        avatar: 'https://ui-avatars.com/api/?name=Ops+Manager&background=FF6600&color=fff'
    },
    {
        id: 'u3',
        email: 'dca@agency.com',
        password: 'Dca@123',
        name: 'DCA Agent',
        role: 'dca_agent',
        avatar: 'https://ui-avatars.com/api/?name=DCA+Agent&background=16A34A&color=fff'
    }
];

export const DEMO_CREDENTIALS = {
    admin: { email: 'admin@fedex.com', password: 'Admin@123' },
    ops: { email: 'ops@fedex.com', password: 'Ops@123' },
    dca: { email: 'dca@agency.com', password: 'Dca@123' }
};
