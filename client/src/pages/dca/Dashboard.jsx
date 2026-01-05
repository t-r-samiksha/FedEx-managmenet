import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MOCK_CASES, PRIORITY_CONFIG } from '../../data/mockData';
import { Clock, Briefcase, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, differenceInDays, parseISO } from 'date-fns';

const DCADashboard = () => {
    // Filter for 'my' cases (mock logic: assignedDcaId 'dca1')
    const myCases = MOCK_CASES.filter(c => c.assignedDcaId === 'dca1').slice(0, 5);

    // Helper to get priority config
    const getPriority = (score) => {
        if (score >= PRIORITY_CONFIG.CRITICAL.min) return PRIORITY_CONFIG.CRITICAL;
        if (score >= PRIORITY_CONFIG.HIGH.min) return PRIORITY_CONFIG.HIGH;
        if (score >= PRIORITY_CONFIG.MEDIUM.min) return PRIORITY_CONFIG.MEDIUM;
        return PRIORITY_CONFIG.LOW;
    };

    // Helper for SLA text
    const getSLAText = (dateStr) => {
        const days = differenceInDays(parseISO(dateStr), new Date());
        if (days < 0) return { text: 'Overdue', color: 'text-critical' };
        if (days === 0) return { text: 'Due Today', color: 'text-warning' };
        return { text: `Due in ${days} days`, color: 'text-gray-500' };
    };

    const stats = {
        active: 12,
        resolved: 45,
        commission: '$3,400'
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Agent</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active Cases</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.active}</h3>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-full"><Briefcase className="h-6 w-6" /></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Resolved Results</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.resolved}</h3>
                        </div>
                        <div className="p-3 bg-green-50 text-green-600 rounded-full"><CheckCircle2 className="h-6 w-6" /></div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Actions</p>
                            <h3 className="text-2xl font-bold text-warning">4</h3>
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
                            {myCases.map((c) => {
                                const priority = getPriority(c.priorityScore);
                                const sla = getSLAText(c.deadline);
                                return (
                                    <TableRow key={c.id}>
                                        <TableCell className="font-medium">
                                            <Link to={`/dca/cases/${c.id}`} className="hover:underline text-primary">
                                                {c.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{c.customerName}</TableCell>
                                        <TableCell>
                                            <Badge variant={priority.color}>{priority.label}</Badge>
                                        </TableCell>
                                        <TableCell className={`${sla.color} font-medium`}>{sla.text}</TableCell>
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
