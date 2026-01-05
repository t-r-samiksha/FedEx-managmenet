import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BrainCircuit, Lightbulb, Zap } from 'lucide-react';

const AIInsights = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BrainCircuit className="h-8 w-8 text-purple-600" />
                AI Intelligence Center
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-purple-50 border-purple-100">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-purple-900 mb-2">Predictive Recovery Model</h3>
                        <p className="text-purple-700 mb-4 text-sm">Our AI model predicts a 15% increase in recovery if actioned within 48h for "High Risk" tier customers.</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-purple-800">
                            <Zap className="h-4 w-4" /> Confidence Score: 92%
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">DCA Optimization</h3>
                        <p className="text-blue-700 mb-4 text-sm">Beta Collections is outperforming peers in the "Retail" sector. Recommend increasing allocation by 20%.</p>
                        <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                            <Lightbulb className="h-4 w-4" /> Opportunity Impact: High
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Feature Importance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Days Overdue</span>
                                <span className="text-sm font-medium text-gray-700">35% Impact</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Previous Payment History</span>
                                <span className="text-sm font-medium text-gray-700">25% Impact</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">Communication Responsiveness</span>
                                <span className="text-sm font-medium text-gray-700">20% Impact</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AIInsights;
