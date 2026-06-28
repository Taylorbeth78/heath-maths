import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const styles = {
  shell: { display: 'flex', flexDirection: 'column', height: '100vh' },
  topbar: { background: 'var(--green)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '56px', flexShrink: 0 },
  logo: { display: 'flex', alignItems: 'center', gap: '12px' },
  shield: { width: '34px', height: '34px', background: 'var(--gold)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '14px', color: '#5a3e00' },
  topRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoutBtn: { background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' },
  body: { display: 'flex', flex: 1, overflow: 'hidden' },
  sidebar: { width: '210px', background: 'white', borderRight: '1px solid var(--border)', padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0, overflowY: 'auto' },
  sectionLabel: { fontSize: '10px', fontWeight: '600', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '10px 8px 4px', marginTop: '4px' },
  main: { flex: 1, overflowY: 'auto', padding: '28px' },
}

const navItem = (isActive) => ({
  display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '7px',
  fontSize: '14px', color: isActive ? 'var(--green)' : 'var(--text)',
  background: isActive ? 'var(--green-light)' : 'transparent',
  fontWeight: isActive ? '500' : '400', textDecoration: 'none', transition: 'background 0.15s',
})

export default function Layout({ session }) {
  const navigate = useNavigate()
  const handleLogout = async () => { await supabase.auth.signOut(); navigate('/login') }
  const email = session?.user?.email || ''
  const initials = email.slice(0, 2).toUpperCase()

  return (
    <div style={styles.shell}>
      <div style={styles.topbar}>
        <div style={styles.logo}>
          <div style={styles.shield}>HS</div>
          <span style={{ fontSize: '16px', fontWeight: '500' }}>Heath School — Maths Hub</span>
        </div>
        <div style={styles.topRight}>
          <NavLink to="/profile" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '600', color: '#5a3e00', textDecoration: 'none' }}>{initials}</NavLink>
          <button style={styles.logoutBtn} onClick={handleLogout}>Log out</button>
        </div>
      </div>

      <div style={styles.body}>
        <nav style={styles.sidebar}>
          <div style={styles.sectionLabel}>Main</div>
          <NavLink to="/" end style={({ isActive }) => navItem(isActive)}>📊 Dashboard</NavLink>
          <NavLink to="/resources" style={({ isActive }) => navItem(isActive)}>📁 Resources</NavLink>

          <div style={styles.sectionLabel}>Lesson Tools</div>
          <NavLink to="/whiteboard" style={({ isActive }) => navItem(isActive)}>✏️ Whiteboard</NavLink>
          <NavLink to="/calculator" style={({ isActive }) => navItem(isActive)}>🧮 Calculator</NavLink>
          <NavLink to="/graph" style={({ isActive }) => navItem(isActive)}>📈 Graph Plotter</NavLink>

          <div style={styles.sectionLabel}>Account</div>
          <NavLink to="/profile" style={({ isActive }) => navItem(isActive)}>👤 My Profile</NavLink>
        </nav>

        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
