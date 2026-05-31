import { useState } from 'react'
import { DEFAULT_PROFILE } from '../data/restaurants'

const DIET_OPTIONS = [
  'No restrictions',
  'Vegetarian',
  'Vegan',
  'Gluten-free',
  'Dairy-free',
  'Keto',
  'Halal',
]

export function Profile({ profile, onSave, log }) {
  const [editing, setEditing] = useState(!profile)
  const [form, setForm] = useState(profile || DEFAULT_PROFILE)

  const initials = form.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const weekProtein = log.reduce((s, e) => s + e.protein, 0)
  const weekSpent = log.reduce((s, e) => s + e.price, 0)

  const handleSave = () => {
    if (!form.name.trim()) return
    onSave(form)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="screen">
        <div className="screen-header">
          <h1 className="greeting">Your profile</h1>
          <p className="subtext">Set your goals and preferences</p>
        </div>

        <div className="card profile-form">
          <label className="form-label">Your name</label>
          <input
            className="form-input"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Alex"
          />

          <label className="form-label">Daily protein goal (grams)</label>
          <input
            className="form-input"
            type="number"
            min="50"
            max="400"
            value={form.dailyProteinGoal}
            onChange={e => setForm({ ...form, dailyProteinGoal: parseInt(e.target.value) || 160 })}
          />
          <p className="form-hint">A common target is 0.7–1g per pound of bodyweight.</p>

          <label className="form-label">Daily food budget ($)</label>
          <input
            className="form-input"
            type="number"
            min="5"
            max="200"
            value={form.dailyBudget}
            onChange={e => setForm({ ...form, dailyBudget: parseInt(e.target.value) || 30 })}
          />

          <label className="form-label">Dietary preference</label>
          <select
            className="form-input"
            value={form.dietPreference}
            onChange={e => setForm({ ...form, dietPreference: e.target.value })}
          >
            {DIET_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <label className="form-label">Your location</label>
          <input
            className="form-input"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            placeholder="City, State"
          />

          <button className="cta-btn" onClick={handleSave} style={{ marginTop: '1rem' }}>
            Save profile →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="greeting">Profile</h1>
      </div>

      <div className="card profile-card">
        <div className="profile-header">
          <div className="avatar">{initials}</div>
          <div>
            <p className="profile-name">{profile.name}</p>
            <p className="profile-sub">ProteinPath member</p>
          </div>
          <button className="edit-link" onClick={() => setEditing(true)}>Edit</button>
        </div>
        <ProfileField label="Daily protein goal" value={`${profile.dailyProteinGoal}g`} />
        <ProfileField label="Daily budget" value={`$${profile.dailyBudget}`} />
        <ProfileField label="Diet preference" value={profile.dietPreference} />
        <ProfileField label="Location" value={profile.location} />
      </div>

      <h2 className="section-title" style={{ marginTop: '1.25rem' }}>Today's stats</h2>
      <div className="log-summary-row">
        <div className="log-summary-card">
          <p className="mini-label">Protein eaten</p>
          <p className="mini-value">{weekProtein}g</p>
        </div>
        <div className="log-summary-card">
          <p className="mini-label">Amount spent</p>
          <p className="mini-value">${weekSpent.toFixed(2)}</p>
        </div>
        <div className="log-summary-card">
          <p className="mini-label">Meals logged</p>
          <p className="mini-value">{log.length}</p>
        </div>
      </div>
    </div>
  )
}

function ProfileField({ label, value }) {
  return (
    <div className="profile-field">
      <span className="field-label">{label}</span>
      <span className="field-value">{value}</span>
    </div>
  )
}
