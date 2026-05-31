import { useState } from 'react'
import { LayoutDashboard, MapPin, ClipboardList, User } from 'lucide-react'
import { Dashboard } from './pages/Dashboard'
import { Discover } from './pages/Discover'
import { MealLog } from './pages/MealLog'
import { Profile } from './pages/Profile'
import { useMealLog, useProfile } from './hooks/useStorage'
import { DEFAULT_PROFILE } from './data/restaurants'
import './App.css'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'discover', label: 'Discover', Icon: MapPin },
  { id: 'log', label: 'Log', Icon: ClipboardList },
  { id: 'profile', label: 'Profile', Icon: User },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { log, addMeal, removeMeal, totalProtein, totalSpent } = useMealLog()
  const { profile, saveProfile } = useProfile()

  const currentProfile = profile || DEFAULT_PROFILE

  const handleLog = (meal, restaurantName) => {
    addMeal(meal, restaurantName)
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            log={log}
            totalProtein={totalProtein}
            totalSpent={totalSpent}
            profile={currentProfile}
            onFindMeal={() => setActiveTab('discover')}
          />
        )
      case 'discover':
        return (
          <Discover
            totalProtein={totalProtein}
            totalSpent={totalSpent}
            profile={currentProfile}
            onLog={handleLog}
          />
        )
      case 'log':
        return (
          <MealLog
            log={log}
            totalProtein={totalProtein}
            totalSpent={totalSpent}
            profile={currentProfile}
            onRemove={removeMeal}
            onDiscover={() => setActiveTab('discover')}
          />
        )
      case 'profile':
        return (
          <Profile
            profile={profile}
            onSave={saveProfile}
            log={log}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="logo">
            <span className="logo-icon">🥩</span>
            <span className="logo-text">ProteinPath</span>
          </div>
          {totalProtein > 0 && (
            <div className="header-protein">
              <span className="header-protein-val">{totalProtein}g</span>
              <span className="header-protein-label">/ {currentProfile.dailyProteinGoal}g today</span>
            </div>
          )}
        </header>

        <main className="app-main">
          {renderScreen()}
        </main>

        <nav className="bottom-nav">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-btn ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={20} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
