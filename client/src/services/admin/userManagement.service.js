export const fetchUsers = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/admin/users');

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const result = await response.json();

    // API returns { success, count, data }
    return result.data;
};
