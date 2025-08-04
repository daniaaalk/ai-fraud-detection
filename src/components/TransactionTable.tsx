import React, { useState } from 'react';
import { Transaction } from '../types';
import { Search, Filter, ExternalLink, Flag, Eye } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  title: string;
  showFilters?: boolean;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({ 
  transactions, 
  title, 
  showFilters = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.pseudoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.fromCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.toCountry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRisk = filterRisk === 'all' || transaction.riskLevel === filterRisk;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesRisk && matchesStatus;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'critical': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'flagged': return 'text-red-600 bg-red-50';
      case 'investigating': return 'text-blue-600 bg-blue-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center">
            <Eye className="h-5 w-5 text-blue-500 mr-2" />
            {title}
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Live Feed</span>
          </div>
        </div>
        
        {showFilters && (
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
              <option value="critical">Critical Risk</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="investigating">Investigating</option>
            </select>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Transaction ID</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Amount</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Route</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Type</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Risk Level</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Status</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Flags</th>
              <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <code className="text-sm font-mono text-slate-600">{transaction.pseudoId}</code>
                    {transaction.isOverseas && <ExternalLink className="h-3 w-3 text-blue-500" />}
                    {transaction.isFrontBusiness && <Flag className="h-3 w-3 text-red-500" />}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium">
                    {transaction.amount.toLocaleString()} {transaction.currency}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm">
                    {transaction.fromCountry} → {transaction.toCountry}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm capitalize">{transaction.transactionType.replace('_', ' ')}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(transaction.riskLevel)}`}>
                    {transaction.riskLevel} ({transaction.riskScore.toFixed(0)})
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {transaction.flags.slice(0, 2).map((flag, index) => (
                      <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {flag}
                      </span>
                    ))}
                    {transaction.flags.length > 2 && (
                      <span className="text-xs text-slate-500">+{transaction.flags.length - 2}</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm text-slate-600">
                  {transaction.timestamp.toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};