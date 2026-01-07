import React, { useState, useEffect } from 'react';
import Button from './ui/Button';
import { X, Clock, Activity, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/Table';

// Mock activity data
const MOCK_ACTIVITY_LOGS = [
    { id: 1, timestamp: '2023-11-15 10:30 AM', action: 'User Login', details: 'Successful login from IP 192.168.1.1' },
    { id: 2, timestamp: '2023-11-14 02:15 PM', action: 'Profile Update', details: 'Changed profile picture' },
    { id: 3, timestamp: '2023-11-13 09:45 AM', action: 'System Access', details: 'Accessed Case Management Module' },
    { id: 4, timestamp: '2023-11-12 11:20 AM', action: 'Report Generated', details: 'Generated Weekly Performance Report' },
    { id: 5, timestamp: '2023-11-10 04:55 PM', action: 'User Logout', details: 'Logged out successfully' },
];

const UserActivityModal = ({ userId, isOpen, onClose }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && userId) {
            setLoading(true);
            // Simulate API call
            setTimeout(() => {
                setLogs(MOCK_ACTIVITY_LOGS);
                setLoading(false);
            }, 600);
        }
    }, [isOpen, userId]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gray-50 flex-shrink-0">
                    <div className="flex items-center">
                        <Activity className="h-5 w-5 text-gray-500 mr-2" />
                        <h3 className="text-lg font-semibold text-gray-900">User Activity Log</h3>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-auto p-0">
                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[180px]">Timestamp</TableHead>
                                    <TableHead className="w-[150px]">Action</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="font-medium text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="h-3 w-3 mr-2 text-gray-400" />
                                                {log.timestamp}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                                                {log.action}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-gray-600">
                                            {log.details}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end p-4 border-t bg-gray-50 flex-shrink-0">
                    <Button onClick={onClose}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default UserActivityModal;
