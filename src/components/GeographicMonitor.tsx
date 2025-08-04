import React from 'react';
import { Transaction } from '../types';
import { MapPin, ArrowRight, AlertCircle } from 'lucide-react';

interface GeographicMonitorProps {
  transactions: Transaction[];
}

export const GeographicMonitor: React.FC<GeographicMonitorProps> = ({ transactions }) => {
  const countryAnalysis = transactions.reduce((acc, transaction) => {
    const key = `${transaction.fromCountry}-${transaction.toCountry}`;
    if (!acc[key]) {
      acc[key] = {
        route: key,
        fromCountry: transaction.fromCountry,
        toCountry: transaction.toCountry,
        count: 0,
        totalAmount: 0,
        averageRisk: 0,
        highRiskCount: 0
      };
    }
    
    acc[key].count++;
    acc[key].totalAmount += transaction.amount;
    acc[key].averageRisk = (acc[key].averageRisk * (acc[key].count - 1) + transaction.riskScore) / acc[key].count;
    if (transaction.riskScore > 70) acc[key].highRiskCount++;
    
    return acc;
  }, {} as Record<string, any>);

  const sortedRoutes = Object.values(countryAnalysis)
    .sort((a: any, b: any) => b.averageRisk - a.averageRisk)
    .slice(0, 15);

  const highRiskJurisdictions = ['KY', 'CH', 'LI', 'PA', 'BZ', 'VG', 'BS', 'AD'];
  
  const jurisdictionRisk = transactions.reduce((acc, t) => {
    [t.fromCountry, t.toCountry].forEach(country => {
      if (!acc[country]) {
        acc[country] = {
          country,
          transactionCount: 0,
          totalAmount: 0,
          averageRisk: 0,
          isHighRisk: highRiskJurisdictions.includes(country)
        };
      }
      acc[country].transactionCount++;
      acc[country].totalAmount += t.amount;
      acc[country].averageRisk = (acc[country].averageRisk * (acc[country].transactionCount - 1) + t.riskScore) / acc[country].transactionCount;
    });
    return acc;
  }, {} as Record<string, any>);

  const sortedJurisdictions = Object.values(jurisdictionRisk)
    .sort((a: any, b: any) => b.averageRisk - a.averageRisk)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* High-Risk Transaction Routes */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <MapPin className="h-5 w-5 text-blue-500 mr-2" />
          Brunei Outbound Transaction Corridors & Risk Assessment
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Route</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Transactions</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Total Amount</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Avg Risk</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">High Risk</th>
              </tr>
            </thead>
            <tbody>
              {sortedRoutes.map((route: any, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">{route.fromCountry}</span>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                      <span className="font-mono text-sm">{route.toCountry}</span>
                      {highRiskJurisdictions.includes(route.toCountry) && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium">{route.count}</td>
                  <td className="py-3 px-4">${route.totalAmount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        route.averageRisk > 70 ? 'bg-red-100 text-red-800' :
                        route.averageRisk > 50 ? 'bg-orange-100 text-orange-800' :
                        route.averageRisk > 30 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {route.averageRisk.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">{route.highRiskCount}</span>
                    <span className="text-slate-400 text-sm ml-1">
                      ({((route.highRiskCount / route.count) * 100).toFixed(0)}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jurisdiction Risk Assessment */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <MapPin className="h-5 w-5 text-purple-500 mr-2" />
          Jurisdiction Risk Assessment
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedJurisdictions.map((jurisdiction: any, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              jurisdiction.isHighRisk ? 'border-red-200 bg-red-50' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-lg font-bold">{jurisdiction.country}</span>
                  {jurisdiction.isHighRisk && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  jurisdiction.averageRisk > 70 ? 'bg-red-100 text-red-800' :
                  jurisdiction.averageRisk > 50 ? 'bg-orange-100 text-orange-800' :
                  jurisdiction.averageRisk > 30 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  Risk: {jurisdiction.averageRisk.toFixed(1)}
                </span>
              </div>
              
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Transactions:</span>
                  <span className="font-medium">{jurisdiction.transactionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Volume:</span>
                  <span className="font-medium">${jurisdiction.totalAmount.toLocaleString()}</span>
                </div>
                {jurisdiction.isHighRisk && (
                  <div className="text-red-600 text-xs font-medium mt-2">
                    ⚠️ High-Risk Jurisdiction
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};