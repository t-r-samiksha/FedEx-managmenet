import React, { useEffect, useState } from 'react';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Check, X } from 'lucide-react';
import { fetchPendingAssignments } from '../../services/ops/assignments.service';

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchPendingAssignments();
                setAssignments(data);
            } catch (error) {
                console.error("Failed to load assignments", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading assignments...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Assignment Approvals</h1>

            <div className="grid grid-cols-1 gap-6">
                {assignments.map((c) => (
                    <Card key={c.id}>
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-lg">{c.id} - {c.customerName}</h3>
                                        <Badge variant="warning">{c.riskLabel}</Badge>
                                    </div>
                                    <p className="text-gray-500 text-sm">Amount: ${c.amount.toLocaleString()} • Overdue: {c.overdueDays} days</p>
                                </div>

                                <div className="flex items-center gap-4 bg-purple-50 p-3 rounded-lg border border-purple-100">
                                    <div className="text-sm">
                                        <p className="text-purple-700 font-medium">AI Recommendation:</p>
                                        <p className="font-bold text-gray-900">{c.recommendation.dcaName}</p>
                                    </div>
                                    <div className="text-right text-xs text-gray-500">
                                        <p>Match Score: {c.recommendation.matchScore}</p>
                                        <p>Recovery Est: {c.recommendation.recoveryEst}</p>
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
                ))}
            </div>
        </div>
    );
};

export default Assignments;
