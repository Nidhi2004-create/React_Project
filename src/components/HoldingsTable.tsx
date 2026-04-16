import type { Holding } from '../types';

interface HoldingsTableProps {
  holdings: Holding[];
  selectedIds: string[];
  onToggleRow: (id: string) => void;
  onToggleAll: () => void;
  showAll: boolean;
  onToggleViewAll: () => void;
}

const formatAmount = (value: number) => `$ ${value.toLocaleString('en-US')}`;
const formatGain = (value: number) => `${value >= 0 ? '+ ' : '- '}${formatAmount(Math.abs(value))}`;

export default function HoldingsTable({ holdings, selectedIds, onToggleRow, onToggleAll, showAll, onToggleViewAll }: HoldingsTableProps) {
  const visibleHoldings = showAll ? holdings : holdings.slice(0, 6);
  const allSelected = holdings.length > 0 && holdings.every((holding) => selectedIds.includes(holding.id));

  return (
    <section className="table-card table-card--dark">
      <div className="table-card__header">
        <div className="table-header-title">
          <h3>Holdings</h3>
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>
                <label className="checkbox-cell">
                  <input type="checkbox" checked={allSelected} onChange={onToggleAll} />
                </label>
              </th>
              <th>Asset</th>
              <th>Holdings</th>
              <th>Total Current Value</th>
              <th>Short-term</th>
              <th>Long-term</th>
              <th>Amount to Sell</th>
            </tr>
          </thead>
          <tbody>
            {visibleHoldings.map((holding) => {
              const selected = selectedIds.includes(holding.id);
              return (
                <tr key={holding.id} className={selected ? 'selected-row' : ''}>
                  <td>
                    <label className="checkbox-cell">
                      <input type="checkbox" checked={selected} onChange={() => onToggleRow(holding.id)} />
                    </label>
                  </td>
                  <td>
                    <div className="asset-cell">
                      <img src={holding.logo} alt={`${holding.coinName} logo`} />
                      <div>
                        <strong>{holding.coinName}</strong>
                        <small>{holding.symbol}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>{holding.totalHoldings.toFixed(4)} {holding.symbol}</div>
                    <small>{formatAmount(holding.currentPrice)}/{holding.symbol}</small>
                  </td>
                  <td>
                    <div>{formatAmount(holding.totalHoldings * holding.currentPrice)}</div>
                  </td>
                  <td className={holding.stcg.gain >= 0 ? 'positive' : 'negative'}>
                    <div>{formatGain(holding.stcg.gain)}</div>
                    <small>{holding.stcg.balance.toFixed(4)} {holding.symbol}</small>
                  </td>
                  <td className={holding.ltcg.gain >= 0 ? 'positive' : 'negative'}>
                    <div>{formatGain(holding.ltcg.gain)}</div>
                    <small>{holding.ltcg.balance.toFixed(4)} {holding.symbol}</small>
                  </td>
                  <td>{selected ? `${holding.totalHoldings.toFixed(4)} ${holding.symbol}` : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="table-card__footer">
        <button type="button" className="link-button" onClick={onToggleViewAll}>
          {showAll ? 'Show less' : 'View all'}
        </button>
      </div>
    </section>
  );
}
