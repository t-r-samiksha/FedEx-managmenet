import React, { useEffect, useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import '../../utils/chartSetup'; // Ensure charts are registered
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BadgeDollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { fetchDashboardData } from '../../services/admin/dashboard.service';

const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchDashboardData();
                setData(result);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading dashboard...</div>;
    }

    if (!data) {
        return <div className="p-6">Unable to load data.</div>;
    }

    // Chart Data Preparation
    const overdueData = {
        labels: data.charts.overdueAging.labels,
        datasets: [
            {
                data: data.charts.overdueAging.data,
                backgroundColor: ['#16A34A', '#F59E0B', '#F97316', '#DC2626'],
                borderWidth: 0,
            },
        ],
    };

    const recoveryData = {
        labels: data.charts.recoveryTrend.labels,
        datasets: [
            {
                label: 'Recovery Rate (%)',
                data: data.charts.recoveryTrend.data,
                borderColor: '#4D148C',
                backgroundColor: 'rgba(77, 20, 140, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const dcaPerformanceData = {
        labels: data.charts.dcaPerformance.labels,
        datasets: [
            {
                label: 'Amount Recovered ($k)',
                data: data.charts.dcaPerformance.data,
                backgroundColor: '#FF6600',
            },
        ],
    };

    const getStatIconAndColor = (type) => {
        switch (type) {
            case 'money': return { icon: BadgeDollarSign, color: 'text-primary' };
            case 'users': return { icon: Users, color: 'text-blue-600' };
            case 'percent': return { icon: TrendingUp, color: 'text-success' };
            case 'alert': return { icon: AlertTriangle, color: 'text-critical' };
            default: return { icon: Users, color: 'text-gray-600' };
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
                <p className="text-sm text-gray-500">Last updated: Just now</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {data.stats.map((stat, index) => {
                    const { icon, color } = getStatIconAndColor(stat.type);
                    return (
                        <StatsCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            trend={stat.trend}
                            trendUp={stat.trendUp}
                            icon={icon}
                            color={color}
                        />
                    );
                })}
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recovery Trend (6 Months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <Line
                                data={recoveryData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true, max: 100 } }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>DCA Performance Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <Bar
                                data={dcaPerformanceData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Overdue Aging</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] w-full flex justify-center">
                            <Doughnut
                                data={overdueData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'bottom' } }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Critical Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.alerts.map((alert) => (
                                <div key={alert.id} className="flex items-start gap-4 p-3 rounded-lg bg-red-50 border border-red-100">
                                    <AlertTriangle className="h-5 w-5 text-critical shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {alert.message}
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-auto whitespace-nowrap">{alert.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const StatsCard = ({ title, value, trend, trendUp, icon: Icon, color }) => (
    <Card>
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
                <span className={`font-medium ${trendUp ? 'text-success' : 'text-critical'}`}>
                    {trend}
                </span>
                <span className="text-gray-400 ml-1">vs last month</span>
            </div>
        </CardContent>
    </Card>
);

export default AdminDashboard;

