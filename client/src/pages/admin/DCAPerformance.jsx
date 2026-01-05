import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { DCAS } from '../../data/mockData';
import { Trophy, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import '../../utils/chartSetup';

const DCAPerformance = () => {
    const chartData = {
        labels: DCAS.map(d => d.name),
        datasets: [
            {
                label: 'Recovery Rate (%)',
                data: DCAS.map(d => d.recoveryRate),
                backgroundColor: '#4D148C',
            },
            {
                label: 'Performance Score',
                data: DCAS.map(d => d.performanceScore),
                backgroundColor: '#FF6600',
            }
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">DCA Performance</h1>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Performance Metrics Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <Bar
                                data={chartData}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: { y: { beginAtZero: true, max: 100 } }
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>DCA Leaderboard</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Rank</TableHead>
                                    <TableHead>Agency Name</TableHead>
                                    <TableHead>Tier</TableHead>
                                    <TableHead className="text-right">Score</TableHead>
                                    <TableHead className="text-right">Recovery Rate</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[...DCAS].sort((a, b) => b.performanceScore - a.performanceScore).map((dca, index) => (
                                    <TableRow key={dca.id}>
                                        <TableCell>
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-bold text-gray-600">
                                                {index + 1}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{dca.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={dca.tier === 'Gold' ? 'warning' : dca.tier === 'Silver' ? 'secondary' : 'default'}>
                                                {dca.tier}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-bold">{dca.performanceScore}</TableCell>
                                        <TableCell className="text-right">{dca.recoveryRate}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DCAS.map((dca) => (
                    <Card key={dca.id} className="overflow-hidden">
                        <div className={`h-2 w-full ${dca.tier === 'Gold' ? 'bg-yellow-400' : dca.tier === 'Silver' ? 'bg-gray-400' : 'bg-orange-700'}`} />
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle>{dca.name}</CardTitle>
                                {dca.tier === 'Gold' && <Trophy className="h-5 w-5 text-yellow-500" />}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-1"><TrendingUp className="h-4 w-4" /> Recovery Rate</span>
                                    <span className="font-semibold text-gray-900">{dca.recoveryRate}%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-1"><Clock className="h-4 w-4" /> Avg Turnaround</span>
                                    <span className="font-semibold text-gray-900">12 Days</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 flex items-center gap-1"><AlertCircle className="h-4 w-4" /> SLA Compliance</span>
                                    <span className="font-semibold text-green-600">98%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DCAPerformance;
