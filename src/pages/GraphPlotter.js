import React, { useRef, useEffect, useState } from 'react'

const EXAMPLES = ['x^2', 'sin(x)', 'cos(x)', 'tan(x)', 'x^3 - 3*x', '2*x + 1', 'sqrt(x)', 'abs(x)']

export default function GraphPlotter() {
  const canvasRef = useRef(null)
  const [equations, setEquations] = useState([{ expr: 'x^2', colour: '#2d6a2d', enabled: true }])
  const [newExpr, setNewExpr] = useState('')
  const [xMin, setXMin] = useState(-10)
  const [xMax, setXMax] = useState(10)
  const [yMin, setYMin] = useState(-10)
  const [yMax, setYMax] = useState(10)
  const [error, setError] = useState('')
  const COLOURS = ['#2d6a2d','#1a4b8c','#c9a227','#cc0000','#7c3aed','#0891b2']

  useEffect(() => { drawGraph() }, [equations, xMin, xMax, yMin, yMax])

  function safeEval(expr, x) {
    try {
      let e = expr
        .replace(/\^/g, '**')
        .replace(/sin\(/g, 'Math.sin(').replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(').replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/abs\(/g, 'Math.abs(').replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(').replace(/pi/g, Math.PI).replace(/e(?![x])/g, Math.E)
      // eslint-disable-next-line no-new-func
      return new Function('x', 'return ' + e)(x)
    } catch { return NaN }
  }

  function drawGraph() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, W, H)

    const toCanvas = (x, y) => ({
      cx: ((x - xMin) / (xMax - xMin)) * W,
      cy: H - ((y - yMin) / (yMax - yMin)) * H
    })

    // Grid
    ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 1
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      const { cx } = toCanvas(x, 0)
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke()
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      const { cy } = toCanvas(0, y)
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = '#999'; ctx.lineWidth = 1.5
    const origin = toCanvas(0, 0)
    ctx.beginPath(); ctx.moveTo(0, origin.cy); ctx.lineTo(W, origin.cy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(origin.cx, 0); ctx.lineTo(origin.cx, H); ctx.stroke()

    // Axis labels
    ctx.fillStyle = '#666'; ctx.font = '11px sans-serif'; ctx.textAlign = 'center'
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x === 0) continue
      const { cx } = toCanvas(x, 0)
      ctx.fillText(x, cx, origin.cy + 14)
    }
    ctx.textAlign = 'right'
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y === 0) continue
      const { cy } = toCanvas(0, y)
      ctx.fillText(y, origin.cx - 4, cy + 4)
    }

    // Plot equations
    equations.filter(eq => eq.enabled).forEach(eq => {
      ctx.strokeStyle = eq.colour; ctx.lineWidth = 2.5
      ctx.beginPath()
      let started = false
      for (let px = 0; px < W; px++) {
        const x = xMin + (px / W) * (xMax - xMin)
        const y = safeEval(eq.expr, x)
        if (isNaN(y) || !isFinite(y) || y < yMin - 50 || y > yMax + 50) { started = false; continue }
        const { cy } = toCanvas(x, y)
        if (!started) { ctx.moveTo(px, cy); started = true } else ctx.lineTo(px, cy)
      }
      ctx.stroke()
    })
  }

  function addEquation() {
    if (!newExpr.trim()) return
    try {
      safeEval(newExpr, 1)
      setEquations(eqs => [...eqs, { expr: newExpr.trim(), colour: COLOURS[eqs.length % COLOURS.length], enabled: true }])
      setNewExpr(''); setError('')
    } catch { setError('Invalid equation') }
  }

  return (
    <div>
      <h1 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px' }}>Graph Plotter</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
          <canvas ref={canvasRef} width={700} height={500} style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Equations</h2>
            {equations.map((eq, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: eq.colour, flexShrink: 0 }} />
                <span style={{ fontSize: '13px', flex: 1, fontFamily: 'monospace' }}>y = {eq.expr}</span>
                <button onClick={() => setEquations(eqs => eqs.map((e,j) => j===i ? {...e, enabled: !e.enabled} : e))}
                  style={{ fontSize: '11px', padding: '2px 8px', border: '1px solid var(--border)', borderRadius: '4px', background: eq.enabled ? 'var(--green-light)' : '#f5f5f5', cursor: 'pointer' }}>
                  {eq.enabled ? 'On' : 'Off'}
                </button>
                <button onClick={() => setEquations(eqs => eqs.filter((_, j) => j !== i))}
                  style={{ fontSize: '11px', padding: '2px 8px', border: 'none', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
              <input value={newExpr} onChange={e => setNewExpr(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addEquation()}
                placeholder="e.g. x^2 + 1"
                style={{ flex: 1, padding: '7px 10px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px', fontFamily: 'monospace' }} />
              <button onClick={addEquation} style={{ padding: '7px 12px', background: 'var(--green)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>+</button>
            </div>
            {error && <p style={{ color: '#b91c1c', fontSize: '12px', marginTop: '6px' }}>{error}</p>}
            <div style={{ marginTop: '10px' }}>
              <p style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>Examples:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {EXAMPLES.map(ex => (
                  <button key={ex} onClick={() => setNewExpr(ex)}
                    style={{ fontSize: '11px', padding: '2px 8px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--bg)', cursor: 'pointer', fontFamily: 'monospace' }}>{ex}</button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>View window</h2>
            {[['X min', xMin, setXMin], ['X max', xMax, setXMax], ['Y min', yMin, setYMin], ['Y max', yMax, setYMax]].map(([label, val, setter]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', width: '50px' }}>{label}</label>
                <input type="number" value={val} onChange={e => setter(Number(e.target.value))}
                  style={{ flex: 1, padding: '5px 8px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '13px' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
