import { MOCK_USERS } from '../data/auth.mock';

export const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);

            if (foundUser) {
                // Create a "token" (just user data)
                const userData = { ...foundUser };
                delete userData.password; // Don't store password
                resolve(userData);
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 800); // Simulate network delay
    });
};
