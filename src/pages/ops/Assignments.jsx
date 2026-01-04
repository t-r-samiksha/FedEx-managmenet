import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { MOCK_CASES, DCAS } from '../../data/mockData';
import { Check, X, AlertTriangle } from 'lucide-react';

const Assignments = () => {
    // Filter cases that might need assignment review (mock logic)
    const pendingCases = MOCK_CASES.filter(c => c.status === 'New').slice(0, 5);

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Assignment Approvals</h1>

            <div className="grid grid-cols-1 gap-6">
                {pendingCases.map((c, i) => {
                    const recommendedDCA = DCAS[i % 3]; // Mock recommendation
                    return (
                        <Card key={c.id}>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-semibold text-lg">{c.id} - {c.customerName}</h3>
                                            <Badge variant="warning">High Risk</Badge>
                                        </div>
                                        <p className="text-gray-500 text-sm">Amount: ${c.amount.toLocaleString()} • Overdue: {c.overdueDays} days</p>
                                    </div>

                                    <div className="flex items-center gap-4 bg-purple-50 p-3 rounded-lg border border-purple-100">
                                        <div className="text-sm">
                                            <p className="text-purple-700 font-medium">AI Recommendation:</p>
                                            <p className="font-bold text-gray-900">{recommendedDCA.name}</p>
                                        </div>
                                        <div className="text-right text-xs text-gray-500">
                                            <p>Match Score: 95%</p>
                                            <p>Recovery Est: High</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
                                            <X className="h-4 w-4 mr-1" /> Reject
                                        </Button>
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                            <Check className="h-4 w-4 mr-1" /> Approve
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Assignments;
