import { Transaction } from '../types';

export const detectSuspiciousPatterns = (transactions: Transaction[]): string[] => {
  const patterns: string[] = [];
  
  // Structuring detection
  const smallAmounts = transactions.filter(t => t.amount > 9000 && t.amount < 10000);
  if (smallAmounts.length > 3) {
    patterns.push('Potential structuring detected - multiple transactions just below reporting threshold');
  }
  
  // Rapid movement detection
  const recentTransactions = transactions.filter(t => 
    new Date().getTime() - t.timestamp.getTime() < 24 * 60 * 60 * 1000
  );
  if (recentTransactions.length > 10) {
    patterns.push('Rapid transaction movement detected in last 24 hours');
  }
  
  // Round robin detection
  const accounts = new Map<string, number>();
  transactions.forEach(t => {
    accounts.set(t.fromAccount, (accounts.get(t.fromAccount) || 0) + 1);
  });
  
  const roundRobinAccounts = Array.from(accounts.entries()).filter(([_, count]) => count > 5);
  if (roundRobinAccounts.length > 0) {
    patterns.push('Round robin transaction pattern detected');
  }
  
  // Offshore jurisdiction detection
  const highRiskCountries = ['KY', 'CH', 'LI', 'PA', 'BZ'];
  const offshoreTransactions = transactions.filter(t => 
    highRiskCountries.includes(t.toCountry)
  );
  if (offshoreTransactions.length > transactions.length * 0.3) {
    patterns.push('High volume of transactions to offshore jurisdictions');
  }
  
  return patterns;
};

export const calculateRiskScore = (transaction: Transaction): number => {
  let score = 0;
  
  // Amount-based risk
  if (transaction.amount > 5000000) score += 30;
  else if (transaction.amount > 1000000) score += 20;
  else if (transaction.amount > 100000) score += 10;
  
  // Overseas risk
  if (transaction.isOverseas) score += 15;
  
  // Front business risk
  if (transaction.isFrontBusiness) score += 35;
  
  // Country risk
  const highRiskCountries = ['KY', 'CH', 'LI', 'PA', 'BZ', 'VG'];
  if (highRiskCountries.includes(transaction.toCountry)) score += 25;
  
  // Transaction type risk
  if (transaction.transactionType === 'crypto_exchange') score += 20;
  if (transaction.transactionType === 'cash_deposit' && transaction.amount > 50000) score += 25;
  
  // Structuring detection
  if (transaction.amount > 9000 && transaction.amount < 10000) score += 40;
  
  return Math.min(100, score);
};

export const identifyFrontBusinessIndicators = (entity: any): string[] => {
  const indicators: string[] = [];
  
  // Minimal business activity but high transaction volume
  if (entity.totalTransactionVolume > entity.reportedRevenue * 2) {
    indicators.push('Transaction volume exceeds reported business activity');
  }
  
  // Recent incorporation with immediate high-value transactions
  const daysSinceIncorporation = (new Date().getTime() - entity.registrationDate.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceIncorporation < 90 && entity.totalTransactionVolume > 1000000) {
    indicators.push('High transaction volume for recently incorporated entity');
  }
  
  // Complex ownership structure
  if (entity.ownershipLayers > 3) {
    indicators.push('Complex multi-layered ownership structure');
  }
  
  return indicators;
};