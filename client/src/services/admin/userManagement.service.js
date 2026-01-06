import { userManagementMock } from '../../data/admin/userManagement.mock';

export const fetchUsers = async () => {
    // Simulate API call
    // const response = await fetch('/api/admin/users');
    // return response.json();

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(userManagementMock);
        }, 600);
    });
};
