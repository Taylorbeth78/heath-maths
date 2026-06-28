import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import './styles/global.css'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Resources from './pages/Resources'
import Whiteboard from './pages/Whiteboard'
import Calculator from './pages/Calculator'
import GraphPlotter from './pages/GraphPlotter'
import Profile from './pages/Profile'
import DoNow from './pages/DoNow'
import FrayerModels from './pages/FrayerModels'
import Layout from './components/Layout'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'var(--green)' }}>
      <div style={{ color: 'white', fontSize: '18px' }}>Loading Heath Maths Hub...</div>
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={session ? <Layout session={session} /> : <Navigate to="/login" />}>
          <Route index element={<Dashboard session={session} />} />
          <Route path="resources" element={<Resources session={session} />} />
          <Route path="whiteboard" element={<Whiteboard />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="graph" element={<GraphPlotter />} />
          <Route path="profile" element={<Profile session={session} />} />
          <Route path="donow" element={<DoNow />} />
          <Route path="frayer" element={<FrayerModels />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
