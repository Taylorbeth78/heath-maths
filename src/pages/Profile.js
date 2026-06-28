import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const SUBJECTS = ['Maths', 'Further Maths', 'Statistics', 'Numeracy']
const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11']

export default function Profile({ session }) {
  const [profile, setProfile] = useState({ display_name: '', role: 'Teacher', subjects: [], year_groups: [], bio: '' })
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const email = session.user.email
  const initials = email.slice(0, 2).toUpperCase()

  useEffect(() => {
    async function load() {
      const { data: p } = await supabase.from('profiles').select('*').eq('email', email).single()
      if (p) setProfile(p)
      const { data: r } = await supabase.from('resources').select('*').eq('uploaded_by', email).order('created_at', { ascending: false })
      setResources(r || [])
      setLoading(false)
    }
    load()
  }, [email])

  async function saveProfile() {
    setSaving(true)
    await supabase.from('profiles').upsert({ ...profile, email }, { onConflict: 'email' })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function toggleArr(field, val) {
    setProfile(p => ({ ...p, [field]: p[field].includes(val) ? p[field].filter(v => v !== val) : [...p[field], val] }))
  }

  if (loading) return <p style={{ color: 'var(--muted)' }}>Loading...</p>

  return (
    <div>
      <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>My Profile</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>

        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '600', color: 'white' }}>{initials}</div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '17px' }}>{profile.display_name || email.split('@')[0]}</div>
              <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{email}</div>
              <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{profile.role}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Display name</label>
              <input value={profile.display_name} onChange={e => setProfile(p => ({ ...p, display_name: e.target.value }))}
                placeholder="e.g. Ms Taylor"
                style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '7px', fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Role</label>
              <select value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))}
                style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '7px', fontSize: '14px' }}>
                {['Teacher', 'Head of Department', 'Deputy Head', 'Admin'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Subjects taught</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {SUBJECTS.map(s => (
                  <button key={s} onClick={() => toggleArr('subjects', s)} style={{
                    padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', border: '1px solid',
                    background: profile.subjects.includes(s) ? 'var(--green)' : 'white',
                    color: profile.subjects.includes(s) ? 'white' : 'var(--text)',
                    borderColor: profile.subjects.includes(s) ? 'var(--green)' : 'var(--border)',
                  }}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Year groups taught</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {YEAR_GROUPS.map(y => (
                  <button key={y} onClick={() => toggleArr('year_groups', y)} style={{
                    padding: '5px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', border: '1px solid',
                    background: profile.year_groups.includes(y) ? 'var(--blue)' : 'white',
                    color: profile.year_groups.includes(y) ? 'white' : 'var(--text)',
                    borderColor: profile.year_groups.includes(y) ? 'var(--blue)' : 'var(--border)',
                  }}>{y}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Short bio</label>
              <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                placeholder="e.g. I teach Year 9 and 10 maths and run the after-school maths club."
                rows={3} style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '7px', fontSize: '14px', resize: 'vertical' }} />
            </div>
            <button onClick={saveProfile} disabled={saving} style={{ padding: '11px', background: saved ? 'var(--blue)' : 'var(--green)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>
              {saving ? 'Saving...' : saved ? '✅ Saved!' : 'Save profile'}
            </button>
          </div>
        </div>

        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>My uploads ({resources.length})</h2>
          {resources.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: '14px' }}>You haven't uploaded anything yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resources.map(r => (
                <div key={r.id} style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '500', fontSize: '14px' }}>{r.title}</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '5px' }}>
                    <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '1px 8px', borderRadius: '20px', fontSize: '11px' }}>{r.year_group}</span>
                    <span style={{ background: 'var(--blue-light)', color: 'var(--blue)', padding: '1px 8px', borderRadius: '20px', fontSize: '11px' }}>{r.topic}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{new Date(r.created_at).toLocaleDateString('en-GB')}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
