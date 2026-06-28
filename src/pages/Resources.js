import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11']
const TOPICS = ['Algebra', 'Geometry', 'Number', 'Statistics', 'Calculus', 'Fractions', 'Do Now', 'Literacy', 'Plenary', 'Other']

export default function Resources({ session }) {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [filterYear, setFilterYear] = useState('')
  const [filterTopic, setFilterTopic] = useState('')
  const [title, setTitle] = useState('')
  const [yearGroup, setYearGroup] = useState('Year 7')
  const [topic, setTopic] = useState('Algebra')
  const [file, setFile] = useState(null)
  const [uploadMsg, setUploadMsg] = useState(null)

  const isAdmin = session.user.email === 'bethany.taylor@heath.h3federation.org.uk'

  useEffect(() => { fetchResources() }, [filterYear, filterTopic])

  async function fetchResources() {
    setLoading(true)
    let query = supabase.from('resources').select('*').order('created_at', { ascending: false })
    if (filterYear) query = query.eq('year_group', filterYear)
    if (filterTopic) query = query.eq('topic', filterTopic)
    const { data } = await query
    setResources(data || [])
    setLoading(false)
  }

  async function handleDelete(resource) {
    if (!window.confirm('Delete "' + resource.title + '"?')) return
    await supabase.from('resources').delete().eq('id', resource.id)
    fetchResources()
  }

  function canDelete(resource) {
    return isAdmin || resource.uploaded_by === session.user.email
  }

  async function handleUpload(e) {
    e.preventDefault()
    if (!title) return
    setUploading(true)
    setUploadMsg(null)
    let fileUrl = null
    if (file) {
      const fileName = Date.now() + '-' + file.name
      const { error: uploadError } = await supabase.storage.from('Resources').upload(fileName, file)
      if (uploadError) { setUploadMsg('Upload failed: ' + uploadError.message); setUploading(false); return }
      const { data: urlData } = supabase.storage.from('Resources').getPublicUrl(fileName)
      fileUrl = urlData.publicUrl
    }
    const { error } = await supabase.from('resources').insert({ title, year_group: yearGroup, topic, file_url: fileUrl, file_name: file?.name || null, uploaded_by: session.user.email })
    if (error) setUploadMsg('Error saving: ' + error.message)
    else { setUploadMsg('✅ Resource added successfully!'); setTitle(''); setFile(null); e.target.reset(); fetchResources() }
    setUploading(false)
  }

  const topicColour = (t) => {
    const map = { 'Do Now': '#fdf6e3,#a07d10', 'Literacy': '#e6eef8,#1a4b8c', 'Plenary': '#f3e8ff,#7c3aed' }
    const [bg, color] = (map[t] || 'var(--green-light),var(--green-dark)').split(',')
    return { background: bg, color }
  }

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid var(--border)', borderRadius: '7px', fontSize: '14px' }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600' }}>Resources</h1>
        {isAdmin && <span style={{ background: 'var(--gold-light)', color: 'var(--gold-dark)', padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid #e8d080' }}>⭐ Admin</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '22px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '18px' }}>Upload a resource</h2>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div><label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Title</label><input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Year 9 Algebra Practice" required /></div>
            <div><label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Year group</label><select style={inputStyle} value={yearGroup} onChange={e => setYearGroup(e.target.value)}>{YEAR_GROUPS.map(y => <option key={y}>{y}</option>)}</select></div>
            <div><label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>Section / Topic</label><select style={inputStyle} value={topic} onChange={e => setTopic(e.target.value)}>{TOPICS.map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '5px' }}>File (PDF, Word, image)</label><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.png" onChange={e => setFile(e.target.files[0])} style={{ fontSize: '13px', width: '100%' }} /></div>
            {uploadMsg && <div style={{ padding: '10px 14px', borderRadius: '7px', fontSize: '13px', background: uploadMsg.startsWith('✅') ? 'var(--green-light)' : '#fee2e2', color: uploadMsg.startsWith('✅') ? 'var(--green-dark)' : '#b91c1c' }}>{uploadMsg}</div>}
            <button type="submit" disabled={uploading} style={{ padding: '11px', background: uploading ? 'var(--muted)' : 'var(--green)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>{uploading ? 'Uploading...' : 'Add resource'}</button>
          </form>
        </div>

        <div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <select value={filterYear} onChange={e => setFilterYear(e.target.value)} style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '7px', fontSize: '13px' }}>
              <option value="">All year groups</option>{YEAR_GROUPS.map(y => <option key={y}>{y}</option>)}
            </select>
            <select value={filterTopic} onChange={e => setFilterTopic(e.target.value)} style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: '7px', fontSize: '13px' }}>
              <option value="">All sections</option>{TOPICS.map(t => <option key={t}>{t}</option>)}
            </select>
            {(filterYear || filterTopic) && <button onClick={() => { setFilterYear(''); setFilterTopic('') }} style={{ padding: '8px 14px', border: '1px solid var(--border)', borderRadius: '7px', fontSize: '13px', background: 'white' }}>Clear</button>}
          </div>

          {loading ? <p style={{ color: 'var(--muted)' }}>Loading...</p> : resources.length === 0 ? (
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}><p style={{ color: 'var(--muted)' }}>No resources yet.</p></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {resources.map(r => (
                <div key={r.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: '15px', marginBottom: '6px' }}>{r.title}</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ background: 'var(--green-light)', color: 'var(--green-dark)', padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>{r.year_group}</span>
                      <span style={{ ...topicColour(r.topic), padding: '2px 10px', borderRadius: '20px', fontSize: '12px' }}>{r.topic}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '5px' }}>Added by {r.uploaded_by} · {new Date(r.created_at).toLocaleDateString('en-GB')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                    {r.file_url && <a href={r.file_url} target="_blank" rel="noreferrer" style={{ padding: '8px 16px', background: 'var(--blue-light)', color: 'var(--blue)', borderRadius: '7px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}>Download</a>}
                    {canDelete(r) && <button onClick={() => handleDelete(r)} style={{ padding: '8px 14px', background: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '7px', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Delete</button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
