import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const card = {
  background: 'white',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  padding: '20px',
}

export default function Dashboard({ session }) {
  const navigate = useNavigate()
  const [resourceCount, setResourceCount] = useState(0)

  useEffect(() => {
    supabase.from('resources').select('id', { count: 'exact' })
      .then(({ count }) => setResourceCount(count || 0))
  }, [])

  const email = session?.user?.email || ''
  const name = email.split('@')[0].replace(/\./g, ' ')
  const displayName = name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <div>
      {/* Welcome banner */}
      <div style={{
        background: 'var(--blue)',
        color: 'white',
        borderRadius: '14px',
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '6px' }}>
            Welcome, {displayName}
          </h1>
          <p style={{ opacity: 0.85, fontSize: '14px' }}>
            Heath School Maths Hub — Staff portal
          </p>
          <span style={{
            display: 'inline-block', marginTop: '12px',
            background: 'var(--gold)', color: '#5a3e00',
            padding: '4px 14px', borderRadius: '20px',
            fontSize: '12px', fontWeight: '500',
          }}>
            Spring Term 2026
          </span>
        </div>
        <div style={{ fontSize: '60px', opacity: 0.2 }}>📐</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Resources', value: resourceCount, color: 'var(--green)' },
          { label: 'Tools available', value: 4, color: 'var(--gold)' },
          { label: 'Year groups', value: 6, color: 'var(--blue)' },
        ].map(s => (
          <div key={s.label} style={{ ...card, borderTop: `4px solid ${s.color}` }}>
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '6px' }}>{s.label}</div>
            <div style={{ fontSize: '28px', fontWeight: '600' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={card}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>Quick actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: '📁 Browse resources', path: '/resources' },
              { label: '✏️ Open whiteboard', path: '/whiteboard' },
            ].map(item => (
              <button key={item.path} onClick={() => navigate(item.path)} style={{
                textAlign: 'left', padding: '12px 16px',
                background: 'var(--green-light)',
                border: '1px solid #b8d9b8',
                borderRadius: '8px', fontSize: '14px',
                color: 'var(--green-dark)', fontWeight: '500',
              }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={card}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>About this hub</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.7' }}>
            Upload and share maths resources with colleagues. Use the interactive whiteboard for live lessons. More tools coming soon.
          </p>
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px' }}>
            Questions? Contact your maths lead.
          </p>
        </div>
      </div>
    </div>
  )
}
