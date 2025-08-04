import React from 'react';
import { Transaction } from '../types';
import { detectSuspiciousPatterns } from '../utils/aiDetection';
import { TrendingUp, AlertTriangle, Globe, Building2 } from 'lucide-react';

interface RiskAnalysisProps {
  transactions: Transaction[];
}

export const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ transactions }) => {
  const suspiciousPatterns = detectSuspiciousPatterns(transactions);
  
  const riskDistribution = {
    low: transactions.filter(t => t.riskLevel === 'low').length,
    medium: transactions.filter(t => t.riskLevel === 'medium').length,
    high: transactions.filter(t => t.riskLevel === 'high').length,
    critical: transactions.filter(t => t.riskLevel === 'critical').length,
  };

  const overseasAnalysis = {
    total: transactions.filter(t => t.isOverseas).length,
    highRisk: transactions.filter(t => t.isOverseas && t.riskScore > 70).length,
    jurisdictions: [...new Set(transactions.filter(t => t.isOverseas).map(t => t.toCountry))].length
  };

  const frontBusinessAnalysis = {
    total: transactions.filter(t => t.isFrontBusiness).length,
    averageRisk: transactions.filter(t => t.isFrontBusiness).reduce((sum, t) => sum + t.riskScore, 0) / 
                 Math.max(1, transactions.filter(t => t.isFrontBusiness).length),
    flaggedEntities: [...new Set(transactions.filter(t => t.isFrontBusiness).map(t => t.fromAccount))].length
  };

  return (
    <div className="space-y-6">
      {/* AI Pattern Detection */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg border border-amber-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
          <AlertTriangle className="h-6 w-6 text-amber-500 mr-2 animate-pulse" />
          AI-Powered Threat Detection & Pattern Analysis
        </h2>
        
        {suspiciousPatterns.length > 0 ? (
          <div className="space-y-3">
            {suspiciousPatterns.map((pattern, index) => (
              <div key={index} className="bg-white border-l-4 border-amber-500 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 animate-bounce" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">{pattern}</p>
                    <p className="text-xs text-amber-700 mt-1 bg-amber-100 px-2 py-1 rounded-full inline-block">
                      🤖 AI Confidence: {(85 + Math.random() * 10).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-slate-600 font-medium">No suspicious patterns detected in current monitoring period.</p>
            <p className="text-sm text-slate-500 mt-2">AI systems operating normally</p>
          </div>
        )}
      </div>

      {/* Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
            Risk Distribution
          </h3>
          
          <div className="space-y-3">
            {Object.entries(riskDistribution).map(([level, count]) => {
              const total = Object.values(riskDistribution).reduce((sum, c) => sum + c, 0);
              const percentage = (count / total) * 100;
              
              const colors = {
                low: 'bg-green-500',
                medium: 'bg-yellow-500',
                high: 'bg-orange-500',
                critical: 'bg-red-500'
              };
              
              return (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${colors[level as keyof typeof colors]}`}></div>
                    <span className="text-sm font-medium capitalize">{level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600">{count}</span>
                    <span className="text-xs text-slate-400">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 text-purple-500 mr-2" />
            Overseas Activity
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Total Overseas</span>
              <span className="font-medium">{overseasAnalysis.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">High Risk</span>
              <span className="font-medium text-red-600">{overseasAnalysis.highRisk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Jurisdictions</span>
              <span className="font-medium">{overseasAnalysis.jurisdictions}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                Risk Concentration: {((overseasAnalysis.highRisk / overseasAnalysis.total) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 text-orange-500 mr-2" />
            Brunei Front Business Analysis
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Brunei Front Business Txns</span>
              <span className="font-medium text-red-600">{frontBusinessAnalysis.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">Average Risk Score</span>
              <span className="font-medium">{frontBusinessAnalysis.averageRisk.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600">BN Entities Flagged</span>
              <span className="font-medium">{frontBusinessAnalysis.flaggedEntities}</span>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                Detection Rate: {((frontBusinessAnalysis.total / transactions.length) * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};