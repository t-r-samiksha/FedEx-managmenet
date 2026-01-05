import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { MOCK_LOGS } from '../../data/mockData';

const AuditLog = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">System Audit Log</h1>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_LOGS.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="text-gray-500 text-sm">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="font-medium">{log.user}</TableCell>
                                    <TableCell><Badge variant="outline">{log.role}</Badge></TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell className="text-gray-500 text-sm">IP: 192.168.1.1</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuditLog;
