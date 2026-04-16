import type { CapitalGains } from '../types';

interface StatCardProps {
  title: string;
  gains: CapitalGains;
  realized: number;
  variant: 'dark' | 'blue';
  savingsMessage?: string;
}

const formatAmount = (value: number) => `$ ${value.toLocaleString('en-US')}`;

export default function StatCard({ title, gains, realized, variant, savingsMessage }: StatCardProps) {
  const stcgNet = gains.stcg.profits - gains.stcg.losses;
  const ltcgNet = gains.ltcg.profits - gains.ltcg.losses;

  return (
    <section className={`stat-card ${variant}`}>
      <div className="stat-card__header">
        <h2>{title}</h2>
      </div>

      <div className="stat-card__grid">
        <div className="stat-card__grid-heading" />
        <div className="stat-card__grid-heading">Short-term</div>
        <div className="stat-card__grid-heading">Long-term</div>

        <div className="stat-card__row-label">Profits</div>
        <div>{formatAmount(gains.stcg.profits)}</div>
        <div>{formatAmount(gains.ltcg.profits)}</div>

        <div className="stat-card__row-label">Losses</div>
        <div>{formatAmount(gains.stcg.losses)}</div>
        <div>{formatAmount(gains.ltcg.losses)}</div>

        <div className="stat-card__row-label stat-card__row-label--strong">Net Capital Gains</div>
        <div className="stat-card__value stat-card__value--strong">{formatAmount(stcgNet)}</div>
        <div className="stat-card__value stat-card__value--strong">{formatAmount(ltcgNet)}</div>
      </div>

      <div className="stat-card__result">
        <span className="stat-card__result-label">
          {variant === 'blue' ? 'Effective Capital Gains:' : 'Realised Capital Gains:'}
        </span>
        <strong>{formatAmount(realized)}</strong>
      </div>

      {savingsMessage ? <div className="savings-text">🎉 {savingsMessage}</div> : null}
    </section>
  );
}
