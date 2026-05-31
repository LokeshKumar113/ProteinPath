import { Zap, DollarSign, Target, TrendingUp } from 'lucide-react'

export function Dashboard({ log, totalProtein, totalSpent, profile, onFindMeal }) {
  const goal = profile.dailyProteinGoal
  const budget = profile.dailyBudget
  const remaining = Math.max(0, goal - totalProtein)
  const budgetLeft = Math.max(0, budget - totalSpent)
  const pct = Math.min(100, Math.round((totalProtein / goal) * 100))

  const avgEfficiency =
    log.length > 0
      ? (log.reduce((s, e) => s + e.efficiency, 0) / log.length).toFixed(1)
      : '—'

  const bestMeal =
    log.length > 0
      ? log.reduce((best, e) => (e.efficiency > best.efficiency ? e : best), log[0])
      : null

  const circumference = 2 * Math.PI * 54
  const strokeDash = circumference
  const strokeOffset = circumference - (pct / 100) * circumference

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <div>
          <h1 className="greeting">{greeting()}, {profile.name} 👋</h1>
          <p className="subtext">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            {log.length > 0 && ` · ${log.length} meal${log.length > 1 ? 's' : ''} logged`}
          </p>
        </div>
      </div>

      {/* Progress ring card */}
      <div className="card ring-card">
        <div className="ring-wrap">
          <svg viewBox="0 0 120 120" width="120" height="120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="var(--border)" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke={pct >= 100 ? '#0F6E56' : '#1D9E75'}
              strokeWidth="12"
              strokeDasharray={strokeDash}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div className="ring-center">
            <span className="ring-value">{totalProtein}g</span>
            <span className="ring-label">of {goal}g</span>
            <span className="ring-pct">{pct}%</span>
          </div>
        </div>
        <div className="ring-stats">
          <StatRow icon={<Target size={14} />} label="Remaining" value={`${remaining}g`} color={remaining === 0 ? 'green' : 'default'} />
          <StatRow icon={<DollarSign size={14} />} label="Budget left" value={`$${budgetLeft.toFixed(2)}`} color={budgetLeft < 5 ? 'red' : 'default'} />
          <StatRow icon={<TrendingUp size={14} />} label="Meals logged" value={`${log.length}`} />
          <StatRow icon={<Zap size={14} />} label="Avg efficiency" value={avgEfficiency !== '—' ? `${avgEfficiency}g/$` : '—'} />
        </div>
      </div>

      {/* Mini stat cards */}
      <div className="mini-grid">
        <MiniCard
          label="Goal progress"
          value={`${pct}%`}
          sub={pct >= 100 ? '🎉 Goal hit!' : `${remaining}g to go`}
          accent={pct >= 100 ? 'green' : null}
        />
        <MiniCard
          label="Best meal today"
          value={bestMeal ? `${bestMeal.efficiency}g/$` : '—'}
          sub={bestMeal ? bestMeal.mealName : 'No meals yet'}
        />
      </div>

      {/* Today's log */}
      {log.length > 0 ? (
        <>
          <h2 className="section-title">Today's meals</h2>
          {log.map(entry => (
            <div key={entry.id} className="log-item">
              <div>
                <p className="log-name">{entry.mealName}</p>
                <p className="log-meta">{entry.restaurantName} · ${entry.price.toFixed(2)}</p>
              </div>
              <div className="log-right">
                <span className="protein-badge">+{entry.protein}g</span>
                <span className="log-time">{entry.time}</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="empty-state">
          <p>No meals logged yet today.</p>
          <p>Find a nearby restaurant to get started.</p>
        </div>
      )}

      <button className="cta-btn" onClick={onFindMeal}>
        {remaining > 0 ? `Find ${remaining}g more protein →` : '✓ Goal reached! Browse restaurants →'}
      </button>
    </div>
  )
}

function StatRow({ icon, label, value, color }) {
  return (
    <div className="stat-row">
      <span className="stat-label">{icon}{label}</span>
      <span className={`stat-val ${color || ''}`}>{value}</span>
    </div>
  )
}

function MiniCard({ label, value, sub, accent }) {
  return (
    <div className={`mini-card ${accent || ''}`}>
      <p className="mini-label">{label}</p>
      <p className="mini-value">{value}</p>
      <p className="mini-sub">{sub}</p>
    </div>
  )
}
