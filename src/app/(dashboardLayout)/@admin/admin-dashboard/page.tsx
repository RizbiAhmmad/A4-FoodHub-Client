import { getAdminAnalyticsAction } from "@/actions/meta.action";
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Utensils, 
  Store,
  DollarSign
} from "lucide-react";
import DashboardCharts from "@/components/modules/admin/analytics/DashboardCharts";

export default async function AdminDashboard() {
  const { data, error } = await getAdminAnalyticsAction();

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-red-500 bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
          Failed to load analytics data.
        </p>
      </div>
    );
  }

  const { stats, salesData, categoryData } = data;

  const statCards = [
    {
      title: "Total Revenue",
      value: `৳${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="text-emerald-600" />,
      bg: "bg-emerald-50",
      trend: "+12.5%",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: <ShoppingBag className="text-blue-600" />,
      bg: "bg-blue-50",
      trend: "+8.2%",
    },
    {
      title: "Active Customers",
      value: stats.totalCustomers.toString(),
      icon: <Users className="text-purple-600" />,
      bg: "bg-purple-50",
      trend: "+5.4%",
    },
    {
      title: "Total Providers",
      value: stats.totalProviders.toString(),
      icon: <Store className="text-orange-600" />,
      bg: "bg-orange-50",
      trend: "+2.1%",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, Admin. Here is what&apos;s happening today.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="bg-emerald-500 p-2 rounded-lg text-white">
            <TrendingUp size={20} />
          </div>
          <span className="text-sm font-bold text-gray-700 dark:text-gray-200 pr-4">
            Platform Growth: +15.4%
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div 
            key={idx}
            className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-100/50 dark:shadow-none flex flex-col gap-4 group hover:border-orange-200 dark:hover:border-orange-500/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={`${card.bg} p-3 rounded-2xl transition-transform group-hover:scale-110 duration-300`}>
                {card.icon}
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                {card.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                {card.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <DashboardCharts salesData={salesData} categoryData={categoryData} />

      {/* Quick Summary Row */}
      <div className="bg-linear-to-r from-orange-500 to-red-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-orange-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
              <Utensils size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Menu Performance</h3>
              <p className="text-white/80">You currently have <span className="font-bold underline">{stats.totalMeals} meals</span> listed on the platform.</p>
            </div>
          </div>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-colors shadow-lg">
            Manage Inventory
          </button>
        </div>
      </div>
    </div>
  );
}