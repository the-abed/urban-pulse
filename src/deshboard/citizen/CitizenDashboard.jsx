import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const CitizenDashboard = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading } = useQuery({
        queryKey: ['citizen-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/citizen-stats');
            return res.data;
        }
    });

    if (isLoading) return <span className="loading loading-lg"></span>;

    // Data for the Pie Chart
    const chartData = [
        { name: 'Pending', value: stats.pending, color: '#fbbd23' },
        { name: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
        { name: 'Resolved', value: stats.resolved, color: '#22c55e' },
    ];

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">My Impact Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Total Submitted" value={stats.total} icon="📝" color="primary" />
                <StatCard title="Pending" value={stats.pending} icon="⏳" color="warning" />
                <StatCard title="Resolved" value={stats.resolved} icon="✅" color="success" />
                <StatCard title="Total Payments" value={`$${stats.totalPayments}`} icon="💰" color="info" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card bg-base-100 shadow-xl p-6 border border-base-200">
                    <h2 className="text-xl font-semibold mb-4 text-center">Issues Status Breakdown</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={chartData} 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Small reusable card component
const StatCard = ({ title, value, icon, color }) => (
    <div className={`stats shadow bg-base-100 border-l-4 border-${color}`}>
        <div className="stat">
            <div className="stat-figure text-3xl">{icon}</div>
            <div className="stat-title uppercase text-xs font-bold">{title}</div>
            <div className={`stat-value text-${color}`}>{value}</div>
        </div>
    </div>
);

export default CitizenDashboard;