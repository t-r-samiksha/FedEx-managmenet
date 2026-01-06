import React, { useEffect, useState } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Bar } from 'react-chartjs-2';
import '../../utils/chartSetup';
import { Trophy, Target, TrendingUp } from 'lucide-react';
import { fetchMyPerformance } from '../../services/dca/myPerformance.service';

const MyPerformance = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchMyPerformance();
                setData(result);
            } catch (error) {
                console.error("Failed to load performance data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return <div className="p-6">Loading performance data...</div>;
    }

    if (!data) return <div className="p-6">Unable to load data.</div>;

    const recoveryChartData = {
        labels: data.recoveryTrend.labels,
        datasets: [
            {
                label: 'My Recovery ($)',
                data: data.recoveryTrend.data,
                backgroundColor: '#4D148C',
                hoverBackgroundColor: '#FF6600',
                borderRadius: 4,
            }
        ]
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Performance</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-primary to-purple-800 text-white border-0">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-purple-200">Current Rank</p>
                                <h3 className="text-4xl font-bold mt-1">{data.rank.text}</h3>
                                <p className="text-sm mt-2 flex items-center gap-1"><Trophy className="h-4 w-4" /> {data.rank.tier}</p>
                            </div>
                            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-yellow-300" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500">Monthly Target</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{data.target.amount}</h3>
                                <p className="text-sm text-green-600 mt-2 font-medium">{data.target.achievedText}</p>
                            </div>
                            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                                <Target className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-600" style={{ width: `${data.target.achievedPercentage}%` }}></div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500">Incentive Earned</p>
                                <h3 className="text-3xl font-bold text-gray-900 mt-1">{data.incentive.amount}</h3>
                                <p className="text-sm text-gray-500 mt-2">{data.incentive.payoutDate}</p>
                            </div>
                            <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Recovery Trend (6 Months)</CardTitle></CardHeader>
                <CardContent>
                    <div className="h-[350px]">
                        <Bar
                            data={recoveryChartData}
                            options={{
                                maintainAspectRatio: false,
                                scales: { y: { beginAtZero: true } }
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyPerformance;
