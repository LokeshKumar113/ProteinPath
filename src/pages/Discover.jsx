import { useState, useMemo } from 'react'
import { MapPin, Star, Plus, Check, ExternalLink } from 'lucide-react'
import { RESTAURANTS_WITH_EFFICIENCY } from '../data/restaurants'

const CITIES = ['All', 'San Francisco', 'Oakland', 'Berkeley', 'San Jose', 'San Bruno', 'San Mateo', 'Menlo Park', 'Redwood City', 'Fremont', 'Belmont', 'Hayward', 'Mill Valley', 'San Rafael', 'Multiple']

export function Discover({ totalProtein, totalSpent, profile, onLog }) {
  const [addedMeals, setAddedMeals] = useState({})
  const [filter, setFilter] = useState('efficiency')
  const [cityFilter, setCityFilter] = useState('All')
  const [search, setSearch] = useState('')

  const remaining = Math.max(0, profile.dailyProteinGoal - totalProtein)
  const budgetLeft = Math.max(0, profile.dailyBudget - totalSpent)

  const ranked = useMemo(() => {
    let list = [...RESTAURANTS_WITH_EFFICIENCY]

    if (cityFilter !== 'All') {
      list = list.filter(r => r.city === cityFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        r =>
          r.name.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q) ||
          r.meals.some(m => m.name.toLowerCase().includes(q))
      )
    }

    return list
      .map(r => ({
        ...r,
        bestEfficiency: Math.max(...r.meals.map(m => m.efficiency)),
        affordableMeals: r.meals.filter(m => m.price <= budgetLeft),
      }))
      .sort((a, b) =>
        filter === 'efficiency'
          ? b.bestEfficiency - a.bestEfficiency
          : a.name.localeCompare(b.name)
      )
  }, [filter, cityFilter, search, budgetLeft])

  const handleLog = (meal, restaurant) => {
    onLog(meal, restaurant.name)
    setAddedMeals(prev => ({ ...prev, [meal.id]: true }))
    setTimeout(() => setAddedMeals(prev => ({ ...prev, [meal.id]: false })), 2000)
  }

  const efficiencyBadge = (idx) => {
    if (idx === 0) return { label: '#1 efficiency', cls: 'badge-green' }
    if (idx === 1) return { label: 'Top pick', cls: 'badge-teal' }
    if (idx === 2) return { label: 'Great value', cls: 'badge-amber' }
    return null
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <div>
          <h1 className="greeting">Bay Area restaurants</h1>
          <p className="subtext">
            {remaining > 0 ? `${remaining}g to go` : '✓ Goal reached'} · ${budgetLeft.toFixed(2)} left · {ranked.length} restaurants
          </p>
        </div>
      </div>

      <input
        className="form-input"
        placeholder="Search restaurants or meals…"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <div className="filter-row" style={{ overflowX: 'auto', flexWrap: 'nowrap', paddingBottom: 4 }}>
        {CITIES.map(city => (
          <button
            key={city}
            className={`filter-btn ${cityFilter === city ? 'active' : ''}`}
            onClick={() => setCityFilter(city)}
            style={{ whiteSpace: 'nowrap' }}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="filter-row" style={{ marginTop: 8 }}>
        <button
          className={`filter-btn ${filter === 'efficiency' ? 'active' : ''}`}
          onClick={() => setFilter('efficiency')}
        >
          Best value (g/$)
        </button>
        <button
          className={`filter-btn ${filter === 'alpha' ? 'active' : ''}`}
          onClick={() => setFilter('alpha')}
        >
          A–Z
        </button>
      </div>

      {ranked.length === 0 && (
        <div className="empty-state">No restaurants match your search.</div>
      )}

      {ranked.map((restaurant, idx) => {
        const badge = efficiencyBadge(idx)
        return (
          <div key={restaurant.id} className="rest-card">
            <div className="rest-header">
              <div>
                <div className="rest-name-row">
                  <h2 className="rest-name">{restaurant.name}</h2>
                  {badge && <span className={`badge ${badge.cls}`}>{badge.label}</span>}
                </div>
                <div className="rest-meta-row">
                  <MapPin size={12} />
                  <span>{restaurant.type} · {restaurant.city}{restaurant.area !== restaurant.city ? `, ${restaurant.area}` : ''} · {restaurant.owned}</span>
                  <Star size={12} style={{ marginLeft: 8 }} />
                  <span>{restaurant.rating}</span>
                  {restaurant.yelp && (
                    <a href={restaurant.yelp} target="_blank" rel="noreferrer" style={{ marginLeft: 8, color: 'var(--text-3)', display: 'flex', alignItems: 'center' }}>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {restaurant.meals.map(meal => {
              const affordable = meal.price <= budgetLeft
              const added = addedMeals[meal.id]
              return (
                <div key={meal.id} className={`meal-row ${!affordable ? 'unaffordable' : ''}`}>
                  <div className="meal-info">
                    <span className="meal-name">{meal.name}</span>
                    {!affordable && <span className="over-budget">over budget</span>}
                  </div>
                  <div className="meal-meta">
                    <span className="meal-protein">{meal.protein}g</span>
                    <span className="meal-price">${meal.price.toFixed(2)}</span>
                    <span className="meal-eff">{meal.efficiency}g/$</span>
                    <button
                      className={`log-btn ${added ? 'logged' : ''}`}
                      onClick={() => affordable && handleLog(meal, restaurant)}
                      disabled={!affordable}
                      title={!affordable ? 'Over your remaining budget' : 'Log this meal'}
                    >
                      {added ? <Check size={13} /> : <Plus size={13} />}
                      {added ? 'Added!' : 'Log'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
