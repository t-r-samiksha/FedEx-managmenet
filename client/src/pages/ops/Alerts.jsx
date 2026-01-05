import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { AlertCircle, Clock, ArrowRight } from 'lucide-react';

const Alerts = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Alerts & Escalations</h1>

            <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className={`border-l-4 ${i === 1 ? 'border-l-critical' : 'border-l-warning'}`}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className={`mt-1 p-2 rounded-full ${i === 1 ? 'bg-red-100 text-critical' : 'bg-yellow-100 text-warning'}`}>
                                        <AlertCircle className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">SLA Breach: First Contact Missed</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Case <span className="font-medium text-gray-900">#C-104{i}</span> assigned to <span className="font-medium text-gray-900">Beta Collections</span> has not been actioned within 48 hours.
                                        </p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Breach Time: 2 hours ago</span>
                                            <span>•</span>
                                            <span>Severity: {i === 1 ? 'Critical' : 'High'}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    View Case <ArrowRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Alerts;
