import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, Building2, MapPin, Clock, AlertTriangle, CheckCircle2, User, Briefcase } from 'lucide-react';
import { fetchCaseDetails } from '../../services/dca/caseDetails.service';

const CaseDetails = () => {
    const { caseId } = useParams();
    const [loading, setLoading] = useState(true);
    const [caseData, setCaseData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchCaseDetails(caseId);
                setCaseData(data);
            } catch (error) {
                console.error("Failed to load case details", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [caseId]);

    if (loading) {
        return (
            <div className="space-y-6 max-w-6xl mx-auto p-6 animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-48 bg-gray-200 rounded-lg"></div>
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                        <div className="h-32 bg-gray-200 rounded-lg"></div>
                    </div>
                    <div className="h-96 bg-gray-200 rounded-lg"></div>
                </div>
            </div>
        );
    }

    if (!caseData) return <div className="p-6 text-center">Case not found</div>;

    return (
        <div className="space-y-6 max-w-6xl mx-auto p-6">

            {/* 1. Case Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-lg border shadow-sm">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-gray-900">Case {caseId || caseData.id}</h1>
                        <Badge variant="destructive">{caseData.priority.label}</Badge>
                        <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                            {caseData.sla.status}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                            <User className="h-4 w-4" /> Assigned to: {caseData.assignment.dcaName}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> Status: {caseData.status}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" asChild>
                        <Link to="/dca/cases">Back to List</Link>
                    </Button>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                        Escalate Case
                    </Button>
                    <Button variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                        Mark as Resolved
                    </Button>
                    <Button asChild>
                        <Link to={`/dca/update/${caseData.id}`}>Update Case</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column - Info Cards */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 2. Customer Information Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-gray-500" />
                                Customer Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Customer Name</p>
                                <p className="font-semibold text-lg text-gray-900">{caseData.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Account Type</p>
                                <p className="font-medium text-gray-900">{caseData.customer.type}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Region</p>
                                <div className="flex items-center gap-1 text-gray-900">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    {caseData.customer.region}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-500">Contact Details</p>
                                <div className="flex items-center gap-2 text-gray-900 text-sm">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    {caseData.customer.email}
                                </div>
                                <div className="flex items-center gap-2 text-gray-900 text-sm">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    {caseData.customer.phone}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Financial Summary Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Briefcase className="h-5 w-5 text-gray-500" />
                                Financial Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs font-medium text-gray-500 uppercase">Total Due</p>
                                <p className="text-xl font-bold text-gray-900">${caseData.financials.totalDue.toLocaleString()}</p>
                            </div>
                            <div className="p-4 bg-red-50 rounded-lg">
                                <p className="text-xs font-medium text-red-600 uppercase">Overdue Days</p>
                                <p className="text-xl font-bold text-red-700">{caseData.financials.overdueDays} Days</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs font-medium text-gray-500 uppercase">Last Payment</p>
                                <p className="text-lg font-semibold text-gray-900">{caseData.financials.lastPaymentDate}</p>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-xs font-medium text-blue-600 uppercase">Outstanding</p>
                                <p className="text-xl font-bold text-blue-700">${caseData.financials.outstandingBalance.toLocaleString()}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Internal Notes Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Internal Notes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-sm text-yellow-800">
                                <p className="font-semibold mb-1">FedEx System Note</p>
                                <p>{caseData.internalNotes}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Timeline */}
                <div className="space-y-6">
                    {/* 4. Case Activity Timeline */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Activity Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
                                {caseData.activityTimeline.map((item, index) => (
                                    <div key={index} className="relative pl-8">
                                        {/* Fixed class names and removed dependency on item.color/icon which are not in the new mock data */}
                                        <div className={`absolute -left-[9px] top-0 p-1 rounded-full bg-white border-2 border-white shadow-sm text-blue-600 bg-blue-100`}>
                                            <Clock className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{item.action}</p>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                            <p className="text-xs text-gray-400 mt-1">by {item.actor}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CaseDetails;
