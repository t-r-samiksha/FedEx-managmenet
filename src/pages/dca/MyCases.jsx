import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MOCK_CASES, PRIORITY_CONFIG } from '../../data/mockData';
import { Link } from 'react-router-dom';
import { differenceInDays, parseISO } from 'date-fns';

const MyCases = () => {
    // Mock filtering for assigned cases
    const cases = MOCK_CASES.filter(c => c.assignedDcaId === 'dca1');

    // Helper to get priority config (duplicated for safety as per instructions not to refactor broadly)
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
                                <TableHead>Priority</TableHead>
                                <TableHead>Deadline</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Action</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cases.map((c) => {
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
                                        <TableCell>${c.amount.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={c.status === 'Paid' ? 'success' : 'default'}>{c.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-500">{c.lastAction}</TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" asChild>
                                                <Link to={`/dca/cases/${c.id}`}>View Details</Link>
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

export default MyCases;
