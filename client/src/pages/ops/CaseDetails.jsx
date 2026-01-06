import React from 'react';
import { useParams } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { MOCK_CASES } from '../../data/mockData';
import { ArrowLeft, Clock, DollarSign, BrainCircuit, History } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { ArrowLeft, Clock, DollarSign, BrainCircuit, History } from 'lucide-react';
import { fetchCaseDetails } from '../../services/ops/caseDetails.service';

const CaseDetails = () => {
    // In a real app we'd use useParams()
    const { caseId } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Pass "C-1001" as default if caseId is undefined for demo purposes
                // based on original logic which used MOCK_CASES[0]
                const idToFetch = caseId || "C-1001";
                const data = await fetchCaseDetails(idToFetch);
                setCaseData(data);
            } catch (error) {
                console.error("Failed to load case details", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [caseId]);

    if (loading) return <div className="p-6">Loading case details...</div>;
    if (!caseData) return <div className="p-6">Case not found.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold text-gray-900">Case details: {caseData.id}</h1>
                <Badge variant={caseData.status === 'New' ? 'default' : 'secondary'}>{caseData.status}</Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Info */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Customer Name</p>
                                    <p className="font-semibold text-gray-900 text-lg">{caseData.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Outstanding</p>
                                    <p className="font-semibold text-primary text-lg flex items-center">
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        {caseData.amount.toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Days Overdue</p>
                                    <p className="font-semibold text-critical">{caseData.overdueDays} Days</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Priority Score</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-critical" style={{ width: `${caseData.priorityScore}%` }}></div>
                                        </div>
                                        <span className="font-bold">{caseData.priorityScore}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-purple-600">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BrainCircuit className="h-5 w-5 text-purple-600" />
                                <CardTitle>AI Recovery Probability</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-purple-600">{caseData.aiProbability}%</div>
                                    <p className="text-xs text-gray-500">Success Chance</p>
                                </div>
                                <div className="border-l pl-6">
                                    <p className="text-sm font-medium mb-2">Key Drivers:</p>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                                        <li>Frequent partial payments history</li>
                                        <li>Responsive to email communication</li>
                                        <li>High credit utilization recently</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Case History</CardTitle></CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {caseData.history.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-gray-300' : 'bg-primary'}`}></div>
                                            {index < caseData.history.length - 1 && <div className="h-full w-0.5 bg-gray-200 my-1"></div>}
                                        </div>
                                        <div className={index < caseData.history.length - 1 ? 'pb-4' : ''}>
                                            <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Actions */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full">Assign to DCA</Button>
                            <Button variant="outline" className="w-full">Log Call</Button>
                            <Button variant="outline" className="w-full text-critical border-critical hover:bg-critical/10">Escalate Case</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>SLA Timer</CardTitle></CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2 text-warning mb-2">
                                <Clock className="h-5 w-5" />
                                <span className="font-bold text-lg">{caseData.sla.remaining}</span>
                            </div>
                            <p className="text-xs text-gray-500">Remaining before Stage 1 Escalation</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CaseDetails;
