import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useParams, Link } from 'react-router-dom';
import { fetchCaseForUpdate, submitCaseUpdate } from '../../services/dca/updateCase.service';

const UpdateCase = () => {
    const { caseId } = useParams();
    const [loading, setLoading] = useState(true);
    const [caseData, setCaseData] = useState(null);
    const [formData, setFormData] = useState({
        actionType: 'Call Attempted',
        actionDate: new Date().toISOString().split('T')[0],
        outcome: 'Successful',
        amountCollected: '',
        notes: ''
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchCaseForUpdate(caseId);
                setCaseData(data);
            } catch (error) {
                console.error("Failed to load case for update", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [caseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const payload = {
            caseId: caseId || caseData?.id,
            timestamp: new Date().toISOString(),
            ...formData
        };
        try {
            const result = await submitCaseUpdate(payload);
            alert(result.message);
        } catch (error) {
            console.error("Failed to submit update", error);
            alert("Failed to submit update.");
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto p-6 animate-pulse">
                <div className="flex justify-between items-center">
                    <div className="h-8 w-48 bg-gray-200 rounded"></div>
                    <div className="h-8 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="h-40 bg-gray-200 rounded-lg"></div>
                <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
        );
    }

    if (!caseData) return <div className="p-6 text-center">Case not found</div>;

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Update Case Action</h1>
                <Button variant="ghost" asChild>
                    <Link to="/dca/cases">Back to My Cases</Link>
                </Button>
            </div>

            {/* 1. Case Summary Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Case Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Case ID</p>
                        <p className="font-semibold text-gray-900">{caseData.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Customer Name</p>
                        <p className="font-semibold text-gray-900">{caseData.customer.name}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Amount Due</p>
                        <p className="font-semibold text-gray-900">${caseData.financials.totalDue.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Priority</p>
                        <Badge variant="destructive">{caseData.priority.label}</Badge>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">SLA Deadline</p>
                        <span className="text-red-600 font-medium">{caseData.sla.status}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Current Status</p>
                        <Badge variant="outline">{caseData.status}</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Action Update Form (Dynamic) */}
            <Card>
                <CardHeader>
                    <CardTitle>Record Action</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Action Type</label>
                            <select
                                name="actionType"
                                value={formData.actionType}
                                onChange={handleInputChange}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option>Call Attempted</option>
                                <option>Email Sent</option>
                                <option>Partial Payment</option>
                                <option>Promise to Pay</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Action Date</label>
                            <input
                                type="date"
                                name="actionDate"
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                                value={formData.actionDate}
                                readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Outcome</label>
                            <select
                                name="outcome"
                                value={formData.outcome}
                                onChange={handleInputChange}
                                className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                                <option>Successful</option>
                                <option>No Response</option>
                                <option>Follow-up Required</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Amount Collected</label>
                            <div className="relative">
                                <span className="absolute left-3 top-2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    name="amountCollected"
                                    value={formData.amountCollected}
                                    onChange={handleInputChange}
                                    placeholder="0.00"
                                    className="w-full h-10 pl-7 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Notes / Remarks</label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter details about the interaction..."
                        ></textarea>
                    </div>
                </CardContent>
            </Card>

            {/* 3. Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="ghost" asChild>
                    <Link to="/dca/cases">Cancel</Link>
                </Button>
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleSubmit}>Submit Update</Button>
            </div>
        </div>
    );
};

export default UpdateCase;
