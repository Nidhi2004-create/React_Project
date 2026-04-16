import type { CapitalGains, Holding } from './types';

const capitalGainsData: CapitalGains = {
  stcg: { profits: 1200, losses: 450 },
  ltcg: { profits: 2400, losses: 900 }
};

const holdingsData: Holding[] = [
  {
    id: 'eth-1',
    symbol: 'ETH',
    coinName: 'Ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    totalHoldings: 12.54,
    averageBuyPrice: 2460,
    currentPrice: 2835,
    stcg: { gain: 500, balance: 7.12 },
    ltcg: { gain: -1100, balance: 5.42 }
  },
  {
    id: 'btc',
    symbol: 'BTC',
    coinName: 'Bitcoin',
    logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    totalHoldings: 0.78,
    averageBuyPrice: 35800,
    currentPrice: 41850,
    stcg: { gain: -800, balance: 0.31 },
    ltcg: { gain: 1500, balance: 0.47 }
  },
  {
    id: 'sol',
    symbol: 'SOL',
    coinName: 'Solana',
    logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    totalHoldings: 115.6,
    averageBuyPrice: 52.7,
    currentPrice: 72.4,
    stcg: { gain: 250, balance: 58.2 },
    ltcg: { gain: -650, balance: 57.4 }
  },
  {
    id: 'ada',
    symbol: 'ADA',
    coinName: 'Cardano',
    logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    totalHoldings: 1420,
    averageBuyPrice: 0.75,
    currentPrice: 0.92,
    stcg: { gain: -120, balance: 720 },
    ltcg: { gain: 420, balance: 700 }
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    coinName: 'Polygon',
    logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
    totalHoldings: 5400,
    averageBuyPrice: 0.86,
    currentPrice: 1.12,
    stcg: { gain: 320, balance: 2700 },
    ltcg: { gain: -210, balance: 2700 }
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    coinName: 'Binance Coin',
    logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png',
    totalHoldings: 18.25,
    averageBuyPrice: 312.5,
    currentPrice: 327.8,
    stcg: { gain: 680, balance: 9.120 },
    ltcg: { gain: -240, balance: 9.130 }
  },
  {
    id: 'dot',
    symbol: 'DOT',
    coinName: 'Polkadot',
    logo: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png',
    totalHoldings: 156.4,
    averageBuyPrice: 6.75,
    currentPrice: 7.98,
    stcg: { gain: -90, balance: 82.3 },
    ltcg: { gain: 210, balance: 74.1 }
  }
];

function delay<T>(value: T, ms = 400): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

export function fetchCapitalGains(): Promise<CapitalGains> {
  return delay(capitalGainsData);
}

export function fetchHoldings(): Promise<Holding[]> {
  return delay(holdingsData);
}
