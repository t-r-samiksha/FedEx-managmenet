import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Clock, ShieldAlert, GitBranch } from 'lucide-react';
import { fetchWorkflowConfig, saveWorkflowConfig } from '../../services/ops/workflowSLA.service';

const WorkflowSLA = () => {
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchWorkflowConfig();
                setConfig(data);
            } catch (error) {
                console.error("Failed to load workflow config", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSave = async () => {
        const result = await saveWorkflowConfig(config);
        if (result.success) {
            alert("Configuration saved successfully!");
        }
    };

    if (loading) return <div className="p-6">Loading configuration...</div>;
    if (!config) return <div className="p-6">Configuration not available.</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Workflow & SLA Configuration</h1>
                <Button onClick={handleSave}>Save Changes</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>SLA Thresholds</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {config.slaThresholds.map((threshold) => (
                            <div key={threshold.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium">{threshold.label}</p>
                                        <p className="text-xs text-gray-500">{threshold.description}</p>
                                    </div>
                                </div>
                                <select
                                    className="border rounded p-1 text-sm"
                                    defaultValue={threshold.value}
                                >
                                    {threshold.options.map(opt => (
                                        <option key={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Auto-Assignment Rules</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        {config.autoAssignmentRules.map((rule) => (
                            <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                                <div className="flex items-center gap-3">
                                    {rule.icon === 'GitBranch' ? <GitBranch className="h-5 w-5 text-primary" /> : <ShieldAlert className="h-5 w-5 text-critical" />}
                                    <div>
                                        <p className="font-medium">{rule.label}</p>
                                        <p className="text-xs text-gray-500">{rule.description}</p>
                                    </div>
                                </div>
                                <div className={`h-4 w-4 rounded-full ${rule.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WorkflowSLA;
