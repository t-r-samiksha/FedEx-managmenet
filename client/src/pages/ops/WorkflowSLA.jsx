import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Clock, ShieldAlert, GitBranch } from 'lucide-react';

const WorkflowSLA = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Workflow & SLA Configuration</h1>
                <Button>Save Changes</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>SLA Thresholds</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">First Contact</p>
                                    <p className="text-xs text-gray-500">Time to action new cases</p>
                                </div>
                            </div>
                            <select className="border rounded p-1 text-sm">
                                <option>24 Hours</option>
                                <option>48 Hours</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <Clock className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">Follow-up Frequency</p>
                                    <p className="text-xs text-gray-500">Time between actions</p>
                                </div>
                            </div>
                            <select className="border rounded p-1 text-sm">
                                <option>3 Days</option>
                                <option>5 Days</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Auto-Assignment Rules</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                            <div className="flex items-center gap-3">
                                <GitBranch className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">High Priority Routing</p>
                                    <p className="text-xs text-gray-500">Score &gt; 80 assigned to Top Tier DCAs</p>
                                </div>
                            </div>
                            <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="h-5 w-5 text-critical" />
                                <div>
                                    <p className="font-medium">Risk Escalation</p>
                                    <p className="text-xs text-gray-500">Auto-escalate after 2 SLA breaches</p>
                                </div>
                            </div>
                            <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WorkflowSLA;
