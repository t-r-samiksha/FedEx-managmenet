import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import '../../utils/chartSetup';
import Button from '../../components/ui/Button';
import { Download, Calendar } from 'lucide-react';

const ReportsAnalytics = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Calendar className="h-4 w-4 mr-2" /> Last 30 Days
                    </Button>
                    <Button>
                        <Download className="h-4 w-4 mr-2" /> Export PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Recovery Rate by Region</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Bar
                                data={{
                                    labels: ['North', 'South', 'East', 'West', 'Central'],
                                    datasets: [{
                                        label: 'Recovery %',
                                        data: [75, 62, 80, 78, 65],
                                        backgroundColor: '#4D148C'
                                    }]
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Case Status Distribution</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex justify-center">
                            <Doughnut
                                data={{
                                    labels: ['Paid', 'PTP', 'In Progress', 'New', 'Escalated'],
                                    datasets: [{
                                        data: [35, 20, 25, 15, 5],
                                        backgroundColor: ['#16A34A', '#F59E0B', '#3B82F6', '#6B7280', '#DC2626']
                                    }]
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader><CardTitle>Collection Volume Trend</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Line
                                data={{
                                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
                                    datasets: [{
                                        label: 'Volume ($k)',
                                        data: [150, 180, 160, 210, 240],
                                        borderColor: '#FF6600',
                                        backgroundColor: 'rgba(255, 102, 0, 0.1)',
                                        fill: true
                                    }]
                                }}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
