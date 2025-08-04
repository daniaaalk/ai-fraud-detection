import React from 'react';
import { MonitoringStats } from '../types';
import { TrendingUp, AlertCircle, Globe, Building2, DollarSign, Activity } from 'lucide-react';

interface StatsOverviewProps {
  stats: MonitoringStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Monitored Transactions',
      value: stats.totalTransactions.toLocaleString(),
      icon: DollarSign,
      color: 'blue',
      change: '+12.3%',
      subtitle: 'Last 24 hours'
    },
    {
      title: 'STRs Generated',
      value: stats.suspiciousTransactions.toLocaleString(),
      icon: AlertCircle,
      color: 'red',
      change: '-5.2%',
      subtitle: 'Pending review'
    },
    {
      title: 'Active Investigations',
      value: stats.activeAlerts.toLocaleString(),
      icon: Activity,
      color: 'amber',
      change: '+2.1%',
      subtitle: 'High priority'
    },
    {
      title: 'Cross-Border Flows',
      value: stats.overseasTransactions.toLocaleString(),
      icon: Globe,
      color: 'purple',
      change: '+8.7%',
      subtitle: 'International'
    },
    {
      title: 'Shell Company Alerts',
      value: stats.frontBusinessTransactions.toLocaleString(),
      icon: Building2,
      color: 'orange',
      change: '-1.4%',
      subtitle: 'Front businesses'
    },
    {
      title: 'System Risk Index',
      value: stats.averageRiskScore.toFixed(1),
      icon: TrendingUp,
      color: 'green',
      change: '-3.2%',
      subtitle: 'AI confidence'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-100',
      red: 'bg-red-500 text-red-100',
      amber: 'bg-amber-500 text-amber-100',
      purple: 'bg-purple-500 text-purple-100',
      orange: 'bg-orange-500 text-orange-100',
      green: 'bg-green-500 text-green-100'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${getColorClasses(stat.color)} shadow-lg`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.title}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};