import React, { useEffect, useState } from 'react';
import Card, { CardContent } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { fetchMyCases } from '../../services/dca/myCases.service';

const MyCases = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchMyCases();
                setCases(data);
            } catch (error) {
                console.error("Failed to load cases", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading cases...</div>;
    }

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
                            {cases.map((c) => (
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
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyCases;
