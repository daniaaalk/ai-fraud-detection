export interface Transaction {
  id: string;
  pseudoId: string;
  amount: number;
  currency: string;
  timestamp: Date;
  fromAccount: string;
  toAccount: string;
  fromCountry: string;
  toCountry: string;
  transactionType: 'wire_transfer' | 'cash_deposit' | 'crypto_exchange' | 'trade_finance' | 'remittance';
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  flags: string[];
  isOverseas: boolean;
  isFrontBusiness: boolean;
  status: 'pending' | 'approved' | 'flagged' | 'investigating';
}

export interface Alert {
  id: string;
  transactionId: string;
  type: 'aml' | 'fraud' | 'corruption' | 'sanctions' | 'structuring';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  status: 'open' | 'investigating' | 'resolved' | 'false_positive';
  assignedTo?: string;
}

export interface BusinessEntity {
  id: string;
  pseudoId: string;
  name: string;
  country: string;
  registrationDate: Date;
  businessType: string;
  riskProfile: 'low' | 'medium' | 'high';
  isFrontBusiness: boolean;
  suspiciousActivityCount: number;
  totalTransactionVolume: number;
}

export interface MonitoringStats {
  totalTransactions: number;
  suspiciousTransactions: number;
  activeAlerts: number;
  overseasTransactions: number;
  frontBusinessTransactions: number;
  averageRiskScore: number;
}