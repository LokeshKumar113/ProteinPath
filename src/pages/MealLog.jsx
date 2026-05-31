import { Trash2 } from 'lucide-react'

export function MealLog({ log, totalProtein, totalSpent, profile, onRemove, onDiscover }) {
  const goal = profile.dailyProteinGoal
  const pct = Math.min(100, Math.round((totalProtein / goal) * 100))
  const avgEff =
    log.length > 0
      ? (log.reduce((s, e) => s + e.efficiency, 0) / log.length).toFixed(1)
      : null

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="greeting">Meal log</h1>
        <p className="subtext">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="log-summary-row">
        <div className="log-summary-card">
          <p className="mini-label">Protein eaten</p>
          <p className="mini-value">{totalProtein}g</p>
          <p className="mini-sub">{pct}% of {goal}g goal</p>
        </div>
        <div className="log-summary-card">
          <p className="mini-label">Total spent</p>
          <p className="mini-value">${totalSpent.toFixed(2)}</p>
          <p className="mini-sub">of ${profile.dailyBudget} budget</p>
        </div>
        {avgEff && (
          <div className="log-summary-card">
            <p className="mini-label">Avg efficiency</p>
            <p className="mini-value">{avgEff}g/$</p>
            <p className="mini-sub">protein per dollar</p>
          </div>
        )}
      </div>

      {log.length > 0 ? (
        <>
          <h2 className="section-title">Today's meals</h2>
          {log.map(entry => (
            <div key={entry.id} className="log-item">
              <div>
                <p className="log-name">{entry.mealName}</p>
                <p className="log-meta">
                  {entry.restaurantName} · ${entry.price.toFixed(2)} · {entry.time}
                </p>
              </div>
              <div className="log-right">
                <span className="protein-badge">+{entry.protein}g</span>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(entry.id)}
                  title="Remove meal"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="empty-state">
          <p>Nothing logged yet today.</p>
          <p>Head to the Discover tab to find a meal.</p>
        </div>
      )}

      <button className="cta-btn" onClick={onDiscover}>
        + Log another meal →
      </button>
    </div>
  )
}
