import React, { useState } from 'react'

const btn = (label, type = 'default') => ({ label, type })
const BUTTONS = [
  [btn('sin','fn'), btn('cos','fn'), btn('tan','fn'), btn('π','const'), btn('e','const')],
  [btn('x²','fn'), btn('√','fn'), btn('(','bracket'), btn(')','bracket'), btn('^','op')],
  [btn('7'), btn('8'), btn('9'), btn('÷','op'), btn('AC','clear')],
  [btn('4'), btn('5'), btn('6'), btn('×','op'), btn('⌫','back')],
  [btn('1'), btn('2'), btn('3'), btn('-','op'), btn('%','op')],
  [btn('0'), btn('.'), btn('EXP','fn'), btn('+','op'), btn('=','equals')],
]

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expr, setExpr] = useState('')
  const [justEvaled, setJustEvaled] = useState(false)

  function handleBtn(label) {
    if (label === 'AC') { setDisplay('0'); setExpr(''); setJustEvaled(false); return }
    if (label === '⌫') {
      const s = justEvaled ? '' : expr.slice(0, -1)
      setExpr(s); setDisplay(s || '0'); setJustEvaled(false); return
    }
    if (label === '=') {
      try {
        let e = expr
          .replace(/×/g, '*').replace(/÷/g, '/')
          .replace(/π/g, Math.PI).replace(/e(?![x])/g, Math.E)
          .replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(').replace(/√\(/g, 'Math.sqrt(')
          .replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)')
          .replace(/(\d+)²/g, 'Math.pow($1,2)')
          .replace(/EXP/g, 'e')
        // eslint-disable-next-line no-eval
        const result = eval(e)
        const rounded = parseFloat(result.toPrecision(10)).toString()
        setDisplay(rounded); setExpr(rounded); setJustEvaled(true)
      } catch { setDisplay('Error'); setExpr(''); setJustEvaled(false) }
      return
    }
    const map = { 'sin': 'sin(', 'cos': 'cos(', 'tan': 'tan(', '√': '√(', 'x²': '²', 'EXP': 'EXP' }
    const insert = map[label] || label
    const newExpr = (justEvaled && !['÷','×','+','-','^','%'].includes(label)) ? insert : expr + insert
    setExpr(newExpr); setDisplay(newExpr); setJustEvaled(false)
  }

  const colours = { fn: '#e8f5e8', const: '#fdf6e3', op: '#e6eef8', equals: 'var(--green)', clear: '#fee2e2', back: '#f5f5f5', bracket: '#f5f5f5', default: 'white' }
  const textColours = { equals: 'white', clear: '#b91c1c', op: 'var(--blue)', fn: 'var(--green-dark)', const: 'var(--gold-dark)' }

  return (
    <div style={{ maxWidth: '380px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>Scientific Calculator</h1>
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
        <div style={{ background: '#1a1a2e', padding: '20px', minHeight: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '4px', minHeight: '18px', wordBreak: 'break-all' }}>{expr && expr !== display ? expr : ''}</div>
          <div style={{ color: 'white', fontSize: '32px', fontWeight: '300', textAlign: 'right', wordBreak: 'break-all' }}>{display}</div>
        </div>
        <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {BUTTONS.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {row.map(({ label, type }) => (
                <button key={label} onClick={() => handleBtn(label)} style={{
                  padding: '14px 0', fontSize: label.length > 2 ? '12px' : '16px', fontWeight: '500',
                  border: '1px solid var(--border)', borderRadius: '10px', cursor: 'pointer',
                  background: colours[type] || 'white',
                  color: textColours[type] || 'var(--text)',
                  transition: 'opacity 0.1s',
                }}>{label}</button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
