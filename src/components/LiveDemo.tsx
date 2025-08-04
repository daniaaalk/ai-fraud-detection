import React, { useState, useEffect } from 'react';
import { Transaction, Alert } from '../types';
import { Brain, Zap, AlertTriangle, TrendingUp, Eye, Play, Pause } from 'lucide-react';

interface LiveDemoProps {
  transactions: Transaction[];
  alerts: Alert[];
}

export const LiveDemo: React.FC<LiveDemoProps> = ({ transactions, alerts }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [detectionLog, setDetectionLog] = useState<string[]>([]);
  const [threatLevel, setThreatLevel] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const randomTransaction = transactions[Math.floor(Math.random() * transactions.length)];
      setCurrentTransaction(randomTransaction);
      
      // Simulate AI analysis
      const analysisSteps = [
        `🔍 Analyzing transaction ${randomTransaction.pseudoId}...`,
        `💰 Amount: ${randomTransaction.amount.toLocaleString()} ${randomTransaction.currency}`,
        `🌍 Route: ${randomTransaction.fromCountry} → ${randomTransaction.toCountry}`,
        `🤖 AI Risk Score: ${randomTransaction.riskScore.toFixed(1)}/100`,
        `⚡ Pattern matching complete`,
      ];

      if (randomTransaction.riskScore > 70) {
        analysisSteps.push(`🚨 HIGH RISK DETECTED - Flagging for investigation`);
        setThreatLevel(prev => Math.min(100, prev + 10));
      } else if (randomTransaction.riskScore > 50) {
        analysisSteps.push(`⚠️ Medium risk - Adding to watch list`);
        setThreatLevel(prev => Math.min(100, prev + 5));
      } else {
        analysisSteps.push(`✅ Transaction cleared`);
        setThreatLevel(prev => Math.max(0, prev - 2));
      }

      setDetectionLog(prev => [...analysisSteps, ...prev].slice(0, 20));
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning, transactions]);

  const highRiskTransactions = transactions.filter(t => t.riskScore > 70);
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Demo Controls */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="h-8 w-8 animate-pulse" />
            <div>
              <h2 className="text-2xl font-bold">Live AI Detection Engine</h2>
              <p className="text-purple-100">Real-time financial crime detection in action</p>
            </div>
          </div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
              isRunning 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span>{isRunning ? 'Pause Demo' : 'Start Demo'}</span>
          </button>
        </div>

        {/* Threat Level Meter */}
        <div className="bg-white/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">System Threat Level</span>
            <span className="font-bold">{threatLevel.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                threatLevel > 70 ? 'bg-red-400' : 
                threatLevel > 40 ? 'bg-yellow-400' : 'bg-green-400'
              }`}
              style={{ width: `${threatLevel}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Analysis */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-blue-600" />
              Live Transaction Analysis
            </h3>
          </div>
          
          {currentTransaction && (
            <div className="p-6">
              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Transaction ID:</span>
                    <div className="font-mono font-medium">{currentTransaction.pseudoId}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Amount:</span>
                    <div className="font-bold text-lg">{currentTransaction.amount.toLocaleString()} {currentTransaction.currency}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Route:</span>
                    <div className="font-medium">{currentTransaction.fromCountry} → {currentTransaction.toCountry}</div>
                  </div>
                  <div>
                    <span className="text-slate-600">Risk Score:</span>
                    <div className={`font-bold text-lg ${
                      currentTransaction.riskScore > 70 ? 'text-red-600' :
                      currentTransaction.riskScore > 50 ? 'text-orange-600' :
                      currentTransaction.riskScore > 30 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {currentTransaction.riskScore.toFixed(1)}/100
                    </div>
                  </div>
                </div>
              </div>

              {currentTransaction.flags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900">AI-Detected Risk Factors:</h4>
                  {currentTransaction.flags.map((flag, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span className="text-slate-700">{flag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Detection Log */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-b">
            <h3 className="font-semibold text-slate-900 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-green-600" />
              AI Detection Log
            </h3>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-2 font-mono text-sm">
              {detectionLog.map((log, index) => (
                <div 
                  key={index} 
                  className={`p-2 rounded transition-all duration-500 ${
                    index === 0 ? 'bg-blue-50 border border-blue-200' : 'bg-slate-50'
                  }`}
                  style={{ 
                    opacity: Math.max(0.3, 1 - (index * 0.05)),
                    transform: `translateY(${index * 2}px)`
                  }}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats for Demo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">High-Risk Transactions</p>
              <p className="text-3xl font-bold">{highRiskTransactions.length}</p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-200" />
          </div>
          <div className="mt-4 text-sm text-red-100">
            Requiring immediate investigation
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100">Active Alerts</p>
              <p className="text-3xl font-bold">{recentAlerts.length}</p>
            </div>
            <Eye className="h-12 w-12 text-amber-200" />
          </div>
          <div className="mt-4 text-sm text-amber-100">
            Under investigation
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Detection Accuracy</p>
              <p className="text-3xl font-bold">94.7%</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-200" />
          </div>
          <div className="mt-4 text-sm text-green-100">
            AI model performance
          </div>
        </div>
      </div>
    </div>
  );
};