import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

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

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('fedex_dca_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);

                if (foundUser) {
                    // Create a "token" (just user data)
                    const userData = { ...foundUser };
                    delete userData.password; // Don't store password

                    localStorage.setItem('fedex_dca_user', JSON.stringify(userData));
                    localStorage.setItem('fedex_dca_token', 'mock-jwt-token-xyz'); // Dummy token

                    setUser(userData);
                    setIsAuthenticated(true);
                    resolve(userData);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 800); // Simulate network delay
        });
    };

    const logout = () => {
        localStorage.removeItem('fedex_dca_user');
        localStorage.removeItem('fedex_dca_token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
