import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useParams, Link } from 'react-router-dom';

const UpdateCase = () => {
    const { caseId } = useParams();

    // Static Dummy Data for Case Summary
    const caseSummary = {
        id: caseId || 'C-1035', // Fallback if no ID in URL for some reason, though likely will be
        customerName: 'Safe Logistics Pvt Ltd',
        amountDue: '$12,450.00',
        priority: 'High', // Critical / High / Medium / Low
        slaDeadline: 'Due Tomorrow',
        status: 'Open'
    };

    // Helper for badge color based on priority (similar to Dashboard but static here or reused logic if I could import, but keeping simple/static)
    const getPriorityColor = (p) => {
        switch (p) {
            case 'Critical': return 'destructive';
            case 'High': return 'text-critical'; // Using text-critical as per Dashboard logic which seemed to use text classes for custom badges or specific map
            // Dashboard used: return { text: 'Overdue', color: 'text-critical' }; 
            // Wait, Dashboard uses `Badge variant={priority.color}`. 
            // Let's use standard badge variants if possible: default, secondary, destructive, outline.
            // Dashboard PRIORITY_CONFIG keys: CRITICAL, HIGH, MEDIUM, LOW.
            // Let's map 'High' to 'destructive' or similar.
            case 'Medium': return 'secondary';
            case 'Low': return 'outline';
            default: return 'destructive';
        }
    };

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
                        <p className="font-semibold text-gray-900">{caseSummary.id}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Customer Name</p>
                        <p className="font-semibold text-gray-900">{caseSummary.customerName}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Amount Due</p>
                        <p className="font-semibold text-gray-900">{caseSummary.amountDue}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Priority</p>
                        <Badge variant="destructive">{caseSummary.priority}</Badge>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">SLA Deadline</p>
                        <span className="text-red-600 font-medium">{caseSummary.slaDeadline}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Current Status</p>
                        <Badge variant="outline">{caseSummary.status}</Badge>
                    </div>
                </CardContent>
            </Card>

            {/* 2. Action Update Form (Static) */}
            <Card>
                <CardHeader>
                    <CardTitle>Record Action</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Action Type</label>
                            <select className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
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
                                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-gray-50 text-gray-500 cursor-not-allowed"
                                value="2023-10-27" // Static date pre-filled
                                readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Outcome</label>
                            <select className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
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
                                    type="text"
                                    placeholder="0.00"
                                    className="w-full h-10 pl-7 pr-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Notes / Remarks</label>
                        <textarea
                            className="w-full min-h-[100px] p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter details about the interaction..."
                        ></textarea>
                    </div>
                </CardContent>
            </Card>

            {/* 3. Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="ghost">Cancel</Button>
                <Button variant="outline">Save Draft</Button>
                <Button>Submit Update</Button>
            </div>
        </div>
    );
};

export default UpdateCase;
