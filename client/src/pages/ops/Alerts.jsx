
import React, { useEffect, useState } from 'react';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { fetchAlerts } from '../../services/ops/alerts.service';

const Alerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAlerts();
                setAlerts(data);
            } catch (error) {
                console.error("Failed to load alerts", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading alerts...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Alerts & Escalations</h1>

            <div className="space-y-4">
                {alerts.map((alert) => (
                    <Card key={alert.id} className={`border-l-4 ${alert.severity === 'critical' ? 'border-l-critical' : 'border-l-warning'}`}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex gap-4">
                                    <div className={`mt-1 p-2 rounded-full ${alert.severity === 'critical' ? 'bg-red-100 text-critical' : 'bg-yellow-100 text-warning'}`}>
                                        <AlertCircle className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {alert.description}
                                        </p>
                                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Breach Time: {alert.breachTime}</span>
                                            <span>•</span>
                                            <span>Severity: {alert.severityLabel}</span>
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
