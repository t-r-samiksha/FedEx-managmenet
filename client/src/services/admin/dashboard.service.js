export const fetchDashboardData = async () => {
    const response = await fetch('http://127.0.0.1:8000/admin/dashboard');

    if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
    }

    return response.json();
};
