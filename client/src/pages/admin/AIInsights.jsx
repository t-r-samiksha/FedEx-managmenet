import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { BrainCircuit, Lightbulb, Zap } from 'lucide-react';
import { fetchAIInsights } from '../../services/admin/aiInsights.service';

const AIInsights = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchAIInsights();
                setData(result);
            } catch (error) {
                console.error("Failed to load AI Insights", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading insights...</div>;
    }

    if (!data) {
        return <div className="p-6">Unable to load data.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <BrainCircuit className="h-8 w-8 text-purple-600" />
                AI Intelligence Center
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.insights.map((insight) => {
                    const isPrediction = insight.type === 'prediction';
                    return (
                        <Card key={insight.id} className={isPrediction ? "bg-purple-50 border-purple-100" : "bg-blue-50 border-blue-100"}>
                            <CardContent className="p-6">
                                <h3 className={`text-lg font-semibold mb-2 ${isPrediction ? "text-purple-900" : "text-blue-900"}`}>
                                    {insight.title}
                                </h3>
                                <p className={`mb-4 text-sm ${isPrediction ? "text-purple-700" : "text-blue-700"}`}>
                                    {insight.description}
                                </p>
                                <div className={`flex items-center gap-2 text-sm font-medium ${isPrediction ? "text-purple-800" : "text-blue-800"}`}>
                                    {isPrediction ? <Zap className="h-4 w-4" /> : <Lightbulb className="h-4 w-4" />}
                                    {insight.metric}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Feature Importance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {data.featureImportance.map((feature) => (
                            <div key={feature.id}>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                                    <span className="text-sm font-medium text-gray-700">{feature.impactLabel}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: `${feature.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AIInsights;

