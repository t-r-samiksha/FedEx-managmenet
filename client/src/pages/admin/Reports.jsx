import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import '../../utils/chartSetup';
import Button from '../../components/ui/Button';
import { Download, Calendar } from 'lucide-react';
import { fetchReportsData } from '../../services/admin/reports.service';

const ReportsAnalytics = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchReportsData();
                setData(result);
            } catch (error) {
                console.error("Failed to load reports data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading reports...</div>;
    }

    if (!data) {
        return <div className="p-6">Unable to load data.</div>;
    }

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
                                    labels: data.recoveryByRegion.labels,
                                    datasets: [{
                                        label: 'Recovery %',
                                        data: data.recoveryByRegion.data,
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
                                    labels: data.caseStatusDistribution.labels,
                                    datasets: [{
                                        data: data.caseStatusDistribution.data,
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
                                    labels: data.collectionVolumeTrend.labels,
                                    datasets: [{
                                        label: 'Volume ($k)',
                                        data: data.collectionVolumeTrend.data,
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

