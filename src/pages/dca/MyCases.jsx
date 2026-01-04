import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MOCK_CASES } from '../../data/mockData';

const MyCases = () => {
    // Mock filtering for assigned cases
    const cases = MOCK_CASES.filter(c => c.assignedDcaId === 'dca1');

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Cases</h1>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Case ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Action</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cases.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-medium">{c.id}</TableCell>
                                    <TableCell>{c.customerName}</TableCell>
                                    <TableCell>${c.amount.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={c.status === 'Paid' ? 'success' : 'default'}>{c.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">{c.lastAction}</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm">View Details</Button>
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

export default MyCases;
