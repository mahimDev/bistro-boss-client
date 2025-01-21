import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaAward, FaDollarSign, FaList, FaUsers } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })
    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data
        }
    })
    //    customShapeBarChart

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    // custom with pie chart
    const pieChart = chartData.map(data => {
        return { name: data.category, value: data.totalRevenue }
    })
    console.log(pieChart)
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <h1 className="text-4xl"> Hi, Welcome {user?.displayName ? user.displayName : "Back"}</h1>

            {/* stats */}
            <div className="stats shadow">
                <div className="stat place-items-center">
                    <div className="stat-title">Revenue</div>

                    <div className="stat-value gap-3 flex items-center">
                        <FaDollarSign></FaDollarSign>
                        {stats?.revenue}</div>

                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary gap-3 flex items-center">
                        <FaUsers></FaUsers>
                        {stats?.users}</div>

                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Menu</div>
                    <div className="stat-value gap-3 flex items-center">
                        <FaList></FaList>
                        {stats?.menuItems}</div>

                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Orders</div>
                    <div className="stat-value gap-3 flex items-center">
                        <FaAward></FaAward>
                        {stats?.orders}</div>

                </div>
            </div>
            {/* chart */}
            <div className="flex">
                {/* customShapeBarChart */}
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                {/* 2nd chart */}
                <div>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChart}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChart.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;