import { useState, useEffect } from 'react'

const LOG_KEY = 'proteinpath_log'
const PROFILE_KEY = 'proteinpath_profile'

function getTodayKey() {
  return new Date().toISOString().split('T')[0]
}

export function useMealLog() {
  const [log, setLog] = useState(() => {
    try {
      const stored = localStorage.getItem(LOG_KEY)
      if (!stored) return []
      const parsed = JSON.parse(stored)
      // Only keep today's entries
      const today = getTodayKey()
      return parsed.filter(e => e.date === today)
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(LOG_KEY, JSON.stringify(log))
  }, [log])

  const addMeal = (meal, restaurantName) => {
    const entry = {
      id: Date.now(),
      date: getTodayKey(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mealId: meal.id,
      mealName: meal.name,
      restaurantName,
      protein: meal.protein,
      price: meal.price,
      efficiency: meal.efficiency,
    }
    setLog(prev => [entry, ...prev])
    return entry
  }

  const removeMeal = (entryId) => {
    setLog(prev => prev.filter(e => e.id !== entryId))
  }

  const totalProtein = log.reduce((sum, e) => sum + e.protein, 0)
  const totalSpent = log.reduce((sum, e) => sum + e.price, 0)

  return { log, addMeal, removeMeal, totalProtein, totalSpent }
}

export function useProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const stored = localStorage.getItem(PROFILE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const saveProfile = (data) => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(data))
    setProfile(data)
  }

  return { profile, saveProfile }
}
