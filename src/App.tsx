import { useEffect, useMemo, useState } from 'react';
import { fetchCapitalGains, fetchHoldings } from './mockApi';
import type { CapitalGains, Holding } from './types';
import StatCard from './components/StatCard';
import HoldingsTable from './components/HoldingsTable';

const formatAmount = (value: number) => `$${value.toLocaleString('en-US')}`;

function calculateRealized(gains: CapitalGains) {
  return gains.stcg.profits - gains.stcg.losses + gains.ltcg.profits - gains.ltcg.losses;
}

function computeAfterGains(base: CapitalGains, selectedHoldings: Holding[]): CapitalGains {
  return selectedHoldings.reduce(
    (acc, holding) => {
      const stcgGain = holding.stcg.gain;
      const ltcgGain = holding.ltcg.gain;

      if (stcgGain >= 0) {
        acc.stcg.profits += stcgGain;
      } else {
        acc.stcg.losses += Math.abs(stcgGain);
      }

      if (ltcgGain >= 0) {
        acc.ltcg.profits += ltcgGain;
      } else {
        acc.ltcg.losses += Math.abs(ltcgGain);
      }

      return acc;
    },
    {
      stcg: { profits: base.stcg.profits, losses: base.stcg.losses },
      ltcg: { profits: base.ltcg.profits, losses: base.ltcg.losses }
    } as CapitalGains
  );
}

function App() {
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    Promise.all([fetchCapitalGains(), fetchHoldings()])
      .then(([gains, holdingsResponse]) => {
        setCapitalGains(gains);
        setHoldings(holdingsResponse);
      })
      .catch(() => setError('Unable to load data. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  const selectedHoldings = useMemo(
    () => holdings.filter((holding) => selectedIds.includes(holding.id)),
    [holdings, selectedIds]
  );

  const afterCapitalGains = useMemo(
    () => (capitalGains ? computeAfterGains(capitalGains, selectedHoldings) : null),
    [capitalGains, selectedHoldings]
  );

  const preRealized = useMemo(() => (capitalGains ? calculateRealized(capitalGains) : 0), [capitalGains]);
  const postRealized = useMemo(
    () => (afterCapitalGains ? calculateRealized(afterCapitalGains) : 0),
    [afterCapitalGains]
  );

  const savings = preRealized > postRealized ? preRealized - postRealized : 0;

  const toggleRow = (id: string) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === holdings.length ? [] : holdings.map((holding) => holding.id)
    );
  };

  const toggleViewAll = () => setShowAll((current) => !current);
  const toggleNotes = () => setNotesOpen((current) => !current);

  if (loading) {
    return (
      <div className="app-shell">
        <div className="loader">Loading tax harvesting data…</div>
      </div>
    );
  }

  if (error || !capitalGains) {
    return (
      <div className="app-shell">
        <div className="error-box">{error ?? 'Failed to load the app.'}</div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-logo">
          <span className="brand-koin">Koin</span>
          <span className="brand-x">X</span>
          <span className="brand-registered">®</span>
        </div>
      </header>

      <div className="page-header">
        <h1>Tax Harvesting</h1>
        <div className="how-it-works-wrapper">
          <a href="#" className="text-link page-link">
            How it works?
          </a>
          <div className="how-it-works-tooltip">
            <p>
              Lorem ipsum dolor sit amet consectetur. Euismod id posuere nibh semper mattis scelerisque tellus. Vel mattis diam duis morbi tellus dui consectetur.
            </p>
            <a href="#" className="tooltip-link">Know More</a>
          </div>
        </div>
      </div>

      <section className="notice-card">
        <div className="notice-head" onClick={toggleNotes}>
          <div className="notice-icon">i</div>
          <div>
            <div className="notice-title">Important Notes & Disclaimers</div>
          </div>
          <div className={`notice-arrow ${notesOpen ? 'open' : ''}`}>&#9656;</div>
        </div>

        {notesOpen ? (
          <ul className="notice-list">
            <li>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</li>
            <li>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</li>
            <li>Price and market value data is fetched from CoinGecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</li>
            <li>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</li>
            <li>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</li>
          </ul>
        ) : null}
      </section>

      <div className="summary-grid">
        <StatCard
          title="Pre Harvesting"
          gains={capitalGains}
          realized={preRealized}
          variant="dark"
        />
        <StatCard
          title="After Harvesting"
          gains={afterCapitalGains!}
          realized={postRealized}
          variant="blue"
          savingsMessage={savings > 0 ? `You are going to save $${savings.toLocaleString('en-US')}` : undefined}
        />
      </div>

      <HoldingsTable
        holdings={holdings}
        selectedIds={selectedIds}
        onToggleRow={toggleRow}
        onToggleAll={toggleSelectAll}
        showAll={showAll}
        onToggleViewAll={toggleViewAll}
      />
    </div>
  );
}

export default App;
