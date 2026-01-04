import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MOCK_CASES } from '../../data/mockData';
import { Clock, Briefcase, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const DCADashboard = () => {
    // Filter for 'my' cases (mock logic: assignedDcaId 'dca1')
    const myCases = MOCK_CASES.filter(c => c.assignedDcaId === 'dca1').slice(0, 5);

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
                                <TableHead>Deadline</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {myCases.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">{c.id}</TableCell>
                                    <TableCell>{c.customerName}</TableCell>
                                    <TableCell className="text-red-600 font-medium">Tomorrow</TableCell>
                                    <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline" asChild>
                                            {/* Link Placeholder */}
                                            <span>Update</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default DCADashboard;
