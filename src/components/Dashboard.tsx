import React, { useState, useEffect } from 'react';
import { generateMockTransactions, generateMockAlerts, generateMockStats } from '../data/mockData';
import { Transaction, Alert, MonitoringStats } from '../types';
import { StatsOverview } from './StatsOverview';
import { TransactionTable } from './TransactionTable';
import { AlertPanel } from './AlertPanel';
import { RiskAnalysis } from './RiskAnalysis';
import { GeographicMonitor } from './GeographicMonitor';
import { LiveDemo } from './LiveDemo';

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<MonitoringStats | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'alerts' | 'analysis' | 'geographic' | 'demo'>('overview');

  useEffect(() => {
    // Initialize data
    setTransactions(generateMockTransactions());
    setAlerts(generateMockAlerts());
    setStats(generateMockStats());

    // Simulate real-time updates with more frequent updates for demo
    const interval = setInterval(() => {
      const newTransactions = generateMockTransactions();
      setTransactions(newTransactions);
      setStats(generateMockStats());
    }, 5000); // More frequent updates for hackathon demo

    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Control Center', icon: '📊', color: 'blue' },
    { id: 'demo', label: 'Live AI Demo', icon: '🤖', color: 'purple' },
    { id: 'transactions', label: 'Transaction Monitor', icon: '💰', color: 'green' },
    { id: 'alerts', label: 'STR & SAR Queue', icon: '🚨', color: 'red' },
    { id: 'analysis', label: 'Intelligence Analysis', icon: '🔍', color: 'orange' },
    { id: 'geographic', label: 'Cross-Border Monitor', icon: '🌍', color: 'indigo' }
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Tab Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50/50`
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            <StatsOverview stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransactionTable transactions={transactions.slice(0, 10)} title="Recent Transactions" />
              <AlertPanel alerts={alerts.slice(0, 8)} />
            </div>
          </div>
        )}
        
        {activeTab === 'demo' && (
          <LiveDemo transactions={transactions} alerts={alerts} />
        )}
        
        {activeTab === 'transactions' && (
          <TransactionTable transactions={transactions} title="All Transactions" showFilters />
        )}
        
        {activeTab === 'alerts' && (
          <AlertPanel alerts={alerts} showFilters />
        )}
        
        {activeTab === 'analysis' && (
          <RiskAnalysis transactions={transactions} />
        )}
        
        {activeTab === 'geographic' && (
          <GeographicMonitor transactions={transactions} />
        )}
      </div>
    </div>
  );
};