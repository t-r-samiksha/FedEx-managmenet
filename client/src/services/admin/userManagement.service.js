export const fetchUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`);

    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }

    const result = await response.json();

    // API returns { success, count, data }
    return result.data;
};
