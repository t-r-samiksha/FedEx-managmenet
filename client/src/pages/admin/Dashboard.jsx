import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import '../../utils/chartSetup'; // Ensure charts are registered
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BadgeDollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminDashboard = () => {
    // Mock Data for Charts
    const overdueData = {
        labels: ['0-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
        datasets: [
            {
                data: [35, 25, 20, 20],
                backgroundColor: ['#16A34A', '#F59E0B', '#F97316', '#DC2626'],
                borderWidth: 0,
            },
        ],
    };

    const recoveryData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Recovery Rate (%)',
                data: [65, 68, 72, 70, 75, 78],
                borderColor: '#4D148C',
                backgroundColor: 'rgba(77, 20, 140, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const dcaPerformanceData = {
        labels: ['Alpha Recovery', 'Beta Collections', 'Gamma Solutions', 'Delta Corp'],
        datasets: [
            {
                label: 'Amount Recovered ($k)',
                data: [450, 320, 280, 150],
                backgroundColor: '#FF6600',
            },
        ],
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Executive Dashboard</h1>
                <p className="text-sm text-gray-500">Last updated: Just now</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <StatsCard
                    title="Total Overdue"
                    value="$2.4M"
                    trend="+12%"
                    trendUp={true}
                    icon={BadgeDollarSign}
                    color="text-primary"
                />
                <StatsCard
                    title="Active Cases"
                    value="1,240"
                    trend="-5%"
                    trendUp={false}
                    icon={Users}
                    color="text-blue-600"
                />
                <StatsCard
                    title="Avg Recovery Rate"
                    value="78%"
                    trend="+2.4%"
                    trendUp={true}
                    icon={TrendingUp}
                    color="text-success"
                />
                <StatsCard
                    title="SLA Breaches"
                    value="12"
                    trend="+2"
                    trendUp={false}
                    icon={AlertTriangle}
                    color="text-critical"
                />
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
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-red-50 border border-red-100">
                                    <AlertTriangle className="h-5 w-5 text-critical shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">SLA Breach Warning - Case #C-102{i}</p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Case assigned to Beta Collections has exceeded the 48-hour initial contact window.
                                        </p>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-auto whitespace-nowrap">2h ago</span>
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
