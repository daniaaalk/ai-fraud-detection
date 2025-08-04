import { Transaction, Alert, BusinessEntity, MonitoringStats } from '../types';

export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const overseasCountries = ['MY', 'SG', 'ID', 'TH', 'PH', 'CN', 'HK', 'US', 'GB', 'CH', 'KY', 'PA', 'VG', 'BS', 'AE', 'JP'];
  const currencies = ['BND', 'USD', 'SGD', 'MYR', 'EUR', 'GBP', 'CNY'];
  
  for (let i = 0; i < 150; i++) {
    // More varied amounts for better demo
    const amount = Math.random() < 0.1 ? 
      Math.random() * 50000000 : // Some very large amounts
      Math.random() < 0.3 ? 
      9000 + Math.random() * 1500 : // Structuring amounts
      Math.random() * 5000000; // Normal range
      
    // All transactions originate from Brunei
    const fromCountry = 'BN';
    const toCountry = overseasCountries[Math.floor(Math.random() * overseasCountries.length)];
    const isOverseas = true; // All transactions are overseas since they go from BN to other countries
    
    const flags = [];
    let riskScore = Math.random() * 60; // Base risk
    
    // Increase risk for large amounts
    if (amount > 10000000) {
      riskScore += 35;
      flags.push('Extremely Large Amount');
    } else if (amount > 1000000) {
      riskScore += 20;
      flags.push('Large Amount');
    }
    
    // Increase risk for certain countries
    if (['KY', 'CH', 'PA', 'VG', 'BS'].includes(toCountry)) {
      riskScore += 30;
      flags.push('High-Risk Jurisdiction');
    }
    
    // Add structuring pattern
    if (amount > 9000 && amount < 10000) {
      riskScore += 45;
      flags.push('Potential Structuring');
    }
    
    // Round robin pattern
    if (i % 7 === 0 && amount > 50000) {
      riskScore += 25;
      flags.push('Round Robin Pattern');
    }
    
    // More sophisticated front business detection
    const isFrontBusiness = Math.random() < 0.18;
    if (isFrontBusiness) {
      riskScore += 40;
      flags.push('Brunei Front Business Indicator');
      if (Math.random() < 0.5) {
        flags.push('Brunei Shell Company Pattern');
      }
    }
    
    // Add more interesting flags for demo
    if (Math.random() < 0.1) {
      flags.push('PEP Connection');
      riskScore += 25;
    }
    
    if (Math.random() < 0.05) {
      flags.push('Sanctions List Match');
      riskScore += 50;
    }
    
    if (Math.random() < 0.08) {
      flags.push('Unusual Time Pattern');
      riskScore += 15;
    }
    
    riskScore = Math.min(100, riskScore);
    
    let riskLevel: Transaction['riskLevel'];
    if (riskScore < 25) riskLevel = 'low';
    else if (riskScore < 50) riskLevel = 'medium';
    else if (riskScore < 75) riskLevel = 'high';
    else riskLevel = 'critical';
    
    transactions.push({
      id: `txn_${i.toString().padStart(6, '0')}`,
      pseudoId: `PSI_${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      amount,
      currency: currencies[Math.floor(Math.random() * currencies.length)],
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
      fromAccount: `ACC_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      toAccount: `ACC_${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      fromCountry,
      toCountry,
      transactionType: ['wire_transfer', 'cash_deposit', 'crypto_exchange', 'trade_finance', 'remittance'][Math.floor(Math.random() * 5)] as Transaction['transactionType'],
      riskScore,
      riskLevel,
      flags,
      isOverseas,
      isFrontBusiness,
      status: riskScore > 70 ? 'flagged' : riskScore > 50 ? 'investigating' : 'approved'
    });
  }
  
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const generateMockAlerts = (): Alert[] => {
  const alerts: Alert[] = [];
  const alertTypes = ['aml', 'fraud', 'corruption', 'sanctions', 'structuring'] as const;
  const messages = [
    'Structuring pattern detected - multiple BN outbound transactions below BND 15,000 threshold',
    'High-volume wire transfers from Brunei to non-cooperative jurisdictions',
    'Brunei shell company indicators - minimal business activity vs transaction volume',
    'Potential trade-based money laundering from BN - over/under invoicing detected',
    'Round-robin transaction pattern across related Brunei business entities',
    'Rapid fund movement from Brunei through layered offshore accounts',
    'Brunei PEP-related transaction requiring enhanced due diligence',
    'Brunei cash-intensive business with inconsistent outbound deposit patterns'
  ];
  
  for (let i = 0; i < 25; i++) {
    const severity = Math.random() < 0.3 ? 'critical' : Math.random() < 0.5 ? 'high' : Math.random() < 0.7 ? 'medium' : 'low';
    
    alerts.push({
      id: `alert_${i.toString().padStart(4, '0')}`,
      transactionId: `txn_${Math.floor(Math.random() * 100).toString().padStart(6, '0')}`,
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      severity: severity as Alert['severity'],
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      status: Math.random() < 0.3 ? 'open' : Math.random() < 0.6 ? 'investigating' : 'resolved'
    });
  }
  
  return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const generateMockStats = (): MonitoringStats => ({
  totalTransactions: 2847,
  suspiciousTransactions: 156,
  activeAlerts: 23,
  overseasTransactions: 892,
  frontBusinessTransactions: 47,
  averageRiskScore: 32.4
});