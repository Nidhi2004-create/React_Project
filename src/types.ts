export interface CapitalGainBreakdown {
  profits: number;
  losses: number;
}

export interface CapitalGains {
  stcg: CapitalGainBreakdown;
  ltcg: CapitalGainBreakdown;
}

export interface HoldingGainDetail {
  gain: number;
  balance: number;
}

export interface Holding {
  id: string;
  symbol: string;
  coinName: string;
  logo: string;
  totalHoldings: number;
  averageBuyPrice: number;
  currentPrice: number;
  stcg: HoldingGainDetail;
  ltcg: HoldingGainDetail;
}
