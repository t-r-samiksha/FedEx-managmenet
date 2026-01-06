import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Clock, Briefcase, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchDCADashboardData } from '../../services/dca/dashboard.service';

const DCADashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchDCADashboardData();
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

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Agent</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Cases</p>
                            <h3 className="text-2xl font-bold text-gray-900">{data.stats.active}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Briefcase className="h-6 w-6" /></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Resolved Results</p>
                            <h3 className="text-2xl font-bold text-gray-900">{data.stats.resolved}</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-full"><CheckCircle2 className="h-6 w-6" /></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Actions</p>
                            <h3 className="text-2xl font-bold text-warning">{data.stats.pendingActions}</h3>
                        </div>
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-full"><Clock className="h-6 w-6" /></div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Case ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.upcomingDeadlines.map((c) => {
                                return (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">
                                            <Link to={`/dca/cases/${c.id}`} className="hover:underline text-primary">
                                                {c.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{c.customerName}</TableCell>
                                        <TableCell>
                                            <Badge variant={c.priorityColor}>{c.priorityLabel}</Badge>
                                        </TableCell>
                                        <TableCell className={`${c.slaColor} font-medium`}>{c.slaText}</TableCell>
                                        <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link to={`/dca/update/${c.id}`}>Update</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default DCADashboard;

