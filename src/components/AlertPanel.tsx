import React, { useState } from 'react';
import { Alert } from '../types';
import { AlertTriangle, Clock, CheckCircle, XCircle, User } from 'lucide-react';

interface AlertPanelProps {
  alerts: Alert[];
  showFilters?: boolean;
}

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, showFilters = false }) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'investigating': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'false_positive': return <XCircle className="h-4 w-4 text-slate-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2 animate-pulse" />
            Suspicious Transaction Reports (STR)
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-sm font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
              {filteredAlerts.filter(a => a.status === 'open').length} Urgent
            </span>
          </div>
        </div>
        
        {showFilters && (
          <div className="flex gap-4">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="false_positive">False Positive</option>
            </select>
          </div>
        )}
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(alert.status)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide">{alert.type}</span>
                  </div>
                  <p className="text-sm text-slate-900 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-slate-500">
                    <span>Alert ID: {alert.id}</span>
                    <span>Transaction: {alert.transactionId}</span>
                    <span>{alert.timestamp.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {alert.assignedTo && (
                  <div className="flex items-center space-x-1 text-xs text-slate-600">
                    <User className="h-3 w-3" />
                    <span>{alert.assignedTo}</span>
                  </div>
                )}
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Investigate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};