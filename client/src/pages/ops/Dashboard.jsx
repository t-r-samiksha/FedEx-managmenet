import React, { useState, useEffect } from 'react';
import { fetchOpsDashboardData } from '../../services/ops/dashboard.service';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Search, Filter, AlertCircle, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import Input from '../../components/ui/Input';
import { PRIORITY_CONFIG_MOCK } from '../../data/ops/dashboard.mock';

const OpsDashboard = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchOpsDashboardData();
                setCases(data);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getPriorityInfo = (score) => {
        if (score >= PRIORITY_CONFIG_MOCK.CRITICAL.min) return PRIORITY_CONFIG_MOCK.CRITICAL;
        if (score >= PRIORITY_CONFIG_MOCK.HIGH.min) return PRIORITY_CONFIG_MOCK.HIGH;
        if (score >= PRIORITY_CONFIG_MOCK.MEDIUM.min) return PRIORITY_CONFIG_MOCK.MEDIUM;
        return PRIORITY_CONFIG_MOCK.LOW;
    };

    const filteredCases = cases.filter(c =>
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.customerName.toLowerCase().includes(search.toLowerCase())
    );

    const stats = {
        total: cases.length,
        critical: cases.filter(c => c.priorityScore >= 80).length,
        slaBreach: cases.filter(c => c.status === 'Escalated').length, // Mock logic
        recoveryRate: '68%'
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Operations Dashboard</h1>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Export Report</Button>
                    <Button>Create Case</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Active Cases</p>
                                <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
                            </div>
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-critical">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Critical Priority</p>
                                <h3 className="text-2xl font-bold text-critical">{stats.critical}</h3>
                            </div>
                            <div className="p-3 bg-critical/10 rounded-full text-critical">
                                <AlertCircle className="h-6 w-6" />
                            </div>
                        </div>
                        <p className="text-xs text-red-600 mt-2 font-medium">Action Required Immediately</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-warning">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Potential SLA Breach</p>
                                <h3 className="text-2xl font-bold text-warning">{stats.slaBreach}</h3>
                            </div>
                            <div className="p-3 bg-warning/10 rounded-full text-warning">
                                <Clock className="h-6 w-6" />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Within 24 hours</p>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-success">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Recovery Rate</p>
                                <h3 className="text-2xl font-bold text-success">{stats.recoveryRate}</h3>
                            </div>
                            <div className="p-3 bg-success/10 rounded-full text-success">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                        </div>
                        <p className="text-xs text-success mt-2">+2.4% vs last month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Queue */}
            <Card>
                <CardHeader className="border-b border-gray-100 flex flex-row items-center justify-between">
                    <CardTitle>Priority Queue</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Search case ID or customer..."
                                className="pl-9 w-[250px]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Priority</TableHead>
                                <TableHead>Case ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Overdue</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Assigned DCA</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24">Loading cases...</TableCell>
                                </TableRow>
                            ) : filteredCases.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-gray-500">No cases found.</TableCell>
                                </TableRow>
                            ) : (
                                filteredCases.map((caseItem) => {
                                    const priority = getPriorityInfo(caseItem.priorityScore);
                                    return (
                                        <TableRow key={caseItem.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-3 w-3 rounded-full bg-${priority.color.replace('500', '500')}`} style={{ backgroundColor: priority.color.includes('red') ? '#ef4444' : priority.color.includes('orange') ? '#f97316' : priority.color.includes('yellow') ? '#eab308' : '#22c55e' }} />
                                                    <span className="font-semibold">{caseItem.priorityScore}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-medium">{caseItem.id}</TableCell>
                                            <TableCell>{caseItem.customerName}</TableCell>
                                            <TableCell>${caseItem.amount.toLocaleString()}</TableCell>
                                            <TableCell>{caseItem.overdueDays} days</TableCell>
                                            <TableCell>
                                                <Badge variant={caseItem.status === 'New' ? 'default' : 'secondary'}>
                                                    {caseItem.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {caseItem.assignedDcaId ? (
                                                    <span className="text-sm text-gray-600">DCA-{caseItem.assignedDcaId}</span>
                                                ) : (
                                                    <span className="text-sm text-gray-400 italic">Unassigned</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="sm">Details</Button>
                                                    {!caseItem.assignedDcaId && <Button size="sm">Assign</Button>}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default OpsDashboard;
