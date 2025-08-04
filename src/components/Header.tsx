import React from 'react';
import { Shield, AlertTriangle, Eye, Building2, Zap, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 border-b border-slate-700 px-6 py-4 shadow-xl relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-yellow-400 animate-pulse" />
              <Shield className="h-8 w-8 text-blue-400 drop-shadow-lg" />
              <Zap className="h-6 w-6 text-green-400 animate-bounce" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-md">AMBD Financial Intelligence Unit</h1>
              <p className="text-sm text-slate-300">AI-Powered Anti-Money Laundering & Counter-Terrorism Financing</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-green-400 bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">AI Engine Active</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
              <span className="text-sm font-medium">Live SWIFT Feed</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <Eye className="h-4 w-4" />
              <span>Live Surveillance</span>
            </button>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <AlertTriangle className="h-4 w-4" />
              <span>STR Queue</span>
            </button>
            <div className="text-xs text-slate-300 border-l border-slate-600 pl-4 bg-slate-800/50 px-3 py-2 rounded">
              <div>Authorized Personnel Only</div>
              <div className="text-slate-400">Classification: RESTRICTED</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};